/**
 * The Context store. The file where all state management stems from. Ideally
 * any state mutation should originate from a dispatch call or a setState hook.
 * @module Store
 * @category Store
 */

import React, { createContext, useReducer, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import Reducer from "./reducers";
import { actionTypes } from "../state/constants";
import { User, Singles, Albums } from "./api";
import { routes } from "../constants";

/**
 * The initial state.
 *
 * Loading indicators are used so our app waits till the
 * async requests are finished. This enables us to not only show the
 * user loading indicators - but it also prevents us from prematurely executing any logic
 * that relies on something to be loaded first.
 * @typedef {Object} initialState
 * @property {boolean} initialLoading {@link true} When the page first loads - firebase checks
 * for any existing user session and accordingly fetches the mongo user. This is run only once
 * when app is initially loaded. Further user related async operations are indicated by `initialState.loading`
 * @property {boolean} loading {@link false} Indicates loading of firebase and/or mongo users
 *
 * For example:
 * - When a login or sign up form is submitted.
 * - If a user object needs to be updated.
 * @property {boolean} waitSinglesSubmit {@link false} Indicates loading when single/album forms
 * are being uploaded
 * @property {boolean} formLoading {@link false} Indicates loading on other miscellaneous forms
 * such as password reset forms
 * @property {Array<Objects>} messages Consists of notifications to be displayed to the user
 * @property {userObject} user mongo user object
 * @property {Object}  firebaseUser firebase user object
 */
const initialState = {
  messages: [],
  user: null,
  loading: true,
  initialLoading: true,
  waitSinglesSubmit: false,
  formLoading: false,
};

/**
 * Creates a higher-order store that applies middleware to the dispatch method
 * returned by useReducer hook.Created with the sole purpose of abstracting
 * away any asynchronous logic from the reducer.
 * @param {Object} state Context state
 * @param {Function} dispatch dispatch function returned by useReducer hook
 * @returns dispatches an action with the payload received from an api request
 *
 * @see Actions
 */
function dispatchUserMiddleware(state, dispatch) {
  return (action) => {
    console.log(action);
    switch (action.type) {
      case actionTypes.CREATE_USER:
        User.createUser(state, dispatch, action.payload.body, (user) => {
          if (user && user !== "handled") {
            //If user was successfully created - send them a verification email

            dispatch({ type: actionTypes.CREATE_USER, user });
          } else if (user === "handled") console.log("Done Loading");
          else dispatch({ type: actionTypes.SET_LOADING, payload: false });
        });
        break;

      case actionTypes.LOGIN_USER:
        User.signInUser(
          action.payload.type,
          state,
          dispatch,
          action.body,
          (user) => {
            if (user) dispatch({ type: actionTypes.LOGIN_USER, user });
            else {
              console.log("mongo user doesnt exists");
              dispatch({ type: actionTypes.SET_LOADING, payload: false });
            }
          }
        );
        break;

      case actionTypes.GET_MONGO_USER:
        User.getUserbyId(state, dispatch, action.id, (user) => {
          if (user) dispatch({ type: actionTypes.LOGIN_USER, user });
          else dispatch({ type: actionTypes.SET_LOADING, payload: false });
          dispatch({ type: actionTypes.SET_INITIAL_LOAD, payload: false });
        });
        break;

      case actionTypes.SUBMIT_SINGLES:
        dispatch({
          type: actionTypes.WAIT_SINGLES_SUBMIT,
          payload: true,
        });
        Singles.uploadSingle(state, dispatch, action.payload.body).then(
          (single) => {
            !!single
              ? Singles.updateUser(state, dispatch, single._id).then((user) => {
                  dispatch({ type: actionTypes.LOGIN_USER, user });
                  dispatch({
                    type: actionTypes.WAIT_SINGLES_SUBMIT,
                    payload: false,
                  });
                  action.payload.cb(); //Redirect after everything is successful (cb is a redirect function)
                })
              : dispatch({
                  type: actionTypes.WAIT_SINGLES_SUBMIT,
                  payload: false,
                });
          }
        );
        break;

      case actionTypes.SUBMIT_ALBUM:
        dispatch({
          type: actionTypes.WAIT_ALBUM_SUBMIT,
          payload: true,
        });
        Albums.uploadAlbum(state, dispatch, action.payload.body).then(
          (album) => {
            !!album
              ? Albums.updateUser(state, dispatch, album._id).then((user) => {
                  dispatch({ type: actionTypes.LOGIN_USER, user });
                  dispatch({
                    type: actionTypes.WAIT_ALBUM_SUBMIT,
                    payload: false,
                  });
                  action.payload.cb();
                })
              : dispatch({
                  type: actionTypes.WAIT_ALBUM_SUBMIT,
                  payload: false,
                });
          }
        );
        break;

      case actionTypes.SEND_INVITE_EMAIL:
        User.sendInviteEmail(state, dispatch, action.payload);
        break;

      default:
        return dispatch(action);
    }
  };
}

/**
 * The Context store.
 *
 * Higher order component which uses the Provider React component to wrap its
 * descendants allowing consuming functional components to subscribe to context changes.
 * All consumers that are descendants of a Provider will re-render whenever the Provider’s value prop changes.
 * @param {ReactElement} children Functional components that want to consume Context state and dispatch actions
 */
const Store = ({ children }) => {
  const [firebaseUser, setUser] = useState(null);

  const [contextState, dispatch] = useReducer(Reducer, initialState);
  const state = { ...contextState, firebaseUser };
  const middleware = dispatchUserMiddleware(state, dispatch);
  //Listens to changes in user auth state.
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        console.log("Firebase user:", authUser, authUser.providerData);
      } else {
        console.log("No Firebase user");
        setUser(null);
        middleware({ type: actionTypes.SET_LOADING, payload: false });
        middleware({ type: actionTypes.SET_INITIAL_LOAD, payload: false });
      }
    });
    return () => {};
  }, []);
  //Listens to changes in firebase user and accordingly syncs the mongo user
  useEffect(() => {
    if (firebaseUser) {
      if (!!state.user && firebaseUser.email !== state.user.email) {
        console.log("user changed");
        //If user and firebaseUser emails don't match - refetch them
        middleware({ type: actionTypes.LOGOUT_USER });
        middleware({ type: actionTypes.GET_MONGO_USER, id: firebaseUser.uid });
      }
      console.log("here", state);
      if (state.initialLoading) {
        middleware({ type: actionTypes.GET_MONGO_USER, id: firebaseUser.uid });
      }
    }
  }, [firebaseUser]);

  return (
    <Context.Provider value={[state, dispatchUserMiddleware(state, dispatch)]}>
      {children}
    </Context.Provider>
  );
};

export const Context = createContext(initialState);
export default { Store };

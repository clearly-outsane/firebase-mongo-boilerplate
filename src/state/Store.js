/**
 * The context store. The file where all state management stems from.
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
 * @param initialLoading - when the webpage loads - we check for any firebase users
 * @param loading - to indicate loading of firebase and mongo users for every other
 * request involving fetching users from either database - for example when a login
 * or sign up form is submitted
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
 *
 * @param {function} dispatch
 * function required for async operations which
 * must be abstracted away from the reducer
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
                  action.payload.cb();
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

const Store = ({ children }) => {
  const [firebaseUser, setUser] = useState(null);

  const [contextState, dispatch] = useReducer(Reducer, initialState);
  const state = { ...contextState, firebaseUser };
  const middleware = dispatchUserMiddleware(state, dispatch);

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

  useEffect(() => {
    if (firebaseUser) {
      if (!!state.user && firebaseUser.email !== state.user.email) {
        console.log("user changed");
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

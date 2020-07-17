import { actionTypes } from '../constants'
import firebase from 'firebase/app'

const Reducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case actionTypes.UPDATE_FIREBASE_USER:
      firebase
        .auth()
        .currentUser.updateProfile(action.payload.fieldsToUpdate)
        .then(function () {
          // Update successful.
          console.log(actionTypes.UPDATE_FIREBASE_USER, ' successfull')
        })
        .catch(function (error) {
          // An error happened.
          console.log(actionTypes.UPDATE_FIREBASE_USER, ' ', error)
        })
      return {
        ...state
      }
      // TODO:
      // case actionTypes.GET_MONGO_USER:
      //   const getUserResponse = await User.getUserbyId(action.payload.id);
      //   //check for user
      //   if (getUserResponse) return { ...state, user: getUserResponse };
      //   return { ...state };

    case actionTypes.CREATE_USER:
      console.log(action)
      return { ...state, user: action.user, loading: false }

    case actionTypes.LOGIN_USER:
      return { ...state, user: action.user, loading: false }

    case actionTypes.CREATE_NOTIFICATION:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: action.payload.id,
            message: action.payload.message,
            type: action.payload.type,
            isDismissible: action.payload.isDismissible || false,
            autoHide: action.payload.autoHide
          }
        ]
      }

    case actionTypes.DISMISS_NOTIFICATION:
      const changedMessages = state.messages.filter(
        (message) => message.id !== action.payload
      )
      return { ...state, messages: changedMessages }

    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload }

    case actionTypes.SET_INITIAL_LOAD:
      return { ...state, initialLoading: action.payload }

    case actionTypes.FORM_LOADING:
      return { ...state, formLoading: action.payload }

    case actionTypes.WAIT_SINGLES_SUBMIT:
      return { ...state, waitSinglesSubmit: action.payload }

    case actionTypes.WAIT_ALBUM_SUBMIT:
      return { ...state, waitSinglesSubmit: action.payload }

    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        loading: false,
        user: null,
        singlesArray: null,
        albumsArray: null
      }

    case actionTypes.SET_USER_SINGLES:
      return { ...state, singlesArray: action.payload }

    case actionTypes.SET_USER_ALBUMS:
      return { ...state, albumsArray: action.payload }

    default:
      return state
  }
}

export default Reducer

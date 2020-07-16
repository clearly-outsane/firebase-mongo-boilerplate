/**
 * @module Actions
 * @category Store
 */

/**
 *
 * @typedef {Object} Actions Actions types and their purpose
 *
 * NOTE - middleware here refers to dispatchUserMiddleware in Store
 * @property {} UPDATE_FIREBASE_USER - TODO;
 * @property {} GET_MONGO_USER - `payload: {id:String} `- used to fetch mongo user by id - passes through {@link middleware}
 * @property {} CREATE_USER -  `payload: {body:userObject} `- calls User.createUser - passes through {@link middleware}
 * @property {} LOGIN_USER -  `payload: {type:String,body:{email,password}}` - calls User.signInUser -
 * fetches firebase and mongo user objects - passes through {@link middleware}
 * @property {} CREATE_NOTIFICATION `payload: Notification` - dispatched by createNotification in Message.js - avoid dispatching this action directly and only use functions in Message.js
 * @property {} DISMISS_NOTIFICATION `payload:id` - dispatched by dismissNotificationById in Message.js- avoid dispatching this action directly and only use functions in Message.js
 * @property {} SET_LOADING - `payload : Boolean`- sets `state.loading`
 * @property {} SET_INITIAL_LOAD  - `payload : Boolean`- sets `state.initialLoading`
 * @property {} LOGOUT_USER - Logs out firebase user and sets all user objects and any related user data (such as uploaded singles) to null
 * @property {} WAIT_SINGLES_SUBMIT - `payload : Boolean`- sets `state.waitSinglesSubmit`
 * @property {} WAIT_ALBUM_SUBMIT - `payload : Boolean`- sets `state.waitSinglesSubmit` //TODO - Seperate this into waitAlbumSubmit
 * @property {} SUBMIT_SINGLES - `payload : body:formData` - calls `Singles.uploadSingle` - passes through {@link middleware}
 * @property {} SUBMIT_ALBUM  - `payload : body:formData` - calls  `Albums.uploadAlbum` - passes through {@link middleware}
 * @property {} FORM_LOADING - `payload : Boolean`- sets `state.formLoading`
 * @property {} SEND_INVITE_EMAIL - `payload : email` - calls  `User.sendInviteEmail` - passes through {@link middleware}
 * @property {} SET_USER_SINGLES - `payload : Array<Objects>` - stores fetched Singles uploaded by the user in `state.singlesArray`
 * @property {} SET_USER_ALBUMS - `payload : Array<Objects>` - stores fetched Albums uploaded by the user in `state.albumsArray`
 *
 * @see userObject
 * @see module:Notifications~Notification
 *
 */

const actions = {
  UPDATE_FIREBASE_USER: "UPDATE_FIREBASE_USER",
  GET_MONGO_USER: "GET_MONGO_USER",
  CREATE_USER: "CREATE_USER",
  LOGIN_USER: "LOGIN_USER",
  CREATE_NOTIFICATION: "CREATE_NOTIFICATION",
  DISMISS_NOTIFICATION: "DISMISS_NOTIFICATION",
  SET_LOADING: "SET_LOADING",
  SET_INITIAL_LOAD: "SET_INITIAL_LOAD",
  LOGOUT_USER: "LOGOUT_USER",
  WAIT_SINGLES_SUBMIT: "WAIT_SINGLES_SUBMIT",
  SUBMIT_SINGLES: "SUBMIT_SINGLES",
  SUBMIT_ALBUM: "SUBMIT_ALBUM",
  WAIT_ALBUM_SUBMIT: "WAIT_ALBUM_SUBMIT",
  FORM_LOADING: "FORM_LOADING",
  SEND_INVITE_EMAIL: "SEND_INVITE_EMAIL",
  SET_USER_SINGLES: "SET_USER_SINGLES",
  SET_USER_ALBUMS: "SET_USER_ALBUMS",
};

export default actions;

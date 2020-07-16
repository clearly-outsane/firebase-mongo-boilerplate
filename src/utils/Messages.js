/**
 * Global notification system. Showing and hiding notifications is as simple as calling `createNotification`
 * and `dismissNotificationById` . Notifications are assigned IDs which are generated and returned when `createNotification`
 * is called.
 * @module Notifications
 * @category Features
 */

import React, { useEffect, useState, useContext } from "react";
import { Context } from "../state/Store";
import { routes } from "../constants";
import { Redirect } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { actionTypes } from "../state/constants";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/**
 * Notification object used by createNotification
 * @typedef {Object} Notification
 * @property {(string|JSX)} message - The message to be displayed, can be JSX or just a string
 * @property {string} type - Using material UI types:
 * - 'error'
 * - 'warning'
 * - 'info'
 * - 'success'
 * @property {Boolean} isDismissible - If true, notification shows a clickable dismiss button which hides the notification
 * @property {Boolean} autoHide - If true autoHide hides after 3.5s
 */

/**
 *
 * @param {object} state - Context state
 * @param {function} dispatch -  dispatch function received from Context
 * @param {module:Notifications~Notification} notification
 *
 * @returns {String} notification id which is generated as: `${notification.type}-${state.messages.length}`
 *
 * @function createNotification
 */
export const createNotification = (state, dispatch, notification) => {
  const notifId = `${notification.type}-${state.messages.length}`;
  dispatch({
    type: actionTypes.CREATE_NOTIFICATION,
    payload: { ...notification, id: notifId },
  });
  return notifId;
};

/**
 * Removes notification with matching id from `state.messages`
 * @param {Function} dispatch dispatch function received from Context
 * @param {String} id id of notification to be hidden
 *
 * @function dismissNotificationById
 */
export const dismissNotificationById = (dispatch, id) => {
  dispatch({ type: actionTypes.DISMISS_NOTIFICATION, payload: id });
};

const RenderMessages = () => {
  const [state, dispatch] = useContext(Context);
  //local state holding state.messages
  const [m, setM] = useState([
    { id: 1, message: "", type: "info", isDismissible: true },
  ]);

  useEffect(() => {
    setM(state.messages);
    // console.log(m);
    return () => {};
  }, [state.messages, m]);

  const handleClose = (id) => {
    //remove the mssg from state
    dismissNotificationById(dispatch, id);
  };

  const RenderMessages = () => {
    var messagesToRender = [];
    m.map((message) => {
      //position messages on screen based on their type
      const vertical =
        message.type === "error" || message.type === "warning"
          ? "top"
          : "bottom";
      const horizontal = message.type === "error" ? "right" : "center";

      messagesToRender.push(
        <>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            key={message.id}
            autoHideDuration={message.autoHide ? 3500 : undefined}
            onClose={
              message.autoHide ? () => handleClose(message.id) : undefined
            }
            open
          >
            <Alert
              onClose={
                message.isDismissible
                  ? () => handleClose(message.id)
                  : undefined
              }
              severity={message.type}
            >
              {message.message}
            </Alert>
          </Snackbar>
        </>
      );
    });
    return messagesToRender;
  };

  return <>{m ? RenderMessages() : null}</>;
};

export default RenderMessages;

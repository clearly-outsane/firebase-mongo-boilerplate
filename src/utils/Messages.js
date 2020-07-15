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
 *
 * @param {object} state - Context state
 * @param {function} dispatch
 * @param {{message,type,isDismissible,autoHide }} notification - autoHide hides after 3.5s
 *
 * @returns notification id which is `${type}-${state.messages.length}`
 */
export const createNotification = (state, dispatch, notification) => {
  const notifId = `${notification.type}-${state.messages.length}`;
  dispatch({
    type: actionTypes.CREATE_NOTIFICATION,
    payload: { ...notification, id: notifId },
  });
  return notifId;
};

export const dismissNotificationById = (dispatch, id) => {
  dispatch({ type: actionTypes.DISMISS_NOTIFICATION, payload: id });
};

const RenderMessages = () => {
  const [state, dispatch] = useContext(Context);
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

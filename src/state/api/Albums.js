/**
 * API requests to mongo that handle uploading albums, updating user fields,
 * fetching singles and albums along with their cover art.
 *
 * Fetching singles was done from this file as when an album is fetched - it's
 * singles need to be fetched too and it was easier to have the entire logic in one file
 * @module Albums+Singles
 * @category API
 */

import axios from "axios";
import React from "react";
import { createNotification } from "../../utils/Messages";
import { actionTypes } from "../constants";

/**
 *
 * Sends a post request with Album form data. Album here refers to a music album .
 * @param {Object} state Context state
 * @param {Function} dispatch dispatch function returned by useReducer hook
 * @param {Object} body form data
 *
 * @returns {Object} returns uploaded album object or null if something fails
 */
const uploadAlbum = async (state, dispatch, body) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/v1/albums`,
      body
    );
    console.log("response");
    createNotification(state, dispatch, {
      type: "success",
      autoHide: true,
      message: "Successfully uploaded",
    });
    return response.data;
  } catch (e) {
    console.log(e, e.response);
    const errorMsg =
      typeof e.response.data !== "undefined"
        ? e.response.data.msg
        : "Oops! Something went wrong";

    createNotification(state, dispatch, {
      type: "error",
      autoHide: true,
      message: <div>{errorMsg}</div>,
    });
    return null;
  }
};

/**
 * Once a album has been uploaded it has to be associated the user that uploaded it.
 * This function updates the mongo user {@link albums} array field to include the ID of the uploaded album.
 * @param {Object} state Context state
 * @param {Function} dispatch dispatch function returned by useReducer hook
 * @param {Number} albumId
 *
 * @returns {Object} returns updated mongo user if all requests were successful
 */
const updateUser = async (state, dispatch, albumId) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/v1/users/album/${state.firebaseUser.uid}/${albumId}`
    );

    return response.data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Fetches a single given the singleId
 * @param {Number} singleId
 * @returns {Object} If the single document is found it is returned else null is returned
 * @function getSingle
 */
export const getSingle = async (singleId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/singles/${singleId}`
    );
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

/**
 * Fetches an album given the albumId
 * @param {Number} albumId
 * @returns {Object} If the album document is found it is returned else null is returned
 * @function getAlbum
 */
export const getAlbum = async (albumId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/albums/${albumId}`
    );
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

/**
 * Fetches the single cover art
 * @param {Number} singleArtId
 * @returns {String} base64 encoded data. null if request fails
 * @function getSingleCoverArt
 */
export const getSingleCoverArt = async (singleArtId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/singles/albumart/${singleArtId}`
    );

    return response.data;
  } catch (e) {
    console.log(e, e.response);
    return null;
  }
};

/**
 * Fetches the album cover art
 * @param {Number} albumArtId
 * @returns {String} base64 encoded data. null if request fails
 * @function getAlbumCoverArt
 */
export const getAlbumCoverArt = async (albumArtId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/albums/albumart/${albumArtId}`
    );

    return response.data;
  } catch (e) {
    console.log(e, e.response);
    return null;
  }
};

/**
 * Iterates over the user {@link singles} field and fetches each single along with it's cover art
 * @param {Object} user user object stored in state which was fetched from mongo
 * @returns {Array<Object>} Array of single objects. Array is empty by default. If a request fails it isn't pushed into the array.
 * @function getSingles
 */
export const getSingles = async (user) => {
  let singlesArray = [];
  for (var index in user.singles) {
    console.log(user.singles[index]);
    await getSingle(user.singles[index])
      .then(async (s) => {
        console.log(s);
        await getSingleCoverArt(s.coverArt)
          .then((res) => {
            if (!!s) {
              s.img = res;
              s.releaseDate = new Date(s.releaseDate); //Converting to date object as only string is returned
              singlesArray.push(s);
            }
          })
          .catch((e) => {
            console.log("unable to get cover art", e);
          });
      })
      .catch((e) => console.log(e));
  }
  return singlesArray;
};

/**
 * Iterates over the user {@link albums} field and fetches each album along with it's cover art
 * @param {Object} user user object stored in state which was fetched from mongo
 * @function getAlbums
 */
export const getAlbums = async (user) => {
  let albumsArray = [];
  for (var index in user.albums) {
    console.log(user.albums[index]);
    await getAlbum(user.albums[index])
      .then(async (s) => {
        console.log(s);
        await getAlbumCoverArt(s.albumArt)
          .then(async (res) => {
            if (!!s) {
              s.img = res;
              s.releaseDate = new Date(s.releaseDate);
              albumsArray.push(s);
            }
          })
          .catch((e) => {
            console.log("unable to get cover art", e);
          });
      })
      .catch((e) => console.log(e));
  }
  return albumsArray;
};

export default { uploadAlbum, updateUser };

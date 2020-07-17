/**
 * API requests to mongo that handle uploading singles and updating the related user object fields
 * @module Singles
 * @category API
 */

import axios from 'axios'
import React from 'react'
import { createNotification } from '../../utils/Messages'
import { actionTypes } from '../constants'

/**
 *
 * Sends a post request with single form data. Single here refers to a music single.
 * @param {Object} state Context state
 * @param {Function} dispatch dispatch function returned by useReducer hook
 * @param {Object} body form data
 *
 * @returns {Object} returns uploaded single or null if something fails
 */
const uploadSingle = async (state, dispatch, body) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/v1/singles',
      body,
      {
        onUploadProgress: (progress) => {
          const { loaded, total } = progress
          const percentageProgress = Math.floor((loaded / total) * 100)
          // TODO dispatch(setUploadProgress(file.id, percentageProgress))
        }
      }
    )
    console.log(response)
    createNotification(state, dispatch, {
      type: 'success',
      autoHide: true,
      message: 'Successfully uploaded'
    })
    return response.data
  } catch (e) {
    console.log(e, e.response)
    const errorMsg =
      typeof e.response.data !== 'undefined'
        ? e.response.data.msg
        : 'Oops! Something went wrong'

    createNotification(state, dispatch, {
      type: 'error',
      autoHide: true,
      message: <div>{errorMsg}</div>
    })
    return null
  }
}

/**
 * Once a single has been uploaded it has to be associated the user that uploaded it.
 * This function updates the mongo user {@link singles} array field to include the ID of the uploaded single.
 * @param {Object} state Context state
 * @param {Function} dispatch dispatch function returned by useReducer hook
 * @param {Number} singleId \
 *
 * @returns {Object} returns updated mongo user if all requests were successful
 */
const updateUser = async (state, dispatch, singleId) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/v1/users/single/${state.firebaseUser.uid}/${singleId}`
    )

    return response.data
  } catch (e) {
    console.log(e)
  }
}

export default {
  uploadSingle,
  updateUser
}

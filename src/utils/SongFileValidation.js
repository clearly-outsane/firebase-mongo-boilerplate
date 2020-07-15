import React from "react";
import * as musicMetadata from "music-metadata-browser";
import { createNotification } from "./Messages";

export const SongFileValidation = (fileObject) => {
  musicMetadata.parseBlob(fileObject).then((metadata) => {
    // metadata has all the metadata found in the blob or file

    if (metadata.format.bitrate >= 320000) {
      console.log("bitrate check passed");
      if (metadata.format.sampleRate >= 44100) {
        console.log("sampling rate check passed");
        if (metadata.format.numberOfChannels === 2) return true;
        else {
          return "channels";
        }
      } else {
        return "sampling";
      }
    } else {
      return "bitrate";
    }
  });
};

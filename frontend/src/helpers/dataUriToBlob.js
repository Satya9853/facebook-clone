import { Buffer } from "buffer";

const dataUriToBlob = (dataURI) => {
  // convert base64/URL Encoded data component ti a raw binary data held in a string
  let byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0) {
    // byteString = Buffer(dataURI.split(",")[1], "base64").toString("ascii");
    byteString = window.atob(dataURI.split(",")[1]);
  } else {
    byteString = decodeURI(dataURI.split(",")[1]);
  }

  // separate out the mime component
  let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  let ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
};

export default dataUriToBlob;

var CryptoJS = require("crypto-js");

export const getToken = (token) => {
  const bytes = CryptoJS.AES.decrypt(token, process.env.TOKEN_SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

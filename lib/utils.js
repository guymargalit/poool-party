var CryptoJS = require('crypto-js');

export const getToken = (token) => {
  const bytes = CryptoJS.AES.decrypt(token, process.env.TOKEN_SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const pick = (obj, keys) => {
  const result = {};
  for (let key in obj) {
    if (keys.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
};

export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      timer = null;
      fn(...args);
    }, delay);
  };
};

export const findTextObject = (target, variable) => {
  const initialText = target.substring(
    target.search(variable) + variable.length,
    target.length
  );
  return initialText.substring(0, initialText.search('};'));
};

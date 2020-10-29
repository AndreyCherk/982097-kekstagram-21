'use strict';

const serverURL = `https://21.javascript.pages.academy/kekstagram`;

const TIMEOUT_IN_MS = 10000;

window.upload = (data, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.timeout = TIMEOUT_IN_MS;

  xhr.addEventListener(`load`, () => {
    onSuccess();
  });

  xhr.addEventListener(`error`, () => {
    onError();
  });

  xhr.addEventListener(`timeout`, () => {
    onError();
  });

  xhr.open(`POST`, serverURL);
  xhr.send(data);
};

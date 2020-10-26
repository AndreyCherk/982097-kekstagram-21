'use strict';

(() => {
  const DEBOUNCE_INTERVAL = 500;

  window.debounce = (cb) => {
    let delay = false;

    return (...parameters) => {
      if (!delay) {
        cb(...parameters);
        delay = true;
        setTimeout(() => {
          delay = false;
        }, DEBOUNCE_INTERVAL);
      }
    };
  };
})();

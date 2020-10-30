'use strict';

const getRatio = (minRangeValue, maxRangeValue, percent) => (maxRangeValue - minRangeValue) * percent / 100 + minRangeValue;

const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getRandomArrayItem = (array) => array[getRandomInteger(0, array.length - 1)];

const clearElement = (element, exceptionsArray) => {
  const children = element.children;

  for (let i = children.length - 1; i >= 0; i--) {
    if (!exceptionsArray || !exceptionsArray.includes(children[i].tagName.toLowerCase(), 0)) {
      element.removeChild(children[i]);
    }
  }
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const debounce = (cb, debounceInterval) => {
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, debounceInterval);
  };
};

const isEscEvent = (evt, action) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    action();
  }
};

window.util = {
  getRatio,
  getRandomInteger,
  getRandomArrayItem,
  clearElement,
  shuffle,
  debounce,
  isEscEvent,
};

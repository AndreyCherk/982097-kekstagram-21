'use strict';

(() => {
  const getRatio = (minRangeValue, maxRangeValue, percent) => (maxRangeValue - minRangeValue) * percent / 100 + minRangeValue;

  const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

  const getRandomArrayItem = (array) => array[getRandomInteger(0, array.length - 1)];

  const clearElement = (element) => {
    const children = element.children;

    for (let i = children.length - 1; i >= 0; i--) {
      element.removeChild(children[i]);
    }
  };

  window.util = {
    getRatio,
    getRandomInteger,
    getRandomArrayItem,
    clearElement,
  };
})();

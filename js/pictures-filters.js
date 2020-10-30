'use strict';

const DEBOUNCE_INTERVAL = 500;
const RANDOM_PHOTO_QUANTITY = 10;

const filtersContainer = document.querySelector(`.img-filters`);
const filterButtons = filtersContainer.querySelectorAll(`.img-filters__button`);

const picturesContainer = document.querySelector(`.pictures`);

const getRandomArray = (array) => window.util.shuffle(array).slice(0, RANDOM_PHOTO_QUANTITY);

const getDiscussedArray = (array) => {
  const discussedArray = array.slice(0).sort((left, right) => {
    let commentDiff = right.comments.length - left.comments.length;

    if (commentDiff === 0) {
      commentDiff = 1;
    }
    return commentDiff;
  });
  return discussedArray;
};


const filterToggle = (newFilterElement) => {
  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].classList.remove(`img-filters__button--active`);
  }

  newFilterElement.classList.add(`img-filters__button--active`);
};

const onFilterClick = (array) => {
  return window.util.debounce((evt) => {
    let sortArray = array;

    if (evt.target.matches(`#filter-random`)) {
      sortArray = getRandomArray(array);
    }

    if (evt.target.matches(`#filter-discussed`)) {
      sortArray = getDiscussedArray(array);
    }

    window.util.clearElement(picturesContainer, [`h2`, `section`]);
    window.picturesRendering.renderPictures(sortArray);
    filterToggle(evt.target);
  }, DEBOUNCE_INTERVAL);
};

const activateFilters = (array) =>{

  filtersContainer.classList.remove(`img-filters--inactive`);
  filtersContainer.addEventListener(`click`, onFilterClick(array));
};

window.picturesFilters = {
  activateFilters
};

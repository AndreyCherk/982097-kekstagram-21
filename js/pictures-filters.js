'use strict';

const RANDOM_PHOTO_QUANTITY = 10;

const filtersContainer = document.querySelector(`.img-filters`);
const filterButtons = filtersContainer.querySelectorAll(`.img-filters__button`);

const picturesContainer = document.querySelector(`.pictures`);

const getRandomArray = (array) => {
  const randomArray = [];

  for (let i = 0; i < RANDOM_PHOTO_QUANTITY;) {
    const picture = window.util.getRandomArrayItem(array);

    if (!randomArray.includes(picture, 0)) {
      randomArray.push(picture);
      i++;
    }
  }

  return randomArray;
};

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
  return window.debounce((evt) => {
    let sortArray;

    if (evt.target.matches(`#filter-random`)) {
      sortArray = getRandomArray(array);
    } else if (evt.target.matches(`#filter-discussed`)) {
      sortArray = getDiscussedArray(array);
    } else {
      sortArray = array;
    }

    window.util.clearElement(picturesContainer, [`h2`, `section`]);
    window.picturesRendering.renderPictures(sortArray);
    filterToggle(evt.target);
  });
};

const activateFilters = (array) =>{

  filtersContainer.classList.remove(`img-filters--inactive`);
  filtersContainer.addEventListener(`click`, onFilterClick(array));
};

window.picturesFilters = {
  activateFilters
};

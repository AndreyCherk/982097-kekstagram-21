'use strict';

(() => {
  const RANDOM_PHOTO_QUANTITY = 10;

  const filtersContainer = document.querySelector(`.img-filters`);
  const filterButtons = filtersContainer.querySelectorAll(`.img-filters__button`);
  const filterDefaultButton = filtersContainer.querySelector(`#filter-default`);
  const filterRandomButton = filtersContainer.querySelector(`#filter-random`);
  const filterDiscussedButton = filtersContainer.querySelector(`#filter-discussed`);

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

  const getDisscussedArray = (array) => {
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


  const onFilterDefaultClick = (array) => {
    return window.debounce((evt) => {
      window.util.clearElement(picturesContainer, [`h2`, `section`]);
      window.picturesRendering.renderPictures(array);
      filterToggle(evt.target);
    });
  };

  const onFilterDiscussedClick = (array) => {
    return window.debounce((evt) => {
      window.util.clearElement(picturesContainer, [`h2`, `section`]);
      window.picturesRendering.renderPictures(getDisscussedArray(array));
      filterToggle(evt.target);
    });
  };

  const onFilterRandomClick = (array) => {
    return window.debounce((evt) => {
      window.util.clearElement(picturesContainer, [`h2`, `section`]);
      window.picturesRendering.renderPictures(getRandomArray(array));
      filterToggle(evt.target);
    });
  };

  const activateFilters = (array) =>{

    filtersContainer.classList.remove(`img-filters--inactive`);
    filterDefaultButton.addEventListener(`click`, onFilterDefaultClick(array));
    filterRandomButton.addEventListener(`click`, onFilterRandomClick(array));
    filterDiscussedButton.addEventListener(`click`, onFilterDiscussedClick(array));
  };

  window.picturesFilters = {
    activateFilters
  };

})();


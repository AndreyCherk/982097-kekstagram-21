'use strict';

const COMMENT_AUTHORS_MAMES = [`Анна`, `Евгений`, `Петр`, `Павел`, `Анастасия`, `Эдуард`, `Ольга`];
const COMMENTS = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];

const COMMENTS_MIN_QUANTITY = 1;
const COMMENTS_MAX_QUANTITY = 10;
const PHOTO_QUANTITY = 25;
const AVATAR_QUANTITY = 6;
const LIKES_MIN_QUANTITY = 15;
const LIKES_MAX_QUANTITY = 200;
const DEFAULT_EFFECT_PERCENT = 40;

const EFFECTS = {
  chrome: {
    minValue: 0,
    maxValue: 1,
    class: `effects__preview--chrome`,
    getLevel(percent) {
      return `grayscale(${getRatio(this.minValue, this.maxValue, percent)})`;
    }
  },
  sepia: {
    minValue: 0,
    maxValue: 1,
    class: `effects__preview--sepia`,
    getLevel(percent) {
      return `sepia(${getRatio(this.minValue, this.maxValue, percent)})`;
    }
  },
  marvin: {
    minValue: 0,
    maxValue: 1,
    class: `effects__preview--marvin`,
    getLevel(percent) {
      return `invert(${getRatio(this.minValue, this.maxValue, percent)})`;
    }
  },
  phobos: {
    minValue: 0,
    maxValue: 3,
    class: `effects__preview--phobos`,
    getLevel(percent) {
      return `blur(${getRatio(this.minValue, this.maxValue, percent)}px)`;
    }
  },
  heat: {
    minValue: 1,
    maxValue: 3,
    class: `effects__preview--heat`,
    getLevel(percent) {
      return `brightness(${getRatio(this.minValue, this.maxValue, percent)})`;
    }
  }
};

const MIN_SCALE_PERCENT = 25;
const MAX_SCALE_PERCENT = 100;
const DEFAULT_SCALE_PERCENT = 100;

const getRatio = (minRangeValue, maxRangeValue, percent) => (maxRangeValue - minRangeValue) * percent / 100 + minRangeValue;

const getRandomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const getRandomArrayItem = (array) => array[getRandomInteger(0, array.length - 1)];


// Other user photo
const getComment = () => {
  return {
    avatar: `img/avatar-${getRandomInteger(1, AVATAR_QUANTITY)}.svg`,
    message: getRandomArrayItem(COMMENTS),
    name: getRandomArrayItem(COMMENT_AUTHORS_MAMES),
  };
};

const getComments = (quantity) => {
  const comments = [];

  for (let i = 0; i < quantity; i++) {
    comments.push(getComment());
  }

  return comments;
};

const getPhoto = (src) => {
  return {
    url: `photos/${src}.jpg`,
    description: `Описание фотографии`,
    likes: getRandomInteger(LIKES_MIN_QUANTITY, LIKES_MAX_QUANTITY),
    comments: getComments(getRandomInteger(COMMENTS_MIN_QUANTITY, COMMENTS_MAX_QUANTITY)),
  };
};

const getPhotos = (quantity) => {
  const photos = [];

  for (let i = 1; i <= quantity; i++) {
    photos.push(getPhoto(i));
  }

  return photos;
};

const renderPhoto = (photo, photoTemplate) => {
  const photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector(`.picture__img`).src = photo.url;
  photoElement.querySelector(`.picture__comments`).textContent = photo.comments.length;
  photoElement.querySelector(`.picture__likes`).textContent = photo.likes;

  return photoElement;
};

const renderPhotos = (photos, listElement, photoTemplate) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i], photoTemplate));
  }

  listElement.appendChild(fragment);
};


const pictures = document.querySelector(`.pictures`);

const pictureTemplate = document.querySelector(`#picture`)
  .content
  .querySelector(`.picture`);

const photos = getPhotos(PHOTO_QUANTITY);

renderPhotos(photos, pictures, pictureTemplate);


// Fullsize photo
// const clearElement = (element) => {
//   const children = element.children;

//   for (let i = children.length - 1; i >= 0; i--) {
//     element.removeChild(children[i]);
//   }
// };

// const renderComment = (comment, commentTemplate) => {
//   const commentElement = commentTemplate.cloneNode(true);
//   const commentImage = commentElement.querySelector(`img`);

//   commentImage.src = comment.avatar;
//   commentImage.alt = comment.name;
//   commentElement.querySelector(`.social__text`).textContent = comment.message;

//   return commentElement;
// };

// const renderComments = (comments, listElement, commentTemplate) => {
//   clearElement(listElement);

//   for (let i = 0; i < comments.length; i++) {
//     listElement.appendChild(renderComment(comments[i], commentTemplate));
//   }
// };

// const renderFullSizePhoto = (photo) => {
//   fullSizePhoto.src = photo.url;
//   likesCount.textContent = photo.likes;
//   commentsCount.textContent = photo.comments.length;
//   descriptionPhoto.textContent = photo.description;

//   renderComments(photo.comments, commentsList, commentTemplate);
// };

// const fullSizePicture = document.querySelector(`.big-picture`);
// fullSizePicture.classList.remove(`hidden`);

// const fullSizePhoto = fullSizePicture.querySelector(`.big-picture__img img`);
// const descriptionPhoto = fullSizePicture.querySelector(`.social__caption`);
// const likesCount = fullSizePicture.querySelector(`.likes-count`);
// const commentsCount = fullSizePicture.querySelector(`.comments-count`);
// const commentsList = fullSizePicture.querySelector(`.social__comments`);
// const commentTemplate = fullSizePicture.querySelector(`.social__comment`);

// renderFullSizePhoto(photos[0]);

// const socialCommentCount = fullSizePicture.querySelector(`.social__comment-count`);
// socialCommentCount.classList.add(`hidden`);

// const commentsLoader = fullSizePicture.querySelector(`.comments-loader`);
// commentsLoader.classList.add(`hidden`);

// const body = document.querySelector(`body`);
// body.classList.add(`modal-open`);


// Upload file
const uploadForm = document.querySelector(`.img-upload__form`);
const uploadPopup = uploadForm.querySelector(`.img-upload__overlay`);
const uploadFileInput = uploadForm.querySelector(`.img-upload__input`);
const uploadPopupClose = uploadPopup.querySelector(`.img-upload__cancel`);
const uploadPopupPreview = uploadPopup.querySelector(`.img-upload__preview img`);
const effectsPrewiews = uploadPopup.querySelectorAll(`.effects__preview`);
const effectLevelControl = uploadPopup.querySelector(`.effect-level`);
const effectLevelInput = effectLevelControl.querySelector(`.effect-level__value`);
const effectLevelBar = effectLevelControl.querySelector(`.effect-level__depth`);
const effectLevelPin = effectLevelControl.querySelector(`.effect-level__pin`);
const scalePlusControl = uploadForm.querySelector(`.scale__control--bigger`);
const scaleMinusControl = uploadForm.querySelector(`.scale__control--smaller`);
const scaleValueInput = uploadForm.querySelector(`.scale__control--value`);
const hashtagsInput = uploadForm.querySelector(`.text__hashtags`);
const body = document.querySelector(`body`);

const renderPreviews = () => {
  const uploadFileURL = URL.createObjectURL(uploadFileInput.files[0]);

  uploadPopupPreview.src = uploadFileURL;

  for (let i = 0; i < effectsPrewiews.length; i++) {
    effectsPrewiews[i].style.backgroundImage = `url(${uploadFileURL})`;
  }
};

let scale;

const onPlusScaleButtonClick = () => {
  if (scale < MAX_SCALE_PERCENT) {
    scale += 25;
    scaleValueInput.value = `${scale}%`;
    uploadPopupPreview.style.transform = `scale(${scale / 100})`;
  }
};

const onMinusScaleButtonClick = () => {
  if (scale > MIN_SCALE_PERCENT) {
    scale -= 25;
    scaleValueInput.value = `${scale}%`;
    uploadPopupPreview.style.transform = `scale(${scale / 100})`;
  }
};

const getDefaultScaleSettings = () => {
  scale = DEFAULT_SCALE_PERCENT;
  scaleValueInput.value = `${scale}%`;
  uploadPopupPreview.style.transform = `scale(${scale / 100})`;
};

const getDefaultEffectSettings = () => {
  effectLevelControl.classList.add(`hidden`);
  effectLevelPin.style.left = `${DEFAULT_EFFECT_PERCENT}%`;
  effectLevelBar.style.width = `${DEFAULT_EFFECT_PERCENT}%`;
  uploadPopupPreview.classList.remove(effectClass);
  uploadPopupPreview.style.filter = ``;
  effectLevelInput.value = DEFAULT_EFFECT_PERCENT;
};

let effect;
let effectClass;

const onEffectChange = (evt) => {
  if (evt.target.matches(`input[type="radio"]`)) {
    getDefaultEffectSettings();

    if (evt.target.value !== `none`) {
      effect = evt.target.value;
      effectClass = EFFECTS[effect].class;

      uploadPopupPreview.classList.add(effectClass);
      uploadPopupPreview.style.filter = EFFECTS[effect].getLevel(DEFAULT_EFFECT_PERCENT);
      effectLevelControl.classList.remove(`hidden`);
    }
  }
};

const onEffectPinMouseup = () => {
  const effectPercent = effectLevelPin.style.left.slice(0, -1);
  uploadPopupPreview.style.filter = EFFECTS[effect].getLevel(effectPercent);
  effectLevelBar.style.width = `${effectPercent}%`;
  effectLevelInput.value = effectPercent;
};

const onPopupEscPress = (evt) => {
  if (evt.key === `Escape` && document.activeElement !== hashtagsInput) {
    evt.preventDefault();
    closeUploadPopup();
    uploadFileInput.value = ``;
  }
};

const openUploadPopup = () => {
  uploadPopup.classList.remove(`hidden`);
  body.classList.add(`modal-open`);

  document.addEventListener(`keydown`, onPopupEscPress);
  uploadForm.addEventListener(`change`, onEffectChange);
  effectLevelPin.addEventListener(`mouseup`, onEffectPinMouseup);
  scalePlusControl.addEventListener(`mouseup`, onPlusScaleButtonClick);
  scaleMinusControl.addEventListener(`mouseup`, onMinusScaleButtonClick);
};


const closeUploadPopup = () => {
  uploadPopup.classList.add(`hidden`);
  body.classList.remove(`modal-open`);

  document.removeEventListener(`keydown`, onPopupEscPress);
  uploadForm.removeEventListener(`change`, onEffectChange);
  effectLevelPin.removeEventListener(`mouseup`, onEffectPinMouseup);
  scalePlusControl.removeEventListener(`mouseup`, onPlusScaleButtonClick);
  scaleMinusControl.removeEventListener(`mouseup`, onMinusScaleButtonClick);
};

uploadFileInput.addEventListener(`change`, () => {
  renderPreviews();
  getDefaultEffectSettings();
  getDefaultScaleSettings();
  openUploadPopup();
});

uploadPopupClose.addEventListener(`click`, () => {
  closeUploadPopup();
});

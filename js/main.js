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
const COMMENT_MAX_LENGTH = 140;
const PHOTO_QUANTITY = 25;
const AVATAR_QUANTITY = 6;
const LIKES_MIN_QUANTITY = 15;
const LIKES_MAX_QUANTITY = 200;
const DEFAULT_EFFECT_PERCENT = 100;
const EFFECT_STEP_PERCENT = 1;

const EFFECTS = {
  chrome: {
    minValue: 0,
    maxValue: 1,
    getLevel(percent) {
      return `grayscale(${getRatio(this.minValue, this.maxValue, percent)})`;
    }
  },
  sepia: {
    minValue: 0,
    maxValue: 1,
    getLevel(percent) {
      return `sepia(${getRatio(this.minValue, this.maxValue, percent)})`;
    }
  },
  marvin: {
    minValue: 0,
    maxValue: 1,
    getLevel(percent) {
      return `invert(${getRatio(this.minValue, this.maxValue, percent)})`;
    }
  },
  phobos: {
    minValue: 0,
    maxValue: 3,
    getLevel(percent) {
      return `blur(${getRatio(this.minValue, this.maxValue, percent)}px)`;
    }
  },
  heat: {
    minValue: 1,
    maxValue: 3,
    getLevel(percent) {
      return `brightness(${getRatio(this.minValue, this.maxValue, percent)})`;
    }
  }
};

const MIN_SCALE_PERCENT = 25;
const MAX_SCALE_PERCENT = 100;
const SCALE_STEP_PERCENT = 25;
const DEFAULT_SCALE_PERCENT = 100;
const HASHTAGS_MAX_QUANTITY = 5;
const HASHTAGS_MAX_LENGTH = 20;

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


const picturesContainer = document.querySelector(`.pictures`);

const pictureTemplate = document.querySelector(`#picture`)
  .content
  .querySelector(`.picture`);

const photos = getPhotos(PHOTO_QUANTITY);

renderPhotos(photos, picturesContainer, pictureTemplate);


// Fullsize photo
const clearElement = (element) => {
  const children = element.children;

  for (let i = children.length - 1; i >= 0; i--) {
    element.removeChild(children[i]);
  }
};

const renderComment = (comment, commentTemplate) => {
  const commentElement = commentTemplate.cloneNode(true);
  const commentImage = commentElement.querySelector(`img`);

  commentImage.src = comment.avatar;
  commentImage.alt = comment.name;
  commentElement.querySelector(`.social__text`).textContent = comment.message;

  return commentElement;
};

const renderComments = (comments, listElement, commentTemplate) => {
  clearElement(listElement);

  for (let i = 0; i < comments.length; i++) {
    listElement.appendChild(renderComment(comments[i], commentTemplate));
  }
};

const renderFullSizePhoto = (photo) => {
  fullSizePhoto.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  descriptionPhoto.textContent = photo.description;

  renderComments(photo.comments, commentsList, commentTemplate);
};

const fullSizePicture = document.querySelector(`.big-picture`);
const fullSizePhoto = fullSizePicture.querySelector(`.big-picture__img img`);
const fullSizePhotoClose = fullSizePicture.querySelector(`.big-picture__cancel`);
const descriptionPhoto = fullSizePicture.querySelector(`.social__caption`);
const likesCount = fullSizePicture.querySelector(`.likes-count`);
const commentsCount = fullSizePicture.querySelector(`.comments-count`);
const commentsList = fullSizePicture.querySelector(`.social__comments`);
const commentTemplate = fullSizePicture.querySelector(`.social__comment`);

const pictures = picturesContainer.querySelectorAll(`.picture__img`);
const picturesLinks = picturesContainer.querySelectorAll(`.picture`);

const body = document.querySelector(`body`);

const onFullSizePhotoEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeFullSizePhoto();
  }
};

const openFullSizePhoto = () => {
  fullSizePicture.classList.remove(`hidden`);
  body.classList.add(`modal-open`);

  document.addEventListener(`keydown`, onFullSizePhotoEscPress);
  fullSizePhotoClose.addEventListener(`click`, closeFullSizePhoto);
};

const closeFullSizePhoto = () => {
  fullSizePicture.classList.add(`hidden`);
  body.classList.remove(`modal-open`);

  document.removeEventListener(`keydown`, onFullSizePhotoEscPress);
  fullSizePhotoClose.removeEventListener(`click`, closeFullSizePhoto);
};

picturesContainer.addEventListener(`click`, (evt) => {
  if (evt.target.matches(`.picture__img`) || evt.target.matches(`.picture`)) {
    if (evt.target.matches(`.picture__img`)) {

      for (let i = 0; i < pictures.length; i++) {
        if (evt.target === pictures[i]) {
          renderFullSizePhoto(photos[i]);
          break;
        }
      }
    } else {
      evt.preventDefault();

      for (let i = 0; i < picturesLinks.length; i++) {
        if (evt.target === picturesLinks[i]) {
          renderFullSizePhoto(photos[i]);
          break;
        }
      }
    }
    openFullSizePhoto();
  }
});

// Upload file
const uploadForm = document.querySelector(`.img-upload__form`);
const uploadPopup = uploadForm.querySelector(`.img-upload__overlay`);
const uploadFileInput = uploadForm.querySelector(`.img-upload__input`);
const uploadPopupClose = uploadPopup.querySelector(`.img-upload__cancel`);
const uploadPopupPreview = uploadPopup.querySelector(`.img-upload__preview img`);
const effectsPrewiews = uploadPopup.querySelectorAll(`.effects__preview`);
const effectLevelControl = uploadPopup.querySelector(`.effect-level`);
const effectLevelInput = effectLevelControl.querySelector(`.effect-level__value`);
const effectRange = effectLevelControl.querySelector(`.effect-level__line`);
const effectLevelBar = effectRange.querySelector(`.effect-level__depth`);
const effectLevelPin = effectRange.querySelector(`.effect-level__pin`);
const scalePlusControl = uploadForm.querySelector(`.scale__control--bigger`);
const scaleMinusControl = uploadForm.querySelector(`.scale__control--smaller`);
const scaleValueInput = uploadForm.querySelector(`.scale__control--value`);
const hashtagsInput = uploadForm.querySelector(`.text__hashtags`);
const commentInput = uploadForm.querySelector(`.text__description`);

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
    scale += SCALE_STEP_PERCENT;
    scaleValueInput.value = `${scale}%`;
    uploadPopupPreview.style.transform = `scale(${scale / 100})`;
  }
};

const onMinusScaleButtonClick = () => {
  if (scale > MIN_SCALE_PERCENT) {
    scale -= SCALE_STEP_PERCENT;
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
      effectClass = `effects__preview--${effect}`;

      uploadPopupPreview.classList.add(effectClass);
      uploadPopupPreview.style.filter = EFFECTS[effect].getLevel(DEFAULT_EFFECT_PERCENT);
      effectLevelControl.classList.remove(`hidden`);
    }
  }
};

const changeEffectLevel = (effectPercent) => {
  uploadPopupPreview.style.filter = EFFECTS[effect].getLevel(effectPercent);
  effectLevelPin.style.left = `${effectPercent}%`;
  effectLevelBar.style.width = `${effectPercent}%`;
  effectLevelInput.value = effectPercent;
};

const onEffectPinMouseup = () => {
  // Перемещение пина
  changeEffectLevel(effectLevelPin.style.left.slice(0, -1));
};

const onEffectRangeClick = (evt) => {
  if (evt.target.matches(`.effect-level__line`) || evt.target.matches(`.effect-level__depth`)) {
    const shiftX = evt.clientX - effectRange.getBoundingClientRect().left;
    const effectPercent = shiftX / effectRange.offsetWidth * 100;

    changeEffectLevel(effectPercent);
  }
};

const onEffectPinKeydown = (evt) => {
  const currentPinPercent = +effectLevelPin.style.left.slice(0, -1);

  if (evt.key === `ArrowLeft`) {
    if (currentPinPercent >= EFFECT_STEP_PERCENT) {
      changeEffectLevel(currentPinPercent - EFFECT_STEP_PERCENT);
    } else if (currentPinPercent > 0 && currentPinPercent < EFFECT_STEP_PERCENT) {
      changeEffectLevel(0);
    }
  } else if (evt.key === `ArrowRight`) {
    if (currentPinPercent <= 100 - EFFECT_STEP_PERCENT) {
      changeEffectLevel(currentPinPercent + EFFECT_STEP_PERCENT);
    } else if (currentPinPercent < 100 && currentPinPercent > 100 - EFFECT_STEP_PERCENT) {
      changeEffectLevel(100);
    }
  }
};

const regExp = /^#[a-zA-Zа-яА-Я0-9]*$/;

const onHashtagInputInput = () => {
  const hashtags = hashtagsInput.value.toLowerCase().split(` `);
  for (let i = 0; i < hashtags.length; i++) {
    if (hashtags[i] === ``) {
      hashtags.splice(i, 1);
    }
  }

  if (hashtags.length > HASHTAGS_MAX_QUANTITY) {
    hashtagsInput.setCustomValidity(`Нельзя указать больше ${HASHTAGS_MAX_QUANTITY} хэштегов`);
  } else {
    for (let i = 0; i < hashtags.length; i++) {
      if (hashtags.includes(hashtags[i], i + 1)) {
        hashtagsInput.setCustomValidity(`Один и тот же хэштег не может быть использован дважды`);
        break;
      } else if (hashtags[i].length > HASHTAGS_MAX_LENGTH) {
        hashtagsInput.setCustomValidity(`Длина хэштега не должна превышать ${HASHTAGS_MAX_LENGTH} симв.`);
        break;
      } else if (hashtags[i][0] !== `#`) {
        hashtagsInput.setCustomValidity(`Хэштег должен начинаеться с символа решётки`);
        break;
      } else if (hashtags[i].length === 1) {
        hashtagsInput.setCustomValidity(`Хэштег не должен состоять только из одной решётки`);
        break;
      } else if (!regExp.test(hashtags[i])) {
        hashtagsInput.setCustomValidity(`Хэштег не должен содержать специальных символов`);
        break;
      } else {
        hashtagsInput.setCustomValidity(``);
      }
    }
  }

  hashtagsInput.reportValidity();
};

const onCommentInputInput = () => {
  const valueLength = commentInput.value.length;

  if (valueLength > COMMENT_MAX_LENGTH) {
    commentInput.setCustomValidity(`Удалите лишние ${valueLength - COMMENT_MAX_LENGTH} симв.`);
  } else {
    commentInput.setCustomValidity(``);
  }

  commentInput.reportValidity();
};

const onUploadPopupEscPress = (evt) => {
  if (evt.key === `Escape` && document.activeElement !== hashtagsInput && document.activeElement !== commentInput) {
    evt.preventDefault();
    closeUploadPopup();
    uploadFileInput.value = ``;
  }
};

const openUploadPopup = () => {
  uploadPopup.classList.remove(`hidden`);
  body.classList.add(`modal-open`);

  document.addEventListener(`keydown`, onUploadPopupEscPress);
  uploadPopupClose.addEventListener(`click`, closeUploadPopup);
  uploadForm.addEventListener(`change`, onEffectChange);
  uploadForm.addEventListener(`click`, onEffectRangeClick);
  effectLevelPin.addEventListener(`mouseup`, onEffectPinMouseup);
  effectLevelPin.addEventListener(`keydown`, onEffectPinKeydown);
  scalePlusControl.addEventListener(`mouseup`, onPlusScaleButtonClick);
  scaleMinusControl.addEventListener(`mouseup`, onMinusScaleButtonClick);
  hashtagsInput.addEventListener(`input`, onHashtagInputInput);
  commentInput.addEventListener(`input`, onCommentInputInput);
};


const closeUploadPopup = () => {
  uploadPopup.classList.add(`hidden`);
  body.classList.remove(`modal-open`);

  document.removeEventListener(`keydown`, onUploadPopupEscPress);
  uploadPopupClose.removeEventListener(`click`, closeUploadPopup);
  uploadForm.removeEventListener(`change`, onEffectChange);
  uploadForm.removeEventListener(`click`, onEffectRangeClick);
  effectLevelPin.removeEventListener(`mouseup`, onEffectPinMouseup);
  effectLevelPin.removeEventListener(`keydown`, onEffectPinKeydown);
  scalePlusControl.removeEventListener(`mouseup`, onPlusScaleButtonClick);
  scaleMinusControl.removeEventListener(`mouseup`, onMinusScaleButtonClick);
  hashtagsInput.removeEventListener(`input`, onHashtagInputInput);
  commentInput.removeEventListener(`input`, onCommentInputInput);
};

uploadFileInput.addEventListener(`change`, () => {
  renderPreviews();
  getDefaultEffectSettings();
  getDefaultScaleSettings();
  openUploadPopup();
});

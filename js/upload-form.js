'use strict';

const serverUploadURL = `https://21.javascript.pages.academy/kekstagram`;
const TIMEOUT_IN_MS = 10000;
const ACCERTABLE_FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const uploadForm = document.querySelector(`.img-upload__form`);
const uploadPopup = uploadForm.querySelector(`.img-upload__overlay`);
const uploadFileInput = uploadForm.querySelector(`.img-upload__input`);
const uploadPopupCloseButton = uploadPopup.querySelector(`.img-upload__cancel`);
const uploadPopupPreview = uploadPopup.querySelector(`.img-upload__preview img`);
const effectsPrewiews = uploadPopup.querySelectorAll(`.effects__preview`);
const effectLevelControl = uploadPopup.querySelector(`.effect-level`);
const effectRange = effectLevelControl.querySelector(`.effect-level__line`);
const effectLevelPin = effectRange.querySelector(`.effect-level__pin`);
const scalePlusControl = uploadForm.querySelector(`.scale__control--bigger`);
const scaleMinusControl = uploadForm.querySelector(`.scale__control--smaller`);
const hashtagsInput = uploadForm.querySelector(`.text__hashtags`);
const commentInput = uploadForm.querySelector(`.text__description`);

const body = document.querySelector(`body`);


const renderUploadPopup = () => {
  const uploadFile = uploadFileInput.files[0];
  const uploadFileName = uploadFile.name.toLowerCase();

  const matches = ACCERTABLE_FILE_TYPES.some((it) => uploadFileName.endsWith(it));

  if (matches) {
    const uploadFileURL = URL.createObjectURL(uploadFile);

    uploadPopupPreview.src = uploadFileURL;

    effectsPrewiews.forEach((item) => {
      item.style.backgroundImage = `url(${uploadFileURL})`;
    });
  }
};

const getDefaultFormSettings = () => {
  uploadForm.reset();
  uploadPopupPreview.src = `img/upload-default-image.jpg`;
  hashtagsInput.style.boxShadow = `none`;
  commentInput.style.boxShadow = `none`;
  window.uploadFormImageSettings.getDefaultEffectSettings();
  window.uploadFormImageSettings.getDefaultScaleSettings();
};

const onUploadPopupEscPress = (evt) => {
  window.util.isEscEvent(evt, () => {
    if (document.activeElement !== hashtagsInput && document.activeElement !== commentInput) {
      closeUploadPopup();
    }
  });
};

const onUploadPopupCloseButtonClick = () => {
  closeUploadPopup();
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  window.load(serverUploadURL, `POST`, onSuccess, onError, TIMEOUT_IN_MS, new FormData(uploadForm));
};

const onSuccess = () => {
  window.uploadFormStatusMessage.open(`success`);
  closeUploadPopup();
};

const onError = () => {
  window.uploadFormStatusMessage.open(`error`);
  closeUploadPopup();
};

const openUploadPopup = () => {
  uploadPopup.classList.remove(`hidden`);
  body.classList.add(`modal-open`);

  document.addEventListener(`keydown`, onUploadPopupEscPress);
  uploadPopupCloseButton.addEventListener(`click`, onUploadPopupCloseButtonClick);
  uploadForm.addEventListener(`change`, window.uploadFormImageSettings.onEffectChange);
  effectRange.addEventListener(`click`, window.uploadFormImageSettings.onEffectRangeClick);
  effectLevelPin.addEventListener(`mousedown`, window.uploadFormImageSettings.onEffectPinMouseDown);
  effectLevelPin.addEventListener(`keydown`, window.uploadFormImageSettings.onEffectPinKeydown);
  scalePlusControl.addEventListener(`click`, window.uploadFormImageSettings.onPlusScaleButtonClick);
  scaleMinusControl.addEventListener(`click`, window.uploadFormImageSettings.onMinusScaleButtonClick);
  hashtagsInput.addEventListener(`input`, window.uploadFormValidity.onHashtagInputInput);
  commentInput.addEventListener(`input`, window.uploadFormValidity.onCommentInputInput);
  uploadForm.addEventListener(`submit`, onUploadFormSubmit);
};


const closeUploadPopup = () => {
  uploadPopup.classList.add(`hidden`);
  body.classList.remove(`modal-open`);

  getDefaultFormSettings();

  document.removeEventListener(`keydown`, onUploadPopupEscPress);
  uploadPopupCloseButton.removeEventListener(`click`, onUploadPopupCloseButtonClick);
  uploadForm.removeEventListener(`change`, window.uploadFormImageSettings.onEffectChange);
  effectRange.removeEventListener(`click`, window.uploadFormImageSettings.onEffectRangeClick);
  effectLevelPin.removeEventListener(`mousedown`, window.uploadFormImageSettings.onEffectPinMouseDown);
  effectLevelPin.removeEventListener(`keydown`, window.uploadFormImageSettings.onEffectPinKeydown);
  scalePlusControl.removeEventListener(`click`, window.uploadFormImageSettings.onPlusScaleButtonClick);
  scaleMinusControl.removeEventListener(`click`, window.uploadFormImageSettings.onMinusScaleButtonClick);
  hashtagsInput.removeEventListener(`input`, window.uploadFormValidity.onHashtagInputInput);
  commentInput.removeEventListener(`input`, window.uploadFormValidity.onCommentInputInput);
  uploadForm.removeEventListener(`submit`, onUploadFormSubmit);
};

window.uploadForm = {
  render: renderUploadPopup,
  open: openUploadPopup,
};

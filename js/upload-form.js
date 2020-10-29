'use strict';

(() => {
  const ACCERTABLE_FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
  const uploadForm = document.querySelector(`.img-upload__form`);
  const uploadPopup = uploadForm.querySelector(`.img-upload__overlay`);
  const uploadFileInput = uploadForm.querySelector(`.img-upload__input`);
  const uploadPopupClose = uploadPopup.querySelector(`.img-upload__cancel`);
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

      for (let i = 0; i < effectsPrewiews.length; i++) {
        effectsPrewiews[i].style.backgroundImage = `url(${uploadFileURL})`;
      }
    }
  };

  const getDefaultFormSettings = () => {
    uploadForm.reset();
    window.uploadFormImageSettings.getDefaultEffectSettings();
    window.uploadFormImageSettings.getDefaultScaleSettings();
  };

  const onUploadPopupEscPress = (evt) => {
    if (evt.key === `Escape` && document.activeElement !== hashtagsInput && document.activeElement !== commentInput) {
      evt.preventDefault();
      closeUploadPopup();
    }
  };

  const onUploadFormSubmit = (evt) => {
    evt.preventDefault();
    window.upload(new FormData(uploadForm), onSuccess, onError);
  };

  const onSuccess = () => {
    window.uploadFormStatusMessage.openStatusMessage(`success`);
    closeUploadPopup();
  };

  const onError = () => {
    window.uploadFormStatusMessage.openStatusMessage(`error`);
    closeUploadPopup();
  };

  const openUploadPopup = () => {
    uploadPopup.classList.remove(`hidden`);
    body.classList.add(`modal-open`);

    document.addEventListener(`keydown`, onUploadPopupEscPress);
    uploadPopupClose.addEventListener(`click`, closeUploadPopup);
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
    uploadPopupClose.removeEventListener(`click`, closeUploadPopup);
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
    renderUploadPopup,
    openUploadPopup,
  };
})();

'use strict';

(() => {
  const COMMENT_MAX_LENGTH = 140;

  const DEFAULT_EFFECT_PERCENT = 100;
  const EFFECT_STEP_PERCENT = 1;
  const EFFECTS = {
    chrome: {
      minValue: 0,
      maxValue: 1,
      getLevel(percent) {
        return `grayscale(${window.util.getRatio(this.minValue, this.maxValue, percent)})`;
      }
    },
    sepia: {
      minValue: 0,
      maxValue: 1,
      getLevel(percent) {
        return `sepia(${window.util.getRatio(this.minValue, this.maxValue, percent)})`;
      }
    },
    marvin: {
      minValue: 0,
      maxValue: 1,
      getLevel(percent) {
        return `invert(${window.util.getRatio(this.minValue, this.maxValue, percent)})`;
      }
    },
    phobos: {
      minValue: 0,
      maxValue: 3,
      getLevel(percent) {
        return `blur(${window.util.getRatio(this.minValue, this.maxValue, percent)}px)`;
      }
    },
    heat: {
      minValue: 1,
      maxValue: 3,
      getLevel(percent) {
        return `brightness(${window.util.getRatio(this.minValue, this.maxValue, percent)})`;
      }
    }
  };

  const MIN_SCALE_PERCENT = 25;
  const MAX_SCALE_PERCENT = 100;
  const SCALE_STEP_PERCENT = 25;
  const DEFAULT_SCALE_PERCENT = 100;

  const HASHTAGS_MAX_QUANTITY = 5;
  const HASHTAGS_MAX_LENGTH = 20;


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
    const shiftX = evt.clientX - effectRange.getBoundingClientRect().left;
    const effectPercent = shiftX / effectRange.offsetWidth * 100;

    changeEffectLevel(effectPercent);
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
    effectRange.addEventListener(`click`, onEffectRangeClick);
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
    effectRange.removeEventListener(`click`, onEffectRangeClick);
    effectLevelPin.removeEventListener(`mouseup`, onEffectPinMouseup);
    effectLevelPin.removeEventListener(`keydown`, onEffectPinKeydown);
    scalePlusControl.removeEventListener(`mouseup`, onPlusScaleButtonClick);
    scaleMinusControl.removeEventListener(`mouseup`, onMinusScaleButtonClick);
    hashtagsInput.removeEventListener(`input`, onHashtagInputInput);
    commentInput.removeEventListener(`input`, onCommentInputInput);
  };

  const renderUploadPopup = () => {
    renderPreviews();
    getDefaultEffectSettings();
    getDefaultScaleSettings();
  };

  window.uploadForm = {
    renderUploadPopup,
    openUploadPopup,
  };
})();

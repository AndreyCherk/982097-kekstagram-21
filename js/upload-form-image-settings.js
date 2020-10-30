'use strict';

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

const uploadPopup = document.querySelector(`.img-upload__overlay`);
const uploadPopupPreview = uploadPopup.querySelector(`.img-upload__preview img`);
const effectLevelControl = uploadPopup.querySelector(`.effect-level`);
const effectLevelInput = effectLevelControl.querySelector(`.effect-level__value`);
const effectRange = effectLevelControl.querySelector(`.effect-level__line`);
const effectLevelBar = effectRange.querySelector(`.effect-level__depth`);
const effectLevelPin = effectRange.querySelector(`.effect-level__pin`);
const scaleValueInput = uploadPopup.querySelector(`.scale__control--value`);

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


let effect;
let effectClass;

const getDefaultEffectSettings = () => {
  effectLevelControl.classList.add(`hidden`);
  effectLevelPin.style.left = `${DEFAULT_EFFECT_PERCENT}%`;
  effectLevelBar.style.width = `${DEFAULT_EFFECT_PERCENT}%`;
  uploadPopupPreview.classList.remove(effectClass);
  uploadPopupPreview.style.filter = ``;
  effectLevelInput.setAttribute(`value`, DEFAULT_EFFECT_PERCENT);
};

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
  effectLevelInput.setAttribute(`value`, effectPercent);
};

const onEffectPinMouseDown = () => {
  const onEffectPinMouseMove = (moveEvt) => {

    const shiftX = moveEvt.clientX - effectRange.getBoundingClientRect().left;
    const effectPercent = shiftX / effectRange.offsetWidth * 100;

    if (effectPercent > 100) {
      changeEffectLevel(100);
    } else if (effectPercent < 0) {
      changeEffectLevel(0);
    } else {
      changeEffectLevel(effectPercent);
    }
  };

  const onEffectPinMouseUp = () => {
    document.removeEventListener(`mousemove`, onEffectPinMouseMove);
    document.removeEventListener(`mouseup`, onEffectPinMouseUp);
  };

  document.addEventListener(`mousemove`, onEffectPinMouseMove);
  document.addEventListener(`mouseup`, onEffectPinMouseUp);
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

window.uploadFormImageSettings = {
  onPlusScaleButtonClick,
  onMinusScaleButtonClick,
  getDefaultScaleSettings,
  getDefaultEffectSettings,
  onEffectChange,
  onEffectPinMouseDown,
  onEffectRangeClick,
  onEffectPinKeydown
};

'use strict';

const COMMENT_MAX_LENGTH = 140;
const HASHTAGS_MAX_QUANTITY = 5;
const HASHTAGS_MAX_LENGTH = 20;


const uploadPopup = document.querySelector(`.img-upload__overlay`);
const hashtagsInput = uploadPopup.querySelector(`.text__hashtags`);
const commentInput = uploadPopup.querySelector(`.text__description`);

const regExp = /^#[a-zA-Zа-яА-Я0-9]*$/;

const onHashtagInputInput = () => {
  if (hashtagsInput.value) {
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
  } else {
    hashtagsInput.setCustomValidity(``);
  }

  hashtagsInput.reportValidity();

  if (hashtagsInput.validationMessage !== ``) {
    hashtagsInput.style.boxShadow = `0 0 0 2px #ff4e4e`;
  } else {
    hashtagsInput.style.boxShadow = `none`;
  }
};

const onCommentInputInput = () => {
  const valueLength = commentInput.value.length;

  if (valueLength > COMMENT_MAX_LENGTH) {
    commentInput.setCustomValidity(`Удалите лишние ${valueLength - COMMENT_MAX_LENGTH} симв.`);
  } else {
    commentInput.setCustomValidity(``);
  }

  commentInput.reportValidity();

  if (commentInput.validationMessage !== ``) {
    commentInput.style.boxShadow = `0 0 0 2px #ff4e4e`;
  } else {
    commentInput.style.boxShadow = `none`;
  }
};


window.uploadFormValidity = {
  onHashtagInputInput,
  onCommentInputInput,
};

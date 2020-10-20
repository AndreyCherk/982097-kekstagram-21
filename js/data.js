'use strict';

(() => {
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

  const getComment = () => {
    return {
      avatar: `img/avatar-${window.util.getRandomInteger(1, AVATAR_QUANTITY)}.svg`,
      message: window.util.getRandomArrayItem(COMMENTS),
      name: window.util.getRandomArrayItem(COMMENT_AUTHORS_MAMES),
    };
  };

  const getComments = (quantity) => {
    const comments = [];

    for (let i = 0; i < quantity; i++) {
      comments.push(getComment());
    }

    return comments;
  };

  const getPicture = (src) => {
    return {
      url: `photos/${src}.jpg`,
      description: `Описание фотографии`,
      likes: window.util.getRandomInteger(LIKES_MIN_QUANTITY, LIKES_MAX_QUANTITY),
      comments: getComments(window.util.getRandomInteger(COMMENTS_MIN_QUANTITY, COMMENTS_MAX_QUANTITY)),
    };
  };

  const getPictures = (quantity) => {
    const pictures = [];

    for (let i = 1; i <= quantity; i++) {
      pictures.push(getPicture(i));
    }

    return pictures;
  };

  const pictures = getPictures(PHOTO_QUANTITY);


  window.data = {
    pictures,
  };

})();

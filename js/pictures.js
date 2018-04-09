'use strict';

var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTION = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

var photos = []; // массив с данными о фотографиях
var COUNT_PHOTOS = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;

/**
 * Функция нахождения рандомного элемента в массиве.
 * @param {Array} arr
 * @return {string}
 */
var getRandomElementArray = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * Функция нахождения рандомного числа в заданном отрезке.
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

for (var i = 0; i < COUNT_PHOTOS; i++) {
  photos[i] = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomInt(MIN_LIKES, MAX_LIKES),
    comments: getRandomElementArray(COMMENTS),
    description: getRandomElementArray(DESCRIPTION)
  };
}

var template = document.querySelector('#picture').content.querySelector('.picture__link');

/**
 * Функция генерирования фотографии из массива
 * @param {Array} arr
 * @return {string}
 */
var renderPhoto = function (arr) {
  var picture = template.cloneNode(true);

  var pictureImg = picture.querySelector('.picture__img');
  var pictureLikes = picture.querySelector('.picture__stat--likes');
  var pictureComments = picture.querySelector('.picture__stat--comments');

  pictureImg.src = arr.url;
  pictureLikes.textContent = arr.likes;
  pictureComments.textContent = arr.comments;

  return picture;
};

var fragment = document.createDocumentFragment();
var picturesDiv = document.querySelector('.pictures');

for (i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPhoto(photos[i]));
}

picturesDiv.appendChild(fragment);

var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = document.querySelector('.big-picture__img img');
var bigPictureLike = document.querySelector('.likes-count');
var bigPictureComments = document.querySelectorAll('.social__comment');
var bigPictureCommentsCount = document.querySelector('.comments-count');
var bigPictureAvatar;
var BIG_PHOTO_NUMBER = 0;
var MIN_COMMENTS = 15;
var MAX_COMMENTS = 100;
var MIN_AVATAR_NUMBER = 1;
var MAX_AVATAR_NUMBER = 6;

bigPicture.classList.remove('hidden');
bigPictureImg.src = photos[BIG_PHOTO_NUMBER].url;
bigPictureLike.textContent = photos[BIG_PHOTO_NUMBER].likes;
bigPictureCommentsCount.textContent = getRandomInt(MIN_COMMENTS, MAX_COMMENTS);

for (i = 0; i < bigPictureComments.length; i++) {
  bigPictureAvatar = bigPictureComments[i].querySelector('.social__picture');

  bigPictureAvatar.src = 'img/avatar-' + getRandomInt(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg';
  bigPictureComments[i].lastChild.textContent = photos[BIG_PHOTO_NUMBER].comments;
}

var socialCommentsCount = document.querySelector('.social__comment-count');
var socialCommentsLoadmore = document.querySelector('.social__comment-loadmore');

socialCommentsCount.classList.add('visually-hidden');
socialCommentsLoadmore.classList.add('visually-hidden');

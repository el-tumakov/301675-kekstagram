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

var photosMeta = [];
var COUNT_PHOTOS = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;

/**
 * Функция нахождения рандомного элемента в массиве.
 * @param {Array} arr
 * @return {number}
 */
var getRandomElementArray = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * Функция нахождения рандомного числа в заданном отрезке.
 * @param {number, mumber} mix max
 * @return {number}
 */
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (var i = 0; i < COUNT_PHOTOS; i++) {
  photosMeta[i] = {
    url: 'photos/{{' + (i + 1) + '}}.jpg',
    likes: getRandomInt(MIN_LIKES, MAX_LIKES),
    comments: getRandomElementArray(COMMENTS),
    description: getRandomElementArray(DESCRIPTION)
  };
}

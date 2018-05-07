'use strict';

(function () {
  var ERRORS = [
    'Хэш-тег должен начинаться с символа - #.',
    'Хэш-тег не может состоять только из одной решетки.',
    'Хэш-теги должны разделяться пробелами.',
    'Один и тот же хэш-тег не может быть использован дважды.',
    'Нельзя указывать больше пяти хэш-тегов.',
    'Длина одного хэш-тега не должна превышать 20 символов (включая #).'
  ];
  var Hashtags = {
    MAX: 5,
    MAX_SYMBOLS: 20,
    MAX_SAME: 1
  };

  var inputHashTag = document.querySelector('.text__hashtags');

  /**
   * Функция проверки хэш-тега на ошибку.
   * @param {string} errorNumber - сообщение об ошибке.
   * @param {string} checkNumber - условие для проверки хэш-тега на ошибки.
   */
  var checkError = function (errorNumber, checkNumber) {
    if (checkNumber) {
      inputHashTag.setCustomValidity(errorNumber);
      inputHashTag.setAttribute('style', 'border: 2px solid red');
    }
  };

  /**
   * Кастомная валидация поля с хэш-тегом.
   */
  var inputHashTagCustomValidity = function () {
    /**
     * Приводим значение хэш-тегов к нижнему регистру.
     */
    inputHashTag.value = inputHashTag.value.toLowerCase();

    /**
     * Разбиваем введеные пользователем хэш-теги по пробелу.
     * Добавляем полученные элементы в массив.
     */
    var hashTagValue = inputHashTag.value;
    var separator = /\s+/;
    var hashTags = hashTagValue.split(separator);

    /**
     * Удаляем пустые элементы в полученном массиве хэш-тегов.
     */
    if (hashTags[hashTags.length - 1] === '') {
      hashTags = hashTags.slice(0, -1);
    }

    inputHashTag.setCustomValidity('');
    inputHashTag.style = '';

    for (var i = 0; i < hashTags.length; i++) {
      /**
       * Массив проверок на ошибки.
       */
      var checks = [
        !hashTags[i].match(/^#/), // Хэш-тег должен начинаться с символа - #.
        hashTags[i] === '#', // Хэш-тег не может состоять только из одной решетки.
        hashTags[i].match(/#[\wа-яё]*#/), // Хэш-теги должны разделяться пробелами.
        count > Hashtags.MAX_SAME, // Один и тот же хэш-тег не может быть использован дважды.
        hashTags.length > Hashtags.MAX, // Нельзя указывать больше пяти хэш-тегов.
        hashTags[i].length > Hashtags.MAX_SYMBOLS // Длина одного хэш-тега не должна превышать 20 символов (включая #).
      ];

      /**
       * Подсчет одинаковых хэш-тегов в массиве.
       */
      var count = 0;
      var tag = hashTags.indexOf(hashTags[i]);

      while (tag !== -1) {
        count++;
        tag = hashTags.indexOf(hashTags[i], tag + 1);
      }

      /**
       * Проверка хэш-тегов на ошибки.
       */
      for (var j = 0; j < checks.length; j++) {
        checkError(ERRORS[j], checks[j]);
      }
    }
  };

  inputHashTag.addEventListener('keyup', function () {
    inputHashTagCustomValidity();
  });
})();

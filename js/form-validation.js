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

  var formWrap = document.querySelector('.text');
  var inputHashTag = document.querySelector('.text__hashtags');

  var fragmentErrors = document.createDocumentFragment();
  var errorsList = document.createElement('ul');

  fragmentErrors.appendChild(errorsList);

  errorsList.classList.add('visually-hidden');
  errorsList.style.textAlign = 'left';
  errorsList.style.fontStyle = 'italic';
  errorsList.style.textTransform = 'none';
  errorsList.style.listStyle = 'none';
  errorsList.style.color = 'lightgreen';

  for (var i = 0; i < ERRORS.length; i++) {
    var listElement = document.createElement('li');

    listElement.textContent = ERRORS[i];
    listElement.classList.add('error-' + i, 'errors');
    errorsList.appendChild(listElement);
  }

  formWrap.insertBefore(fragmentErrors, inputHashTag.nextSibling);

  var errorsListElements = document.querySelectorAll('.errors');

  /**
   * Кастомная валидация поля с хэш-тегом.
   */
  var inputHashTagCustomValidity = function () {
    var errors = [
      document.querySelector('.error-0'),
      document.querySelector('.error-1'),
      document.querySelector('.error-2'),
      document.querySelector('.error-3'),
      document.querySelector('.error-4'),
      document.querySelector('.error-5')
    ];

    /**
     * Обнуляем ошибки.
     */
    var error = false;

    for (i = 0; i < errors.length; i++) {
      errors[i].style.color = 'lightgreen';
    }

    /**
     * Функция проверки хэш-тега на ошибку.
     * @param {string} errorNumber - элемент ошибки в DOM, у которой будем менять цвет.
     * @param {string} checkNumber - условие для проверки хэш-тега на ошибки.
     */
    var checkError = function (errorNumber, checkNumber) {
      if (checkNumber) {
        error = true;
        errorNumber.style.color = 'red';
      } else if (errorNumber.style.color !== 'red') {
        errorNumber.style.color = 'lightgreen';
      }
    };

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

    /**
     * Если массив пустой, то обнулить все ошибки.
     */
    if (hashTags.length === 0) {
      error = false;

      for (i = 0; i < errorsListElements.length; i++) {
        errorsListElements[i].style.color = 'lightgreen';
      }

      inputHashTag.classList.remove('hashtag-error');
    }

    for (i = 0; i < hashTags.length; i++) {
      /**
       * Подсчет одинаковых хэш-тегов в массиве.
       */
      var count = 0;
      var tag = hashTags.indexOf(hashTags[i]);

      while (tag !== -1) {
        count++;
        tag = hashTags.indexOf(hashTags[i], tag + 1);
      }

      var checks = [
        !hashTags[i].match(/^#/), // Хэш-тег должен начинаться с символа - #.
        hashTags[i] === '#', // Хэш-тег не может состоять только из одной решетки.
        hashTags[i].match(/#[\wа-яё]*#/), // Хэш-теги должны разделяться пробелами.
        count > Hashtags.MAX_SAME, // Один и тот же хэш-тег не может быть использован дважды.
        hashTags.length > Hashtags.MAX, // Нельзя указывать больше пяти хэш-тегов.
        hashTags[i].length > Hashtags.MAX_SYMBOLS // Длина одного хэш-тега не должна превышать 20 символов (включая #).
      ];

      /**
       * Проверка хэш-тегов на ошибки.
       */
      for (var j = 0; j < errors.length; j++) {
        checkError(errors[j], checks[j]);
      }

      if (error) {
        inputHashTag.setCustomValidity('Хэш-тег не соответствует требованиям.');
        inputHashTag.classList.add('hashtag-error');
      } else {
        inputHashTag.classList.remove('hashtag-error');
      }
    }
  };

  inputHashTag.addEventListener('focus', function () {
    errorsList.classList.remove('visually-hidden');
  });

  inputHashTag.addEventListener('blur', function () {
    if (!inputHashTag.classList.contains('hashtag-error')) {
      errorsList.classList.add('visually-hidden');
    }
  });

  inputHashTag.addEventListener('keyup', function () {
    inputHashTagCustomValidity();
  });
})();

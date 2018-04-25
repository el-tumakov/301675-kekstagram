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
  var MAX_HASHTAGS = 5;
  var MAX_HASHTAG_SYMBOLS = 20;
  var MAX_SAME_HASHTAG = 1;

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
    var error0 = document.querySelector('.error-0');
    var error1 = document.querySelector('.error-1');
    var error2 = document.querySelector('.error-2');
    var error3 = document.querySelector('.error-3');
    var error4 = document.querySelector('.error-4');
    var error5 = document.querySelector('.error-5');

    var error = false;

    /**
     * Функция проверки хэш-тега на ошибку.
     * @param {string} errorNumber - элемент ошибки в DOM, у которой будем менять цвет.
     * @param {string} checkNumber - условие для проверки хэш-тега на ошибки.
     */
    var checkError = function (errorNumber, checkNumber) {
      if (checkNumber) {
        error = true;
        errorNumber.style.color = 'red';
      } else {
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
      var check0 = !hashTags[i].match(/^#/);
      var check1 = hashTags[i] === '#';
      var check2 = hashTags[i].match(/#[\wа-яё]*#/);
      var check3 = count > MAX_SAME_HASHTAG;
      var check4 = hashTags.length > MAX_HASHTAGS;
      var check5 = hashTags[i].length > MAX_HASHTAG_SYMBOLS;

      /**
       * Хэш-тег должен начинаться с символа - #.
       */
      checkError(error0, check0);

      /**
       * Хэш-тег не может состоять только из одной решетки.
       */
      checkError(error1, check1);

      /**
       * Хэш-теги должны разделяться пробелами.
       */
      checkError(error2, check2);

      /**
       * Один и тот же хэш-тег не может быть использован дважды.
       */
      var count = 0;
      var tag = hashTags.indexOf(hashTags[i]);

      while (tag !== -1) {
        count++;
        tag = hashTags.indexOf(hashTags[i], tag + 1);
      }

      checkError(error3, check3);

      /**
       * Нельзя указывать больше пяти хэш-тегов.
       */
      checkError(error4, check4);

      /**
       * Длина одного хэш-тега не должна превышать 20 символов (включая #).
       */
      checkError(error5, check5);

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

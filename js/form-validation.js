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
    inputHashTag.value = inputHashTag.value.toLowerCase();

    var hashTagValue = inputHashTag.value;
    var separator = /\s+/;
    var hashTags = hashTagValue.split(separator);
    var error = false;

    inputHashTag.setCustomValidity('');

    for (i = 0; i < hashTags.length; i++) {
      if (hashTags[i] === '') {
        error = false;

        for (i = 0; i < errorsListElements.length; i++) {
          errorsListElements[i].style.color = 'lightgreen';
        }

        inputHashTag.classList.remove('hashtag-error');

        break;
      }

      /**
       * Хэш-тег должен начинаться с символа - #.
       */
      if (!hashTags[i].match(/^#/)) {
        error = true;
        document.querySelector('.error-0').style.color = 'red';
      } else {
        document.querySelector('.error-0').style.color = 'lightgreen';
      }

      /**
       * Хэш-тег не может состоять только из одной решетки.
       */
      if (hashTags[i] === '#') {
        error = true;
        document.querySelector('.error-1').style.color = 'red';
      } else {
        document.querySelector('.error-1').style.color = 'lightgreen';
      }

      /**
       * Хэш-теги должны разделяться пробелами.
       */
      if (hashTags[i].match(/#[\wа-яё]*#/)) {
        error = true;
        document.querySelector('.error-2').style.color = 'red';
      } else {
        document.querySelector('.error-2').style.color = 'lightgreen';
      }

      /**
       * Один и тот же хэш-тег не может быть использован дважды.
       */
      if (hashTags[i] === hashTags[i - 1]) {
        error = true;
        document.querySelector('.error-3').style.color = 'red';
      } else {
        document.querySelector('.error-3').style.color = 'lightgreen';
      }

      /**
       * Нельзя указывать больше пяти хэш-тегов.
       */
      if (hashTags.length > 5) {
        error = true;
        document.querySelector('.error-4').style.color = 'red';
      } else {
        document.querySelector('.error-4').style.color = 'lightgreen';
      }

      /**
       * Длина одного хэш-тега не должна превышать 20 символов (включая #).
       */
      if (hashTags[i].length > 20) {
        error = true;
        document.querySelector('.error-5').style.color = 'red';
      } else {
        document.querySelector('.error-5').style.color = 'lightgreen';
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

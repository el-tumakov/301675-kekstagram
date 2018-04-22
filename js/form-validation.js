'use strict';

(function () {
  var formSubmit = document.querySelector('.img-upload__submit');

  /**
   * Кастомная валидация поля с хэш-тегом.
   */
  var inputHashTagCustomValidity = function () {
    var inputHashTag = document.querySelector('.text__hashtags');
    var hashTagValue = inputHashTag.value;
    var separator = /\s+/;
    var hashTags = hashTagValue.split(separator);
    var errorMessages = [];
    var error = false;

    inputHashTag.setCustomValidity('');

    for (var i = 0; i < hashTags.length; i++) {
      if (hashTags[i] === '') {
        break;
      }

      if (!hashTags[i].match(/#/)) {
        errorMessages.push('Хэш-тег должен начинаться с символа - #.');
        error = true;
      }

      if (hashTags[i] === '#') {
        errorMessages.push('Хэш-тег не может состоять только из одной решетки.');
        error = true;
      }

      if (hashTags[i].match(/#[\wа-яё]+#/)) {
        errorMessages.push('Хэш-теги должны разделяться пробелами.');
        error = true;
      }

      if (hashTags[i] === hashTags[i - 1]) {
        errorMessages.push('Один и тот же хэш-тег не может быть использован дважды.');
        error = true;
      }

      if (hashTags.length > 5) {
        errorMessages.push('Нельзя указывать больше пяти хэш-тегов.');
        error = true;
      }

      if (hashTags[i].length > 20) {
        errorMessages.push('Длина одного хэш-тега не должна превышать 20 символов (включая #).');
        error = true;
      }

      if (error === true) {
        inputHashTag.setCustomValidity(errorMessages.join('. \n'));
        break;
      }
    }
  };

  /**
   * Обработчик клика на кнопку "Опубликовать" в форме загрузки фотографии.
   * Производит валидацию хэш-тега.
   * Если валидация пройдена отправляет данные на сервер.
   */
  var formSubmitClickHandler = function () {
    inputHashTagCustomValidity();
  };

  formSubmit.addEventListener('click', formSubmitClickHandler);
})();

'use strict';

(function () {
  var CHECKED_EFFECT = 0;
  var BLUR_MAX_VALUE = 3;
  var BRIGHTNESS_MAX_VALUE = 2;
  var BRIGHTNESS_STEP = 1;
  var MAX_FILTER_VALUE_PERCENT = 100;

  /**
   * Добавление эффектов к фотографиям.
   */
  var picturePreview = document.querySelector('.img-upload__preview img');
  var effects = document.querySelectorAll('.effects__radio');
  var scale = document.querySelector('.scale');
  var scalePin = document.querySelector('.scale__pin');
  var scaleValue = document.querySelector('.scale__value');
  var scaleLevel = document.querySelector('.scale__level');

  scale.classList.add('visually-hidden');
  scalePin.setAttribute('style', 'left: 100%');
  scaleLevel.setAttribute('style', 'width: 100%');

  /**
   * Функция расчетов уровня насыщенности эффектов.
   */
  var getEffectLevel = function () {
    var scaleValueNumber = scaleLevel.style.width.replace(/%/, '');
    var filterGrayscale = (scaleValueNumber / MAX_FILTER_VALUE_PERCENT);
    var filterSepia = (scaleValueNumber / MAX_FILTER_VALUE_PERCENT);
    var filterBlur = (scaleValueNumber * BLUR_MAX_VALUE / MAX_FILTER_VALUE_PERCENT);
    var filterBrightness = (scaleValueNumber * BRIGHTNESS_MAX_VALUE / MAX_FILTER_VALUE_PERCENT + BRIGHTNESS_STEP);

    if (picturePreview.className === 'effects__preview--none' || picturePreview.className === '') {
      picturePreview.style.filter = '';
    }
    if (picturePreview.className === 'effects__preview--chrome') {
      picturePreview.style.filter = 'grayscale(' + filterGrayscale + ')';
    }
    if (picturePreview.className === 'effects__preview--sepia') {
      picturePreview.style.filter = 'sepia(' + filterSepia + ')';
    }
    if (picturePreview.className === 'effects__preview--marvin') {
      picturePreview.style.filter = 'invert(' + scaleValueNumber + '%)';
    }
    if (picturePreview.className === 'effects__preview--phobos') {
      picturePreview.style.filter = 'blur(' + filterBlur + 'px)';
    }
    if (picturePreview.className === 'effects__preview--heat') {
      picturePreview.style.filter = 'brightness(' + filterBrightness + ')';
    }

    scaleValue.setAttribute('value', scaleValueNumber);
  };

  /**
   * Обработчик события при клике на эффект.
   * Меняет наложенный эффект на фотографии.
   */
  var effectsClickHandler = function () {
    for (var i = 0; i < effects.length; i++) {
      if (effects[i].checked) {
        picturePreview.className = '';
        picturePreview.classList.add('effects__preview--' + effects[i].value);
        scaleLevel.style.width = '100%';
      }
    }

    if (effects[CHECKED_EFFECT].checked) {
      scale.classList.add('visually-hidden');
    } else {
      scale.classList.remove('visually-hidden');
    }

    getEffectLevel();
  };

  for (var i = 0; i < effects.length; i++) {
    effects[i].addEventListener('click', effectsClickHandler);
  }

  /**
   * Полузнок регулирования интенсиновсти эффекта в редакторе фотографии.
   */

  scalePin.addEventListener('mouseup', getEffectLevel);
})();

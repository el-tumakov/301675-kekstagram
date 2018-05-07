'use strict';

(function () {
  var CHECKED_EFFECT = 0;
  var MIN_EFFECT_LEVEL = 0;
  var MAX_EFFECT_LEVEL = 100;
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
  var scaleLine = document.querySelector('.scale__line');
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
    var scaleValueNumber = Number(scaleLevel.style.width.replace(/%/, ''));
    var filterGrayscale = (scaleValueNumber / MAX_FILTER_VALUE_PERCENT);
    var filterSepia = (scaleValueNumber / MAX_FILTER_VALUE_PERCENT);
    var filterBlur = (scaleValueNumber * BLUR_MAX_VALUE / MAX_FILTER_VALUE_PERCENT);
    var filterBrightness = (scaleValueNumber * BRIGHTNESS_MAX_VALUE / MAX_FILTER_VALUE_PERCENT + BRIGHTNESS_STEP);

    switch (picturePreview.className) {
      case '':
      case 'effects__preview--none':
        picturePreview.style.filter = '';
        break;
      case 'effects__preview--chrome':
        picturePreview.style.filter = 'grayscale(' + filterGrayscale + ')';
        break;
      case 'effects__preview--sepia':
        picturePreview.style.filter = 'sepia(' + filterSepia + ')';
        break;
      case 'effects__preview--marvin':
        picturePreview.style.filter = 'invert(' + scaleValueNumber + '%)';
        break;
      case 'effects__preview--phobos':
        picturePreview.style.filter = 'blur(' + filterBlur + 'px)';
        break;
      case 'effects__preview--heat':
        picturePreview.style.filter = 'brightness(' + filterBrightness + ')';
        break;
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
        scalePin.style.left = '100%';
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
   * Слайдер уровня эффекта.
   * Координата задается в пределах от 0% до 100% отступа слева от родительского блока.
   * @param {Object} evt - event.
   * @param {string} elem - элемент, который хотим перетащить.
   * @param {string} parent - родитель элемента. Для контроля выхода за границы.
   * @param {string} elemLevel - уровень накладываемого эффекта.
   */
  var dragSlider = function (evt, elem, parent, elemLevel) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    /**
     * Обработчик перемещения указателя мыши.
     * При условии, что при перемещении элемент не выйдет за границы родителя - перемещает элемент.
     * Получает конечный уровень эффекта и применяет эффект.
     * @param {Object} moveEvt - event.
     */
    var mousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var elementShift = elem.offsetLeft - shift.x;

      if (elementShift <= parent.offsetWidth && elementShift >= MIN_EFFECT_LEVEL) {
        elem.style.left = (elementShift * MAX_EFFECT_LEVEL / parent.offsetWidth) + '%';
        elemLevel.style.width = elem.style.left;
        getEffectLevel();
      }
    };

    var mouseupHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mousemoveHandler);
      document.removeEventListener('mouseup', mouseupHandler);
    };

    document.addEventListener('mousemove', mousemoveHandler);
    document.addEventListener('mouseup', mouseupHandler);
  };

  var scalePinMousedownHandler = function (evt) {
    dragSlider(evt, scalePin, scaleLine, scaleLevel);
  };

  scalePin.addEventListener('mousedown', scalePinMousedownHandler);
})();

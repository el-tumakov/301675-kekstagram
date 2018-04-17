'use strict';

(function () {
  var RESIZE_MAX = '100%';
  var RESIZE_MIN = '25%';
  var RESIZE_STEP = 25;
  var SCALE_STEP = 0.25;

  /**
   * Регулирование масшатаба изображения в редакторе фотографии.
   */
  var resizeValue = document.querySelector('.resize__control--value');
  var resizeWrap = document.querySelector('.img-upload__resize');
  var resizeMinus = document.querySelector('.resize__control--minus');
  var resizePlus = document.querySelector('.resize__control--plus');
  var picturePreview = document.querySelector('.img-upload__preview img');

  resizeWrap.setAttribute('style', 'z-index: 1');
  picturePreview.setAttribute('style', 'transform: scale(1)');

  /**
   * Функция изменения масштаба фотографии.
   * @param {boolean} minus - для уменьшения масшатаба.
   * @param {boolean} plus - для увеличения масштаба.
   */
  var changeResizeValue = function (minus, plus) {
    var resizeValueNumber = Number(resizeValue.value.replace(/%/gi, ''));
    var resizeScaleNumber = Number(picturePreview.style.transform.replace(/[^.0-9]/gim, ''));

    if (minus) {
      if (!(resizeValue.value === RESIZE_MIN)) {
        resizeValue.setAttribute('value', resizeValueNumber - RESIZE_STEP + '%');
        picturePreview.style.transform = 'scale(' + (resizeScaleNumber - SCALE_STEP) + ')';
      }
    }

    if (plus) {
      if (!(resizeValue.value === RESIZE_MAX)) {
        resizeValue.setAttribute('value', resizeValueNumber + RESIZE_STEP + '%');
        picturePreview.style.transform = 'scale(' + (resizeScaleNumber + SCALE_STEP) + ')';
      }
    }
  };

  /**
   * Обработчик события при клике на увеличение масштаба.
   * Увеличивает масштаб с шагом в 25%.
   * Максимум 100%.
   */
  var resizeMinusClickHandler = function () {
    changeResizeValue(true, false);
  };

  var resizePlusClickHandler = function () {
    changeResizeValue(false, true);
  };

  resizeMinus.addEventListener('click', resizeMinusClickHandler);
  resizePlus.addEventListener('click', resizePlusClickHandler);
})();

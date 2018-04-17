'use strict';

(function () {
  var CHECKED_EFFECT = 0;
  var RESIZE_MAX = '100%';
  var ESC_KEYCODE = 27;
  var DEFAULT_TRANSFORM = 'scale(1)';

  /**
   * Показ формы редактирования нового изображения.
   */
  var pictureEditor = document.querySelector('.img-upload__overlay');
  var pictureUploadInput = document.querySelector('#upload-file');
  var resizeValue = document.querySelector('.resize__control--value');
  var inputHashTag = document.querySelector('.text__hashtags');
  var inputComment = document.querySelector('.text__description');
  var effects = document.querySelectorAll('.effects__radio');
  var picturePreview = document.querySelector('.img-upload__preview img');
  var scale = document.querySelector('.scale');

  /**
   * Обработчик события при загрузке фотографии.
   * Открывает попап с редактором фотографии.
   */
  var pictureUploadInputChangeHandler = function () {
    effects[CHECKED_EFFECT].checked = 'checked';
    resizeValue.setAttribute('value', RESIZE_MAX);
    picturePreview.style.transform = DEFAULT_TRANSFORM;
    pictureEditor.classList.remove('hidden');
    document.addEventListener('keydown', pictureEditorKeydownHandler);
  };

  pictureUploadInput.addEventListener('change', pictureUploadInputChangeHandler);


  /**
   * Закрытие формы редактирования нового изображения.
   */
  var pictureEditorCancel = document.querySelector('.img-upload__cancel');

  /**
   * Закрывает окно редактора фотографии.
   */
  var closePictureEditor = function () {
    pictureUploadInput.value = '';
    picturePreview.style = '';
    picturePreview.className = '';
    pictureEditor.classList.add('hidden');
    scale.classList.add('visually-hidden');
    document.removeEventListener('keydown', pictureEditorKeydownHandler);
  };

  /**
   * Обработчик события нажатия кливиши при открытом попапе редактора фотографии.
   * При нажатии на ESC закрывает попап.
   * @param {Object} evt - event.
   */
  var pictureEditorKeydownHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && !(inputHashTag === document.activeElement) && !(inputComment === document.activeElement)) {
      closePictureEditor();
    }
  };

  /**
   * Обработчик клика на кнопку закрытия окна редактора.
   * Закрывает окно.
   */
  var pictureEditorCancelClickHandler = function () {
    closePictureEditor();
  };

  pictureEditorCancel.addEventListener('click', pictureEditorCancelClickHandler);
})();

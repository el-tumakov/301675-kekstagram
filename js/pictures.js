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
var COUNT_PHOTOS = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var COUNT_COMMENTS = 2;
var MIN_COMMENTS = 15;
var MAX_COMMENTS = 100;
var MIN_AVATAR_NUMBER = 1;
var MAX_AVATAR_NUMBER = 6;
var ESC_KEYCODE = 27;
var RESIZE_MAX = '100%';
var RESIZE_MIN = '25%';
var RESIZE_STEP = 25;
var SCALE_STEP = 0.25;
var CHECKED_EFFECT = 0;
var BLUR_MAX_VALUE = 3;
var BRIGHTNESS_MAX_VALUE = 2;
var BRIGHTNESS_STEP = 1;
var MAX_FILTER_VALUE_PERCENT = 100;

/**
 * Функция нахождения рандомного элемента в массиве.
 * @param {Array} arr - вводим массив.
 * @return {string} - возвращаем элемент массива.
 */
var getRandomElementArray = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * Функция нахождения рандомного числа в заданном отрезке.
 * @param {number} min - минимальный диапазон рандома.
 * @param {number} max - максимальный диапазон рандома.
 * @return {number} - рандомное число.
 */
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Функция подбрасывания монетки.
 * Возвращает true или false.
 * @return {boolean}
 */
var coinToss = function () {
  return Math.floor(Math.random() * 2);
};


/**
 * Генерация случайных комментариев для фотографий.
 */
var commentsPhoto = [];
for (var i = 0; i < COUNT_PHOTOS; i++) {
  commentsPhoto[i] = [];
  var randomComment = getRandomElementArray(COMMENTS);
  /**
   * Если при подбросе монетки будет true - у фотографии два комментария, если false - один.
   */
  if (coinToss()) {
    /**
     * Цикл, который присваивает рандомные комментарии из базы.
     * При этом происходит проверка на повторяющийся комментарий.
     * Если такой коммент уже был, то он его отбрасывает и берет другой.
     */
    while (commentsPhoto[i].length < COUNT_COMMENTS) {
      randomComment = getRandomElementArray(COMMENTS);
      var found = false;

      for (var j = 0; j < commentsPhoto[i].length; j++) {
        if (commentsPhoto[i][j] === randomComment) {
          found = true;
          break;
        }
      }

      if (!found) {
        commentsPhoto[i][commentsPhoto[i].length] = randomComment;
      }
    }
  } else {
    commentsPhoto[i] = [randomComment];
  }
}


/**
 * Генерация массива с данными о фотографиях.
 */
var photos = [];

for (i = 0; i < COUNT_PHOTOS; i++) {
  photos[i] = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandomInt(MIN_LIKES, MAX_LIKES),
    comments: [commentsPhoto[i]],
    description: getRandomElementArray(DESCRIPTION)
  };
}


/**
 * Блок добавления маленьких фотографий на главную.
 */
var templatePhoto = document.querySelector('#picture').content.querySelector('.picture__link');

/**
 * Функция генерирования фотографии из массива.
 * @param {Array} pictures - массив объектов с данными о фотографиях.
 * @return {string} - возвращаем DOM ноду маленькой фотографии.
 */
var renderPhoto = function (pictures) {
  var picture = templatePhoto.cloneNode(true);

  var pictureImg = picture.querySelector('.picture__img');
  var pictureLikes = picture.querySelector('.picture__stat--likes');
  var pictureComments = picture.querySelector('.picture__stat--comments');

  pictureImg.src = pictures.url;
  pictureLikes.textContent = pictures.likes;
  pictureComments.textContent = pictures.comments;

  return picture;
};

var fragmentPhoto = document.createDocumentFragment();
var picturesDiv = document.querySelector('.pictures');

for (i = 0; i < photos.length; i++) {
  fragmentPhoto.appendChild(renderPhoto(photos[i]));
}

picturesDiv.appendChild(fragmentPhoto);


/**
 * Блок с показом большой фотографии.
 */
var bodyElement = document.querySelector('body');
var picturesLink = document.querySelectorAll('.picture__link');
var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = document.querySelector('.big-picture__img img');
var bigPictureLike = document.querySelector('.likes-count');
var bigPictureCommentsCount = document.querySelector('.comments-count');
var bigPictureCancel = document.querySelector('.big-picture__cancel');
var socialCommentsCount = document.querySelector('.social__comment-count');
var socialCommentsLoadmore = document.querySelector('.social__comment-loadmore');

bigPictureCommentsCount.textContent = getRandomInt(MIN_COMMENTS, MAX_COMMENTS);
socialCommentsCount.classList.add('visually-hidden');
socialCommentsLoadmore.classList.add('visually-hidden');

/**
 * Добавление комментариев из массива данных на сайт.
 */
var bigPictureCommentsList = document.querySelector('.social__comments');
var templateComment = document.querySelector('.social__comment');

/**
 * Функция генерации ноды комментария.
 * @param {Array} commentaryes - двумерный массив с комментариями.
 * @return {Array} - возвращаем DOM ноду комментария.
 */
var renderComment = function (commentaryes) {
  var commentary = templateComment.cloneNode(true);
  var bigPictureAvatar = commentary.querySelector('.social__picture');

  bigPictureAvatar.src = 'img/avatar-' + getRandomInt(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg';
  commentary.lastChild.textContent = commentaryes;

  return commentary;
};

var fragmentPictureComment = document.createDocumentFragment();

/**
 * Обработчик клика на маленькую фотографию.
 * Открывает большую фотографию и присваивает данных о фото из массива photos.
 */
var picturesDivClickHandler = function () {
  var target = event.target;
  var parentTarget = target.parentNode;
  var targetNumber = Array.prototype.indexOf.call(picturesLink, parentTarget);

  if (target.className === 'picture__img') {
    bigPicture.classList.remove('hidden');
    bigPictureImg.src = target.src;
    bigPictureLike.textContent = photos[targetNumber + 1].likes;

    /**
     * Генерирование комментариев для выбранной фотографии.
     */
    for (i = 0; i < commentsPhoto[targetNumber].length; i++) {
      fragmentPictureComment.appendChild(renderComment(commentsPhoto[targetNumber][i]));
    }

    /**
     * Удаление стандартных комментариев и добавление сгенерированных в DOM.
     */
    while (bigPictureCommentsList.firstChild) {
      bigPictureCommentsList.removeChild(bigPictureCommentsList.firstChild);
    }

    bigPictureCommentsList.appendChild(fragmentPictureComment);

    bodyElement.classList.add('modal-open');

    document.addEventListener('keydown', bigPictureKeydownHandler);
  }
};

picturesDiv.addEventListener('click', picturesDivClickHandler);

/**
 * Закрывает окно с большой фотографией.
 */
var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', bigPictureKeydownHandler);
};

/**
 * Обработчик события нажатия клавиши при открытой большой фотографии.
 * При нажати на ESC закрывает фотографию.
 * @param {Object} evt - event.
 */
var bigPictureKeydownHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPicture();
  }
};

/**
 * Обработчик клика по кнопке закрытия окна с большой фотографией.
 * Закрывает окно.
 */
var bigPictureCancelClickHandler = function () {
  closeBigPicture();
};

bigPictureCancel.addEventListener('click', bigPictureCancelClickHandler);


/**
 * Показ формы редактирования нового изображения.
 */
var pictureEditor = document.querySelector('.img-upload__overlay');
var pictureUploadInput = document.querySelector('#upload-file');
var resizeValue = document.querySelector('.resize__control--value');

var inputHashTag = document.querySelector('.text__hashtags');
var inputComment = document.querySelector('.text__description');
var formSubmit = document.querySelector('.img-upload__submit');

/**
 * Обработчик события при загрузке фотографии.
 * Открывает попап с редактором фотографии.
 */
var pictureUploadInputChangeHandler = function () {
  resizeValue.value = RESIZE_MAX;
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
  pictureEditor.classList.add('hidden');
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


/**
 * Регулирование масшатаба изображения в редакторе фотографии.
 */
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
      resizeValue.value = resizeValueNumber - RESIZE_STEP + '%';
      picturePreview.style.transform = 'scale(' + (resizeScaleNumber - SCALE_STEP) + ')';
    }
  }

  if (plus) {
    if (!(resizeValue.value === RESIZE_MAX)) {
      resizeValue.value = resizeValueNumber + RESIZE_STEP + '%';
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


/**
 * Добавление эффектов к фотографиям.
 */
var effects = document.querySelectorAll('.effects__radio');
var scale = document.querySelector('.scale');
var scalePin = document.querySelector('.scale__pin');
var scaleValue = document.querySelector('.scale__value');
var scaleLevel = document.querySelector('.scale__level');

effects[CHECKED_EFFECT].checked = 'checked';
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
  for (i = 0; i < effects.length; i++) {
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

for (i = 0; i < effects.length; i++) {
  effects[i].addEventListener('click', effectsClickHandler);
}

/**
 * Полузнок регулирования интенсиновсти эффекта в редакторе фотографии.
 */

scalePin.addEventListener('mouseup', getEffectLevel);


/**
 * Валидация формы загрузки изображения.
 */

/**
 * Кастомная валидация поля с хэш-тегом.
 */
var inputHashTagCustomValidity = function () {
  var hashTagValue = inputHashTag.value;
  var separator = /\s+/;
  var hashTags = hashTagValue.split(separator);
  var errorMessages = [];
  var error = false;

  inputHashTag.setCustomValidity('');

  for (i = 0; i < hashTags.length; i++) {
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

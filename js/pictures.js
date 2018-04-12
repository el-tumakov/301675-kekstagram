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
var BIG_PHOTO_NUMBER = 0;
var MIN_COMMENTS = 15;
var MAX_COMMENTS = 100;
var MIN_AVATAR_NUMBER = 1;
var MAX_AVATAR_NUMBER = 6;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

/**
 * Функция нахождения рандомного элемента в массиве.
 * @param {Array} arr - вводим массив
 * @return {string} - возвращаем элемент массива
 */
var getRandomElementArray = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * Функция нахождения рандомного числа в заданном отрезке.
 * @param {number} min - минимальный диапазон рандома
 * @param {number} max - максимальный диапазон рандома
 * @return {number} - рандомное число
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
 * Генерация массива с данными о фотографиях
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
 * Блок добавления маленьких фотографий на главную
 */
var templatePhoto = document.querySelector('#picture').content.querySelector('.picture__link');

/**
 * Функция генерирования фотографии из массива
 * @param {Array} pictures - массив объектов с данными о фотографиях
 * @return {string} - возвращаем DOM ноду маленькой фотографии
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
 * Блок с большой фотографией
 */
var picturesImg = document.querySelectorAll('.picture__img');
var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = document.querySelector('.big-picture__img img');
var bigPictureLike = document.querySelector('.likes-count');
var bigPictureCommentsCount = document.querySelector('.comments-count');

var getPhotoInfo = function (index) {
  bigPicture.classList.remove('hidden');

    bigPictureImg.src = photos[index].url;
    bigPictureLike.textContent = photos[index].likes;
};

for (i = 0; i < picturesImg.length; i++) {
  picturesImg[i].addEventListener('click', function () {
    getPhotoInfo(i);
  });
}
// bigPicture.classList.remove('hidden');
// bigPictureImg.src = photos[BIG_PHOTO_NUMBER].url;
// bigPictureLike.textContent = photos[BIG_PHOTO_NUMBER].likes;
bigPictureCommentsCount.textContent = getRandomInt(MIN_COMMENTS, MAX_COMMENTS);


/**
 * Блок с добавлением комментариев из массива данных на сайт
 */
var bigPictureCommentsList = document.querySelector('.social__comments');
var templateComment = document.querySelector('.social__comment');

/**
 * Функция генерации ноды комментария
 * @param {Array} commentaryes - двумерный массив с комментариями,
 * @return {Array} - возвращаем DOM ноду комментария
 */
var renderComment = function (commentaryes) {
  var commentary = templateComment.cloneNode(true);
  var bigPictureAvatar = commentary.querySelector('.social__picture');

  bigPictureAvatar.src = 'img/avatar-' + getRandomInt(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg';
  commentary.lastChild.textContent = commentaryes;

  return commentary;
};

var fragmentPictureComment = document.createDocumentFragment();

for (i = 0; i < commentsPhoto[BIG_PHOTO_NUMBER].length; i++) {
  fragmentPictureComment.appendChild(renderComment(commentsPhoto[BIG_PHOTO_NUMBER][i]));
}

/**
 * Удаление стандартных комментариев и добавление сгенерированных в DOM
 */
while (bigPictureCommentsList.firstChild) {
  bigPictureCommentsList.removeChild(bigPictureCommentsList.firstChild);
}

bigPictureCommentsList.appendChild(fragmentPictureComment);


var socialCommentsCount = document.querySelector('.social__comment-count');
var socialCommentsLoadmore = document.querySelector('.social__comment-loadmore');

socialCommentsCount.classList.add('visually-hidden');
socialCommentsLoadmore.classList.add('visually-hidden');


/**
 * Показ формы редактирования нового изображения.
 */
var pictureEditor = document.querySelector('.img-upload__overlay');
var pictureUploadInput = document.querySelector('#upload-file');
var resizeValue = document.querySelector('.resize__control--value');

/**
 * Обработчик события при загрузке фотографии.
 * Открывает попап с редактором фотографии.
 */
var pictureUploadInputChangeHandler = function () {
  resizeValue.value = '100%';
  pictureEditor.classList.remove('hidden');
  document.addEventListener('keydown', onPictureEditorEscPress);
};

pictureUploadInput.addEventListener('change', pictureUploadInputChangeHandler);


/**
 * Закрытие формы редактирования нового изображения.
 */
var pictureEditorCancel = document.querySelector('.img-upload__cancel');

/**
 * Обработчик события нажатия кливиши при открытом попапе редактора фотографии.
 * При нажатии на ESC закрывает попап.
 */
var onPictureEditorEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    pictureEditorCancelClickHandler();
  }
};

/**
 * Обработчик события при клике на крест в попапе.
 * Закрывает попап.
 */
var pictureEditorCancelClickHandler = function () {
  pictureUploadInput.value = '';
  pictureEditor.classList.add('hidden');
  document.removeEventListener('keydown', onPictureEditorEscPress);
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
 * Обработчик события при клике на уменьшение масштаба.
 * Уменьшает масштаб с шагом в 25%.
 * Максимум 100%.
 */
var resizeMinusClickHandler = function () {
  if (!(resizeValue.value === '25%')) {

    resizeValue.value = resizeValue.value.replace(/%/gi, '') - 25 + '%';
    picturePreview.style.transform = 'scale(' + (picturePreview.style.transform.replace(/[^.0-9]/gim, '') - 0.25) + ')';
  }
};

/**
 * Обработчик события при клике на увеличение масштаба.
 * Увеличивает масштаб с шагом в 25%.
 * Максимум 100%.
 */
var resizePlusClickHandler = function () {
  if (!(resizeValue.value === '100%')) {
    resizeValue.value = Number(resizeValue.value.replace(/%/gi, '')) + 25 + '%';
    picturePreview.style.transform = 'scale(' + (Number(picturePreview.style.transform.replace(/[^.0-9]/gim, '')) + 0.25) + ')';
  }
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
var scaleLine = document.querySelector('.scale__line');
var scaleLevel = document.querySelector('.scale__level');

effects[0].checked = 'checked';
scale.classList.add('visually-hidden');
scalePin.setAttribute('style', 'left: 100%');
scaleLevel.setAttribute('style', 'width: 100%');

/**
 * Функция расчетов уровня насыщенности эффектов.
 */
var getEffectLevel = function () {
  var scaleValue = scaleLevel.style.width.replace(/%/, '');

  if (picturePreview.className === 'effects__preview--none' || picturePreview.className === '') {
    picturePreview.style.filter = '';
  }
  if (picturePreview.className === 'effects__preview--chrome') {
    picturePreview.style.filter = 'grayscale(' + (scaleValue / 100) + ')'
  }
  if (picturePreview.className === 'effects__preview--sepia') {
    picturePreview.style.filter = 'sepia(' + (scaleValue / 100) + ')'
  }
  if (picturePreview.className === 'effects__preview--marvin') {
    picturePreview.style.filter = 'invert(' + scaleValue + '%)'
  }
  if (picturePreview.className === 'effects__preview--phobos') {
    picturePreview.style.filter = 'blur(' + (scaleValue * 3 / 100) + 'px)'
  }
  if (picturePreview.className === 'effects__preview--heat') {
    picturePreview.style.filter = 'brightness(' + (scaleValue * 2 / 100 + 1) + ')'
  }
};
/**
 * Обработчик события при клике на эффект.
 * Меняет наложенный эффект на фотографии.
 */
var effectsClickHandler = function () {
  for (i = 0; i < effects.length; i ++) {
    if (effects[i].checked) {
      picturePreview.className = '';
      picturePreview.classList.add('effects__preview--' + effects[i].value);
      scaleLevel.style.width = '100%';
    }
  }

  if (effects[0].checked) {
    scale.classList.add('visually-hidden');
  } else {
    scale.classList.remove('visually-hidden')
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

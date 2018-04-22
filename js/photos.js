'use strict';

(function () {
  var COUNT_PHOTOS = 25;
  var COUNT_COMMENTS = 2;
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
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var MIN_AVATAR_NUMBER = 1;
  var MAX_AVATAR_NUMBER = 6;
  var MIN_COMMENTS = 15;
  var MAX_COMMENTS = 100;
  var ESC_KEYCODE = 27;

  var photos = [];
  var commentsPhoto = [];

  /**
   * Генерация случайных комментариев для фотографий.
   */
  for (var i = 0; i < COUNT_PHOTOS; i++) {
    commentsPhoto[i] = [];
    var randomComment = window.utils.getRandomElementArray(COMMENTS);
    /**
     * Если при подбросе монетки будет true - у фотографии два комментария, если false - один.
     */
    if (window.utils.coinToss()) {
      /**
       * Цикл, который присваивает рандомные комментарии из базы.
       * При этом происходит проверка на повторяющийся комментарий.
       * Если такой коммент уже был, то он его отбрасывает и берет другой.
       */
      while (commentsPhoto[i].length < COUNT_COMMENTS) {
        randomComment = window.utils.getRandomElementArray(COMMENTS);

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
  for (i = 0; i < COUNT_PHOTOS; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: window.utils.getRandomInt(MIN_LIKES, MAX_LIKES),
      comments: [commentsPhoto[i]],
      description: window.utils.getRandomElementArray(DESCRIPTION)
    };
  }

  /**
   * Блок добавления маленьких фотографий на главную.
   */
  var templatePhoto = document.querySelector('#picture').content.querySelector('.picture__link');
  var picturesDiv = document.querySelector('.pictures');
  var fragmentPhoto = document.createDocumentFragment();

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

  for (i = 0; i < photos.length; i++) {
    fragmentPhoto.appendChild(renderPhoto(photos[i]));
  }

  picturesDiv.appendChild(fragmentPhoto);

  /**
   * Добавление комментариев из массива данных на сайт.
   */
  var bodyElement = document.querySelector('body');
  var bigPictureCommentsList = document.querySelector('.social__comments');
  var templateComment = document.querySelector('.social__comment');
  var picturesLink = document.querySelectorAll('.picture__link');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = document.querySelector('.big-picture__img img');
  var bigPictureLike = document.querySelector('.likes-count');
  var fragmentPictureComment = document.createDocumentFragment();

  /**
   * Функция генерации ноды комментария.
   * @param {Array} commentaryes - двумерный массив с комментариями.
   * @return {Array} - возвращаем DOM ноду комментария.
   */
  var renderComment = function (commentaryes) {
    var commentary = templateComment.cloneNode(true);
    var bigPictureAvatar = commentary.querySelector('.social__picture');

    bigPictureAvatar.src = 'img/avatar-' + window.utils.getRandomInt(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg';
    commentary.lastChild.textContent = commentaryes;

    return commentary;
  };

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
   * Блок с показом большой фотографии.
   */
  var bigPictureCommentsCount = document.querySelector('.comments-count');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var socialCommentsCount = document.querySelector('.social__comment-count');
  var socialCommentsLoadmore = document.querySelector('.social__comment-loadmore');

  bigPictureCommentsCount.textContent = window.utils.getRandomInt(MIN_COMMENTS, MAX_COMMENTS);
  socialCommentsCount.classList.add('visually-hidden');
  socialCommentsLoadmore.classList.add('visually-hidden');

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
})();

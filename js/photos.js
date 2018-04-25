'use strict';

(function () {
  var MIN_AVATAR_NUMBER = 1;
  var MAX_AVATAR_NUMBER = 6;
  var ESC_KEYCODE = 27;
  var URL = 'https://js.dump.academy/kekstagram/data';

  var templatePhoto = document.querySelector('#picture').content.querySelector('.picture__link');
  var templateComment = document.querySelector('.social__comment');
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
   * Функция генерации фотографии с данными при успешной загрузке данных с сервера.
   * @param {Object} data - данные о фотографиях.
   */
  var successLoad = function (data) {
    var photos = data;

    /**
     * Блок добавления маленьких фотографий на главную.
     */
    for (var i = 0; i < photos.length; i++) {
      fragmentPhoto.appendChild(renderPhoto(photos[i]));
    }

    picturesDiv.appendChild(fragmentPhoto);

    /**
     * Добавление комментариев из массива данных на сайт.
     */
    var bodyElement = document.querySelector('body');
    var bigPictureCommentsList = document.querySelector('.social__comments');
    var picturesLink = document.querySelectorAll('.picture__link');
    var bigPicture = document.querySelector('.big-picture');
    var bigPictureImg = document.querySelector('.big-picture__img img');
    var bigPictureLike = document.querySelector('.likes-count');
    var bigPictureSocial = document.querySelector('.social__caption');
    var bigPictureCommentsCount = document.querySelector('.comments-count');
    var bigPictureCancel = document.querySelector('.big-picture__cancel');
    var socialCommentsCount = document.querySelector('.social__comment-count');
    var socialCommentsLoadmore = document.querySelector('.social__comment-loadmore');
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
        bigPictureCommentsCount.textContent = photos[targetNumber + 1].comments.length - 1; // 1 комментарий отводится под описание фотографии
        bigPictureLike.textContent = photos[targetNumber + 1].likes;
        bigPictureSocial.textContent = photos[targetNumber + 1].comments[0];

        socialCommentsCount.classList.add('visually-hidden');
        socialCommentsLoadmore.classList.add('visually-hidden');

        /**
         * Генерирование комментариев для выбранной фотографии.
         * Счетчик ничинается с единицы, потому что первый комментарий в массив отдходит под описание фотографии.
         */
        for (i = 1; i < photos[targetNumber + 1].comments.length; i++) {
          fragmentPictureComment.appendChild(renderComment(photos[targetNumber + 1].comments[i]));
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
  };

  window.backend.loadData(URL, successLoad, window.backend.errorLoad, 'GET');
})();

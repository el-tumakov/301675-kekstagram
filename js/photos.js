'use strict';

(function () {
  var AvatarNumber = {
    MIN: 1,
    MAX: 6
  };
  var ESC_KEYCODE = 27;
  var URL = 'https://js.dump.academy/kekstagram/data';

  var templatePhoto = document.querySelector('#picture').content.querySelector('.picture__link');
  var templateComment = document.querySelector('#comment').content.querySelector('.social__comment');
  var picturesDiv = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');
  var fragmentPhoto = document.createDocumentFragment();

  /**
   * Функция отрисовки данных о фотографиях.
   * @param {Array} pictures - массив объектов с данными о фотографиях.
   */
  var renderPhoto = function (pictures) {
    var pictureImgs = document.querySelectorAll('.picture__img');
    var pictureLikes = document.querySelectorAll('.picture__stat--likes');
    var pictureComments = document.querySelectorAll('.picture__stat--comments');

    for (var i = 0; i < pictures.length; i++) {
      pictureImgs[i].src = pictures[i].url;
      pictureLikes[i].textContent = pictures[i].likes;
      pictureComments[i].textContent = pictures[i].comments.length;
    }
  };

  /**
   * Функция генерации ноды комментария.
   * @param {string} commentaryes - комментарий.
   * @return {string} - возвращаем DOM ноду комментария.
   */
  var renderComment = function (commentaryes) {
    var commentary = templateComment.cloneNode(true);
    var bigPictureAvatar = commentary.querySelector('.social__picture');

    bigPictureAvatar.src = 'img/avatar-' + window.utils.getRandomInt(AvatarNumber.MIN, AvatarNumber.MAX) + '.svg';
    commentary.lastChild.textContent = commentaryes;

    return commentary;
  };

  /**
   * Функция генерации фотографии с данными при успешной загрузке данных с сервера.
   * @param {Object} data - данные о фотографиях.
   */
  var successLoad = function (data) {
    var photos = data;
    imgFilters.classList.remove('img-filters--inactive');

    /**
     * Блок добавления маленьких фотографий на главную.
     */
    for (var i = 0; i < photos.length; i++) {
      fragmentPhoto.appendChild(templatePhoto.cloneNode(true));
    }

    picturesDiv.appendChild(fragmentPhoto);

    renderPhoto(photos);

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
        bigPictureCommentsCount.textContent = photos[targetNumber].comments.length - 1; // 1 комментарий отводится под описание фотографии
        bigPictureLike.textContent = photos[targetNumber].likes;

        socialCommentsCount.classList.add('visually-hidden');
        socialCommentsLoadmore.classList.add('visually-hidden');

        /**
         * Генерирование комментариев для выбранной фотографии.
         * Счетчик ничинается с единицы, потому что первый комментарий в массив отдходит под описание фотографии.
         */
        for (i = 1; i < photos[targetNumber].comments.length; i++) {
          fragmentPictureComment.appendChild(renderComment(photos[targetNumber].comments[i]));
        }

        /**
         * Удаление старых и добавление сгенерированных комментариев в DOM.
         */
        while (bigPictureCommentsList.firstChild) {
          bigPictureCommentsList.removeChild(bigPictureCommentsList.firstChild);
        }

        bigPictureCommentsList.appendChild(fragmentPictureComment);
        bigPictureSocial.textContent = photos[targetNumber].comments[0];

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
     * Фильтрация вывода фотографий на экран.
     */
    var filterButtons = document.querySelectorAll('.img-filters__button');
    var filterRecommend = document.querySelector('#filter-recommend');
    var filterPopular = document.querySelector('#filter-popular');
    var filterDiscussed = document.querySelector('#filter-discussed');
    var filterRandom = document.querySelector('#filter-random');
    var photosOriginal = photos.slice();

    /**
     * Обработчик клика на кнопку фильтра фотографий.
     * Меняет активный фильтр.
     */
    var filterButtonClickHandler = function () {
      var target = event.target;
      var filterButtonActive = document.querySelector('.img-filters__button--active');

      if (target !== filterButtonActive) {
        filterButtonActive.classList.remove('img-filters__button--active');
        target.classList.add('img-filters__button--active');
      }
    };

    /**
     * Выводит фотографии на экран в изначальном порядке.
     */
    var sortRecommend = function () {
      renderPhoto(photosOriginal);
    };

    /**
     * Выводит фотографии на экран в порядке убывания количества лайков.
     */
    var sortPopular = function () {
      photos.sort(function (left, right) {
        if (left.likes < right.likes) {
          return 1;
        } else if (left.likes > right.likes) {
          return -1;
        } else {
          return 0;
        }
      });

      renderPhoto(photos);
    };

    /**
     * Выводит фотографии на экран в случайном порядке.
     */
    var sortRandom = function () {
      photos.sort(function () {
        return Math.random() - 0.5; // сдвигаем Math.random, чтобы диапазон значений был от -0.5 до 0.5.
      });

      renderPhoto(photos);
    };

    /**
     * Выводит фотографии на экран в порядке убывания количества комментариев.
     */
    var sortDiscussed = function () {
      photos.sort(function (left, right) {
        if (left.comments.length < right.comments.length) {
          return 1;
        } else if (left.comments.length > right.comments.length) {
          return -1;
        } else {
          return 0;
        }
      });

      renderPhoto(photos);
    };

    var filterRecommendClickHandler = function () {
      window.utils.debounce(sortRecommend);
    };

    var filterPopularClickHandler = function () {
      window.utils.debounce(sortPopular);
    };

    var filterDiscussedClickHandler = function () {
      window.utils.debounce(sortDiscussed);
    };

    var filterRandomClickHandler = function () {
      window.utils.debounce(sortRandom);
    };

    for (i = 0; i < filterButtons.length; i++) {
      filterButtons[i].addEventListener('click', filterButtonClickHandler);
    }

    filterRecommend.addEventListener('click', filterRecommendClickHandler);
    filterPopular.addEventListener('click', filterPopularClickHandler);
    filterDiscussed.addEventListener('click', filterDiscussedClickHandler);
    filterRandom.addEventListener('click', filterRandomClickHandler);
  };

  window.backend.loadData(URL, successLoad, window.backend.errorLoad, 'GET');
})();

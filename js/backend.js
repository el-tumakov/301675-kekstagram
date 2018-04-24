'use strict';

(function () {
  window.backend = {
    /**
     * Функция загрузки данных с сервера
     * @param {string} url - URL сервера.
     * @param {callback} onLoad - колбек при успешной загрузке.
     * @param {callback} onError - колбек при ошибке загрузки.
     * @param {string} method - метод зугрзки: GET, POST и т.д.
     * @param {Object} data - объект с данными. Используется для отправки на сервер.
     */
    loadData: function (url, onLoad, onError, method, data) {
      var xhr = new XMLHttpRequest();

      /**
       * Обработчки загрузки.
       */
      var xhrLoadHandler = function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      };

      /**
       * Обработчки ошибки соединения.
       */
      var xhrErrorHandler = function () {
        onError('Произошла ошибка соединения');
      };

      /**
       * Обработчик превышения таймаута.
       */
      var xhrTimeoutHandler = function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      };

      xhr.responseType = 'json';

      xhr.addEventListener('load', xhrLoadHandler);
      xhr.addEventListener('error', xhrErrorHandler);
      xhr.addEventListener('timeout', xhrTimeoutHandler);

      xhr.timeout = 10000;

      xhr.open(method, url);
      xhr.send(data);
    },

    /**
     * Колбек ошибки при загрузке данных.
     * Вывод на экран сообщения при ошибке загрузки данных с сервера.
     * @param {string} errorMassage - текст ошибки.
     */
    errorLoad: function (errorMassage) {
      var node = document.createElement('div');

      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMassage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();

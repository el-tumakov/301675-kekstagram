'use strict';

(function () {
  window.utils = {
    /**
     * Функция нахождения рандомного элемента в массиве.
     * @param {Array} arr - вводим массив.
     * @return {string} - возвращаем элемент массива.
     */
    getRandomElementArray: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    /**
     * Функция нахождения рандомного числа в заданном отрезке.
     * @param {number} min - минимальный диапазон рандома.
     * @param {number} max - максимальный диапазон рандома.
     * @return {number} - рандомное число.
     */
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Функция подбрасывания монетки.
     * Возвращает true или false.
     * @return {boolean}
     */
    coinToss: function () {
      return Math.floor(Math.random() * 2);
    }
  };
})();

'use strict';

(function () {
  var FILE_TYPES = ['image/gif', 'image/jpg', 'image/jpeg', 'image/png'];

  var uploadInput = document.querySelector('.img-upload__input');
  var picturePreview = document.querySelector('.img-upload__preview img');
  var pictureEditor = document.querySelector('.img-upload__overlay');

  uploadInput.addEventListener('change', function () {
    var file = uploadInput.files[0];

    var matches = FILE_TYPES.some(function (it) {
      return file.type === it;
    });

    if (matches) {
      window.backend.errorClear();

      var reader = new FileReader();

      reader.addEventListener('load', function () {
        picturePreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    } else {
      window.backend.errorLoad('Выбранный файл не является картинкой!');
      pictureEditor.classList.add('hidden');
    }
  });
})();

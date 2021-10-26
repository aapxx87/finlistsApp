// Открытие модалки добалвения ФинЛиста
btnModalFinList.addEventListener('click', function () {
  modalFinList.style.display = 'block'
  overlay.style.display = 'block'
})


// Скрытие модалок при клике по overlay
overlay.addEventListener('click', function () {
  modalFinList.style.display = 'none'
  modalMovements.style.display = 'none'
  overlay.style.display = 'none'
})
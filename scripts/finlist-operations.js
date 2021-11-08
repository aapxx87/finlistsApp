// Открытие модалки добалвения ФинЛиста
btnModalFinList.addEventListener('click', function () {
  modalFinList.style.display = 'block'
  overlay.style.display = 'block'
})


// Скрытие модалок при клике по overlay
overlay.addEventListener('click', function () {
  modalFinList.style.display = 'none'
  cntOperationsFL.style.display = 'none'
  overlay.style.display = 'none'
  boxAddMov.style.display = 'none'
  boxShareFL.style.display = 'none'
  boxOperations.style.display = 'block'
})


// функция добавления нового финлиста
btnAddNewFinList.addEventListener('click', function () {

  if (!appData.validationUniqueNewFinListName(inputFinListName.value)) {
    console.log("имя свободно");
    appData.addNewFinlist(inputFinListName.value, inputFinListCur.value)
  } else {
    console.log("имя занято");
  }

  containerFinLists.innerHTML = ''

  appData.displayFinlists()


  inputFinListName.value = ''
  inputFinListCur.value = ''

  modalFinList.style.display = 'none'
  overlay.style.display = 'none'

})


// функция удаления финлиста в контейнера с операциями
btnRemoveFinList.addEventListener('click', function () {
  appData.removeFinList()

  containerFinLists.innerHTML = ''

  appData.displayFinlists()

  cntOperationsFL.style.display = 'none'
  overlay.style.display = 'none'

})



// переход к добавлению mov из action для финлистов
linkAddMov.addEventListener('click', function () {

  boxOperations.style.display = 'none'
  boxAddMov.style.display = 'block'

})



// Кнопка финального добавления нового mov значения из инпута
btnAddNewMov.addEventListener('click', function () {

  appData.addNewMovements(appData.indexFinList, +inputMovFLamount.value, +inputMovFLexrate.value)

  containerFinLists.innerHTML = ''

  appData.displayFinlists()

  overlay.style.display = 'none'
  boxAddMov.style.display = 'none'
  boxOperations.style.display = 'block'
  cntOperationsFL.style.display = 'none'

  app.clearInputValue()

})


// переход к share финлиста из action для финлистов
linkShareFL.addEventListener('click', function () {

  boxOperations.style.display = 'none'
  boxShareFL.style.display = 'block'

})
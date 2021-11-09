// Открытие модалки добавления ФинЛиста
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




// ! Операции с финлистами (общий контейнер с выбором действий)

// - переход к добавлению mov из action для финлистов
linkAddMov.addEventListener('click', function () {

  boxOperations.style.display = 'none'
  boxAddMov.style.display = 'block'

})

// - переход к share финлиста из action для финлистов
linkShareFL.addEventListener('click', function () {

  boxOperations.style.display = 'none'
  boxShareFL.style.display = 'block'

})

// - удаление финлиста в контейнере с операциями
btnRemoveFinList.addEventListener('click', function () {
  appData.removeFinList()

  containerFinLists.innerHTML = ''

  appData.displayFinlists()

  cntOperationsFL.style.display = 'none'
  overlay.style.display = 'none'

})

// -- Возврат в меню выбора операций из Movements
backFromMov.addEventListener('click', function () {

  boxAddMov.style.display = 'none'
  cntOperationsFL.style.display = 'block'
  boxOperations.style.display = 'block'

})

// -- Возврат в меню выбора операций из Sharing setting
backFromShare.addEventListener('click', function () {

  boxShareFL.style.display = 'none'
  cntOperationsFL.style.display = 'block'
  boxOperations.style.display = 'block'

})


// --- БОКС добавления movemenets

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


// --- БОКС sharing setting

// Инвайт в финлист нового мембера
btnInviteMember.addEventListener('click', function () {

  appData.addParticipance(inputInviteMember.value)

  overlay.style.display = 'none'
  boxSharingSetting.style.display = 'none'
  boxOperations.style.display = 'block'
  cntOperationsFL.style.display = 'none'

})


// Удаления мембера из доступа к финлисту
btnDeleteMember.addEventListener('click', function () {

  appData.removeParticipance(inputInviteMember.value)

  overlay.style.display = 'none'
  boxSharingSetting.style.display = 'none'
  boxOperations.style.display = 'block'
  cntOperationsFL.style.display = 'none'



})



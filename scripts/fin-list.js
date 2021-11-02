
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


// функция удаления финлиста
btnRemoveFinList.addEventListener('click', function () {
  appData.removeFinList(inputFinListNameRemove.value)

  containerFinLists.innerHTML = ''

  appData.displayFinlists()

})
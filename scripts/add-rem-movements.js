


btnAddNewMov.addEventListener('click', function () {


  console.log(appData.indexFinList);


  appData.addNewMovements(appData.indexFinList, +inputMovFLamount.value, +inputMovFLexrate.value)

  containerFinLists.innerHTML = ''

  appData.displayFinlists()


})
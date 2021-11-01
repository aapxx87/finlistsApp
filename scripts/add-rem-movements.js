


btnAddNewMov.addEventListener('click', function () {


  console.log(appData.indexFinList);


  appData.addNewMovements(appData.indexFinList, +inputMovFLamount.value, +inputMovFLexrate.value)

  containerFinLists.innerHTML = ''

  appData.displayFinlists()


  console.log('Add new mov');

  console.log(appData.getAllFinlists());

  console.log(appData);






})
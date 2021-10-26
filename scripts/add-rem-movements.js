// ** функция определения номера финлиста в массиве по кнопке Плюс и открытия модалки Mov Add
// в функции displayFinlists при выводже в интерфейс списка финлистов мы зашиваем нормер элемента (финлиста) в массиве в класс кнопки +, которая вставляется в html элемент данного финлиста, тут мы его забираем и таким образом понимаем в какой именно финлист добавлять movements

let indexFinList = 0

const finListNumberInArr = function () {


  const plusBtn = document.querySelectorAll('.finList-addNewMov')

  plusBtn.forEach(function (el) {
    el.addEventListener('click', function () {

      indexFinList = el.classList[1];

      modalMovements.style.display = 'block'
      overlay.style.display = 'block'

      inputMovFLamount.focus()

    })
  })

}


finListNumberInArr()


btnAddNewMov.addEventListener('click', function () {



  appData.addNewMovements(indexFinList, +inputMovFLamount.value, +inputMovFLexrate.value)

  containerFinLists.innerHTML = ''

  displayFinlists()

  finListDetalisationVisible()

  finListNumberInArr()

})
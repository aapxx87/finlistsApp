// ** функция раскрытия детализации финлиста
const finListDetalisationVisible = function () {

  let index = 0

  let compFinListArr = document.querySelectorAll('.toggle-click-open')
  let finListTable = document.querySelectorAll('.finlist-table')

  compFinListArr.forEach(function (el, idx) {
    el.addEventListener('click', function () {
      index = idx
      finListTable[index].classList.toggle('visible')
    })
  })

}




// функция вывода в интерфейс финлистов из базы
const displayFinlists = function () {

  const allFinLists = appData.getAllFinlists()

  allFinLists.forEach(function (item, idx) {

    if (item.finlistCurrency === 'rub') {

      // формируем HTML с движениями из каждого финлиста (тут еще не вставлен тег table, так как гоним циклом и table будет много раз)
      let htmlMov = ''
      let movTotal = 0


      // сортируем по дате исключительно массив movements
      const itemSort = item.finlistMovements.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date)
      })

      // копируем основной массив
      const itemNew = new Array(item)
      // заменяем в новjм массиве movements на отсортированные movements
      itemNew.finlistMovements = itemSort

      itemNew.finlistMovements.forEach(function (itemMov) {

        htmlMov = htmlMov + `
        <tr>
          <td class="col">${itemMov.movDate}</td>
          <td class="col">${itemMov.movAmount}</td>
        </tr>
      `
        // суммируем все движения в единое число - Total
        movTotal = movTotal + itemMov.movAmount
      })

      // формируем заголовок с Title каждого финлиста
      let htmlMovTitle = `
      <div class="finlist-header">
          <div class="toggle-click-open">
          <h3 class="finList-title">${item.finlistName} <span>(${item.finlistCurrency})</span></h3>
          <h3 class="finList-total">Total: ${movTotal} </h3>
          </div>
          <p class="finList-addNewMov ${idx}">+</p>
      </div>
    `

      // формируем таблицу со всеми движениями
      const htmlMovTable = `
      <table class="finlist-table">
       <tr>
        <td class="col table-header">Date</td>
        <td class="col table-header">Amount</td>
       </tr>
        ${htmlMov}
      </table>
    `

      // формируем финальную таблицу Заголовок + Таблица Движений по Финлисту (cсклеиваем Title + Movements)
      const htmlTitleMov = htmlMovTitle + htmlMovTable

      // формируем финальный html компоненты comp-finList-box
      const html = `
      <div class="comp-finList-box">
      ${htmlTitleMov}
      </div>
    `

      // вставляем компоненту в контейнер container-general - то есть финально выгружаем в интерфейс
      containerFinLists.insertAdjacentHTML('beforeend', html)



    } else {


      // формируем HTML с движениями из каждого финлиста (тут еще не вставлен тег table, так как гоним циклом и table будет много раз)
      let htmlMov = ''
      let movTotal = 0


      // сортируем по дате исключительно массив movements
      const itemSort = item.finlistMovements.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date)
      })

      // копируем основной массив
      const itemNew = new Array(item)
      // заменяем в новjм массиве movements на отсортированные movements
      itemNew.finlistMovements = itemSort

      itemNew.finlistMovements.forEach(function (itemMov) {

        htmlMov = htmlMov + `
         <tr>
           <td class="col">${itemMov.movDate}</td>
           <td class="col">${itemMov.movAmount}</td>
           <td class="col">${itemMov.exRate}</td>
         </tr>
       `
        // суммируем все движения в единое число - Total
        movTotal = movTotal + itemMov.movAmount
      })

      // формируем заголовок с Title каждого финлиста
      let htmlMovTitle = `
       <div class="finlist-header">
           <div class="toggle-click-open">
           <h3 class="finList-title">${item.finlistName} <span>(${item.finlistCurrency})</span></h3>
           <h3 class="finList-total">Total: ${movTotal} </h3>
           </div>
           <p class="finList-addNewMov ${idx}">+</p>
       </div>
     `

      // формируем таблицу со всеми движениями
      const htmlMovTable = `
       <table class="finlist-table">
        <tr>
         <td class="col table-header">Date</td>
         <td class="col table-header">Amount</td>
         <td class="col table-header">Ex rate</td>
        </tr>
         ${htmlMov}
       </table>
     `

      // формируем финальную таблицу Заголовок + Таблица Движений по Финлисту (cсклеиваем Title + Movements)
      const htmlTitleMov = htmlMovTitle + htmlMovTable

      // формируем финальный html компоненты comp-finList-box
      const html = `
       <div class="comp-finList-box">
       ${htmlTitleMov}
       </div>
     `

      // вставляем компоненту в контейнер container-general - то есть финально выгружаем в интерфейс
      containerFinLists.insertAdjacentHTML('beforeend', html)


    }

  })

}

// сначала вызываем функцию отобпажения финлистов
displayFinlists()

// только после вызова функции displayFinlists() вызываем функцию раскрытия детализации финлиста, иначе онане видит выгруженные финлисты
finListDetalisationVisible()


// функция добавления нового финлиста
btnAddNewFinList.addEventListener('click', function () {

  if (!appData.validationUniqueNewFinListName(inputFinListName.value)) {
    console.log("имя свободно");
    appData.addNewFinlist(inputFinListName.value, inputFinListCur.value)
  } else {
    console.log("имя занято");
  }

  console.log(appData.getAllFinlists());


  containerFinLists.innerHTML = ''

  displayFinlists()

  finListDetalisationVisible()

  finListNumberInArr()

})


// функция удаления финлиста
btnRemoveFinList.addEventListener('click', function () {
  appData.removeFinList(inputFinListNameRemove.value)

  containerFinLists.innerHTML = ''

  displayFinlists()

  finListDetalisationVisible()

})


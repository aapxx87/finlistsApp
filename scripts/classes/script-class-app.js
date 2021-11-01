'use strict'

// Класс приложения
class App {

  // indexFinList = 0


  constructor() {

    // this.displayFinlists()

    // this.finListDetalisationVisible()

    btnSignUp.addEventListener('click', this._regNewUser.bind(this))

    btnLogin.addEventListener('click', this._loginUser.bind(this))


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

  }

  // метод регистрации нового юзера
  _regNewUser() {

    // создаем инстанс юзера
    const newUser = new Users(inputUsername.value, +inputPassword.value)

    // Валидация при регистрации по методу validationNewSignUp
    if (appData.validationNewSignUp(inputUsername.value, inputPassword.value, inputRepeatPassword.value) === 1) {
      // первое условие когда все ок

      // вызываем метод addNewUser и добавляем пользователя в массив зарегенных юзеров
      appData.addNewUser(newUser)

      this.displayWarningNotification('Аккаунт создан', '#6d9656', boxWarning)

      setTimeout(function () {
        boxWarning.style.display = 'none'
        loginContainer.style.display = 'block'
        signUpContainer.style.display = 'none'
      }, 1000)

      this.clearInputValue()

    } else if (appData.validationNewSignUp(inputUsername.value, inputPassword.value, inputRepeatPassword.value) === 0) {

      this.displayWarningNotification('Имя занято', '#EF3957', boxWarning)

      setTimeout(function () {
        boxWarning.style.display = 'none'
      }, 3000)

      this.labelDown()

      this.clearInputValue()

    } else if (appData.validationNewSignUp(inputUsername.value, inputPassword.value, inputRepeatPassword.value) === 2) {

      this.displayWarningNotification('Пароли не совпадают', '#EF3957', boxWarning)

      setTimeout(function () {
        boxWarning.style.display = 'none'
      }, 3000)

      this.clearInputValue()

      this.labelDown()

    } else if (appData.validationNewSignUp(inputUsername.value, inputPassword.value, inputRepeatPassword.value) === 3) {

      this.displayWarningNotification('Введите имя', '#EF3957', boxWarning)

      setTimeout(function () {
        boxWarning.style.display = 'none'
      }, 3000)

      this.clearInputValue()

      this.labelDown()

    } else if (appData.validationNewSignUp(inputUsername.value, inputPassword.value, inputRepeatPassword.value) === 4) {

      this.displayWarningNotification('Введите пароль', '#EF3957', boxWarning)

      setTimeout(function () {
        boxWarning.style.display = 'none'
      }, 3000)

      this.clearInputValue()

      this.labelDown()

    }

    console.log(appData.getAllUsers());

  }


  // метод логина нового пользователя
  _loginUser() {

    if (appData._login(inputUsernameLogin.value, +inputPasswordLogin.value) === 1) {

      loginSignUpContainer.style.display = 'none'
      mainPageContainer.style.display = 'block'

      this.clearInputValue()

    } else if (appData._login(inputUsernameLogin.value, +inputPasswordLogin.value) === 0) {

      setTimeout(function () {
        boxWarningLogin.style.display = 'none'
      }, 3000)

      this.displayWarningNotification('Неправильный логин или пароль', '#EF3957', boxWarningLogin)

      this.labelDown()

      this.clearInputValue()

    }

  }



  // метод чистки инпутов
  clearInputValue() {
    inputUsername.value = ''
    inputPassword.value = ''
    inputRepeatPassword.value = ''

    inputUsernameLogin.value = ''
    inputPasswordLogin.value = ''
  }


  // метод возврата лейблов после ошибки валидации обратно в инпцты (опускаются обратно вниз)
  labelDown() {
    labels.forEach(function (el) {
      el.classList.remove('labelActive')
    })
  }


  // метод вызова окна нотификации об ошибках при регистрации
  displayWarningNotification(notificationText, color, selector) {
    selector.innerHTML = `<p>${notificationText}</p>`
    selector.style.background = color
    selector.style.display = 'flex'
  }


  // // метод вывода в интерфейс финлистов из базы
  // displayFinlists() {

  //   const allFinLists = appData.getAllFinlists()

  //   const currentUserFinlists = allFinLists.find(function (item) {

  //     return item.owner === appData.currentUser

  //   })

  //   // console.log(currentUserFinlists);

  //   allFinLists.forEach(function (item, idx) {

  //     if (item.finlistCurrency === 'rub') {

  //       // формируем HTML с движениями из каждого финлиста (тут еще не вставлен тег table, так как гоним циклом и table будет много раз)
  //       let htmlMov = ''
  //       let movTotal = 0


  //       // сортируем по дате исключительно массив movements
  //       const itemSort = item.finlistMovements.sort(function (a, b) {
  //         return new Date(b.date) - new Date(a.date)
  //       })

  //       // копируем основной массив
  //       const itemNew = new Array(item)
  //       // заменяем в новjм массиве movements на отсортированные movements
  //       itemNew.finlistMovements = itemSort

  //       itemNew.finlistMovements.forEach(function (itemMov) {

  //         htmlMov = htmlMov + `
  //         <tr>
  //           <td class="col">${itemMov.movDate}</td>
  //           <td class="col">${itemMov.movAmount}</td>
  //         </tr>
  //       `
  //         // суммируем все движения в единое число - Total
  //         movTotal = movTotal + itemMov.movAmount
  //       })

  //       // формируем заголовок с Title каждого финлиста
  //       let htmlMovTitle = `
  //       <div class="finlist-header">
  //           <div class="toggle-click-open">
  //           <h3 class="finList-title">${item.finlistName} <span>(${item.finlistCurrency})</span></h3>
  //           <h3 class="finList-total">Total: ${movTotal} </h3>
  //           </div>
  //           <p class="finList-addNewMov ${idx}">+</p>
  //       </div>
  //     `

  //       // формируем таблицу со всеми движениями
  //       const htmlMovTable = `
  //       <table class="finlist-table">
  //        <tr>
  //         <td class="col table-header">Date</td>
  //         <td class="col table-header">Amount</td>
  //        </tr>
  //         ${htmlMov}
  //       </table>
  //     `

  //       // формируем финальную таблицу Заголовок + Таблица Движений по Финлисту (cсклеиваем Title + Movements)
  //       const htmlTitleMov = htmlMovTitle + htmlMovTable

  //       // формируем финальный html компоненты comp-finList-box
  //       const html = `
  //       <div class="comp-finList-box">
  //       ${htmlTitleMov}
  //       </div>
  //     `

  //       // вставляем компоненту в контейнер container-general - то есть финально выгружаем в интерфейс
  //       containerFinLists.insertAdjacentHTML('beforeend', html)



  //     } else {


  //       // формируем HTML с движениями из каждого финлиста (тут еще не вставлен тег table, так как гоним циклом и table будет много раз)
  //       let htmlMov = ''
  //       let movTotal = 0


  //       // сортируем по дате исключительно массив movements
  //       const itemSort = item.finlistMovements.sort(function (a, b) {
  //         return new Date(b.date) - new Date(a.date)
  //       })

  //       // копируем основной массив
  //       const itemNew = new Array(item)
  //       // заменяем в новjм массиве movements на отсортированные movements
  //       itemNew.finlistMovements = itemSort

  //       itemNew.finlistMovements.forEach(function (itemMov) {

  //         htmlMov = htmlMov + `
  //          <tr>
  //            <td class="col">${itemMov.movDate}</td>
  //            <td class="col">${itemMov.movAmount}</td>
  //            <td class="col">${itemMov.exRate}</td>
  //          </tr>
  //        `
  //         // суммируем все движения в единое число - Total
  //         movTotal = movTotal + itemMov.movAmount
  //       })

  //       // формируем заголовок с Title каждого финлиста
  //       let htmlMovTitle = `
  //        <div class="finlist-header">
  //            <div class="toggle-click-open">
  //            <h3 class="finList-title">${item.finlistName} <span>(${item.finlistCurrency})</span></h3>
  //            <h3 class="finList-total">Total: ${movTotal} </h3>
  //            </div>
  //            <p class="finList-addNewMov ${idx}">+</p>
  //        </div>
  //      `

  //       // формируем таблицу со всеми движениями
  //       const htmlMovTable = `
  //        <table class="finlist-table">
  //         <tr>
  //          <td class="col table-header">Date</td>
  //          <td class="col table-header">Amount</td>
  //          <td class="col table-header">Ex rate</td>
  //         </tr>
  //          ${htmlMov}
  //        </table>
  //      `

  //       // формируем финальную таблицу Заголовок + Таблица Движений по Финлисту (cсклеиваем Title + Movements)
  //       const htmlTitleMov = htmlMovTitle + htmlMovTable

  //       // формируем финальный html компоненты comp-finList-box
  //       const html = `
  //        <div class="comp-finList-box">
  //        ${htmlTitleMov}
  //        </div>
  //      `

  //       // вставляем компоненту в контейнер container-general - то есть финально выгружаем в интерфейс
  //       containerFinLists.insertAdjacentHTML('beforeend', html)


  //     }

  //   })


  // }


  // // метод раскрытия детализации финлиста
  // finListDetalisationVisible() {

  //   let index = 0

  //   let compFinListArr = document.querySelectorAll('.toggle-click-open')
  //   let finListTable = document.querySelectorAll('.finlist-table')

  //   compFinListArr.forEach(function (el, idx) {
  //     el.addEventListener('click', function () {
  //       index = idx
  //       finListTable[index].classList.toggle('visible')
  //     })
  //   })

  // }



}




// создаем инстанс Аппа
const app = new App()
'use strict'


// Класс для хранения инфы о зарегенных юзерах
class MainData {

  // массив со всеми юзерами (объекты)
  #users = [];
  // массив со всеми финлистами и движениями
  #finlists = [];


  constructor() {
    this.currentUser
    this.indexFinList
    this.finListNumberInArr()
    this.logout()
  }

  addWelcomeTitleName() {
    welcomeTitle.textContent = `Welcome, ${this.currentUser}!`
  }


  logout() {

    logout.addEventListener('click', function () {

      loginSignUpContainer.style.display = 'block'
      mainPageContainer.style.display = 'none'

      this.currentUser = ''

      containerFinLists.innerHTML = ''

    })

  }


  // метод валидации данных при регистрации нового юзера
  validationNewSignUp(inputName, inputPass, inputRepeatPass) {

    // проверка на занятость имени
    const check = this.#users.find(function (item) {
      return item.userName === inputName
    })

    if (check) {
      // проверка на занятость имени, если занято возвращаем 0 
      return 0
    } else if (!check && inputName.length && inputPass.length && inputPass === inputRepeatPass) {
      // если имя не занято, логин и пароль больше 0 по длинне и пароль равен повтору пароля возвращаем 1, то есть все ок, можно регистрировать
      return 1
    } else if (!check && inputName.length && inputPass.length && inputPass !== inputRepeatPass) {
      // если повторение пароля не совпадает
      return 2
    } else if (!check && inputName.length === 0) {
      // если длинна имени ранво 0
      return 3
    } else if (!check && inputPass.length === 0) {
      // если длинна пароля равна 0
      return 4
    }

  }

  // метод добавления нового юзера в массив юзеров (регистрация)
  addNewUser(obj) {
    this.#users.push(obj)
    // console.log('Юзер успешно добавлен');
  }


  // метод логина (проверка имени и пасса при входе)
  _login(name, password) {

    // проверка на занятость имени (если он есть то вернет его, а если нет то undefined)
    const check = this.#users.find(function (item) {
      return item.userName === name
    })


    if (check) {
      this.currentUser = check.userName
    }


    // условие: если юзер существует и его пароль равен паролю передаваемому в качестве аргумента, то вход, иначе нотификашка об ошибке
    if (check && check.userPassword === +password) {
      console.log('Успешный логин');
      this.displayFinlists()
      this.addWelcomeTitleName()
      return 1
    }
    else if (!check || check.userPassword !== +password) {
      console.log('Неправильный логин или пароль');
      return 0
    }


  }

  // валидация имени нового финлиста на уникальность
  validationUniqueNewFinListName(name) {

    const checkName = this.#finlists.find(function (el) {
      return el.finlistName === name
    })

    return checkName

  }


  // метод добавления нового финлиста
  addNewFinlist(name, currency, owner) {

    // пока нет БД для ручной предустановки owner
    let newFinlistObj

    if (owner) {

      newFinlistObj = {
        finlistName: name,
        finlistCurrency: currency,
        owner: owner,
        participance: [],
        finlistMovements: []
      }

    } else {

      newFinlistObj = {
        finlistName: name,
        finlistCurrency: currency,
        owner: this.currentUser,
        participance: [],
        finlistMovements: []
      }

    }

    this.#finlists.push(newFinlistObj)

  }

  // метод удаления финлиста
  removeFinList() {

    this.#finlists.splice(this.indexFinList, 1)

  }


  // метод проверки финлиста на тип валюты, чтобы знать выдавать или нет окно с exrate
  finListCurrencyCheck(index) {

    if (this.#finlists[index].finlistCurrency === 'rub') {
      return 1
    } else {
      return 0
    }

  }


  // метод добавления нового movements в финлист
  addNewMovements(finListIndex, movAmount, exRateInp, date) {

    // Пока нет БД, даты добалвления Mov ставим ручками
    // если аргумент указан, то он тащится из него, если нет, то дата ставится текущая
    let dateCur

    if (date) {
      dateCur = date
    } else {
      // формирование даты
      const now = new Date()
      const day = `${now.getDate()}`.padStart(2, 0)
      const month = `${now.getMonth() + 1}`.padStart(2, '0') // так как месяц стартует с нуля, то прибалвяем единицы
      const year = now.getFullYear()
      dateCur = `${day}.${month}.${year}`
    }




    // если мы добавляем, то есть плюсовое значение количества
    if (movAmount > 0) {

      // если курс конвертации не указан
      if (!exRateInp) {

        this.#finlists[finListIndex].finlistMovements.push({
          movAmount: movAmount,
          movDate: dateCur,
        })

        // если курс конвертации указан
      } else {

        this.#finlists[finListIndex].finlistMovements.push({
          movAmount: movAmount,
          movDate: dateCur,
          exRate: exRateInp
        })

      }

      // если мы вынимаем, то есть минусовое занчение количества, то валидация на достаточнгсть баланса
    } else {

      const arr = this.#finlists[this.indexFinList].finlistMovements

      let sum = 0

      arr.forEach(function (el) {
        sum = sum + el.movAmount
      })

      if (Math.abs(movAmount) <= sum) {

        // если курс конвертации не указан
        if (!exRateInp) {

          this.#finlists[this.indexFinList].finlistMovements.push({
            movAmount: movAmount,
            movDate: dateCur,
          })

          // если курс конвертации указан
        } else {

          this.#finlists[finListIndex].finlistMovements.push({
            movAmount: movAmount,
            movDate: dateCur,
            exRate: exRateInp
          })

        }

      } else {
        console.log('Недостаточно баланса');
      }

    }

  }


  // метод получения массива всех юзеров
  getAllUsers() {
    return this.#users
  }


  // метод получения массива всех финлистов
  getAllFinlists() {
    return this.#finlists
  }


  // метод вывода в интерфейс финлистов из базы
  displayFinlists() {

    const allFinLists = this.getAllFinlists()

    const currentUser = this.currentUser

    // фильтр финлистов, которые созданы юзером
    const currentUserFinlists = allFinLists.filter(function (item) {
      return item.owner === currentUser
    })


    // поиск шареных финлистов для данного юзера
    const arr = []

    const shareFinlists = allFinLists.filter(function (item) {

      item.participance.forEach(function (el) {
        if (el === currentUser) {
          arr.push(item)
        }
      })
    })

    // объединяем финлисты юзера (owner) и шареные 
    const finalLists = [...currentUserFinlists, ...arr]




    finalLists.forEach(function (item, idx) {


      // так как при выгрузке в интерфейс сортируем массив с финлистами есть соритиорвка по юзеру, а маассив общий , то находим индекс нужного в общем массиве
      let index

      allFinLists.find(function (el, idx) {
        index = idx
        return el.finlistName === item.finlistName
      })


      if (item.finlistCurrency === 'rub') {

        // формируем HTML с движениями из каждого финлиста (тут еще не вставлен тег table, так как гоним циклом и table будет много раз)
        let htmlMov = ''


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
          <tr class="tr">
            <td class="col-date">${itemMov.movDate}</td>
            <td class="col-amount">${new Intl.NumberFormat('ru-RU').format(itemMov.movAmount)}</td>
          </tr>
        `

        })


        // считаем сумму всех movements в финлисте -> далее вставляем в HTML в блок Total
        const sumAllMovements = item.finlistMovements.reduce(function (acc, cur) {
          return acc + cur.movAmount
        }, 0)



        // переменная куда записываем html код с пошаренными людьми
        let shareHTMLnumber = ''

        // проверяем пошарен ли финлист и если да то добавляем отображение этого с количеством участников
        // чтобы число пошаренных юзеров отображалось только у овнера, сравниваем овнера финлиста и текущего, если не совпадают, то кол-во пошаренных не отображается. 
        if (appData.currentUser === item.owner && item.participance.length > 0) {
          shareHTMLnumber = `<p class="finlist-invites-check">+${item.participance.length}</p>`
        }


        // отображаем для юзера значек того, что лист ему кем-то пошарен
        let shareListOwner = ''

        if (appData.currentUser != item.owner) {
          shareListOwner = `<p class="finlist-owner">&#8594 ${item.owner}</p>`
        }



        // формируем заголовок с Title каждого финлиста
        let htmlMovTitle = `
        <div class="finlist-header">
            <div class="toggle-click-open">
            <h3 class="finList-title">${item.finlistName} <span>(${item.finlistCurrency})${shareHTMLnumber}${shareListOwner}</span></h3>
            <h3 class="finList-total">Total: <span>${new Intl.NumberFormat('ru-RU').format(sumAllMovements)}</span></</h3>
            </div>
            <div class="btn-all-finlist-operations ${index}"><img src="img/more.svg" alt="" class="more-ico"></div>
        </div>
      `

        // формируем таблицу со всеми движениями
        const htmlMovTable = `
        <div class="finlist-table">
          <h3 class="table-title">Activity</h3>
          <table class="table">
            ${htmlMov}
          </table>
        </div>
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
            <tr class="tr">
              <td class="col-date">${itemMov.movDate}</td>
              <td class="col-amount">${itemMov.movAmount}</td>
              <td class="col-amount">${itemMov.exRate}</td>
            </tr>
          `
        })


        // считаем сумму всех movements в финлисте -> далее вставляем в HTML в блок Total
        const sumAllMovements = item.finlistMovements.reduce(function (acc, cur) {
          return acc + cur.movAmount
        }, 0)


        // переменная куда записываем html код с пошаренными людьми
        let shareHTMLnumber = ''

        // проверяем пошарен ли финлист и если да то добавляем отображение этого с количеством участников
        // чтобы число пошаренных юзеров отображалось только у овнера, сравниваем овнера финлиста и текущего, если не совпадают, то кол-во пошаренных не отображается. 
        if (appData.currentUser === item.owner && item.participance.length > 0) {
          shareHTMLnumber = `<p class="finlist-invites-check">+${item.participance.length}</p>`
        }


        // отображаем для юзера значек того, что лист ему кем-то пошарен
        let shareListOwner = ''

        if (appData.currentUser != item.owner) {
          shareListOwner = `<p class="finlist-owner">&#8594 ${item.owner}</p>`
        }


        // формируем заголовок с Title каждого финлиста
        let htmlMovTitle = `
          <div class="finlist-header">
              <div class="toggle-click-open">
              <h3 class="finList-title">${item.finlistName} <span>(${item.finlistCurrency})${shareHTMLnumber}${shareListOwner}</span></h3>
              <h3 class="finList-total">Total: <span>${sumAllMovements}</span> </h3>
              </div>
              <div class="btn-all-finlist-operations ${index}"><img src="img/more.svg" alt="" class="more-ico"></div>
          </div>
        `

        // формируем таблицу со всеми движениями
        const htmlMovTable = `
        <div class="finlist-table">
          <h3 class="table-title">Activity</h3>
          <table class="table">
            ${htmlMov}
          </table>
        </div>

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

    this.finListDetalisationVisible()

    this.finListNumberInArr()

    this.calcTotalBalance()


  }


  // метод раскрытия детализации финлиста
  finListDetalisationVisible() {

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


  // определние номера элемента финлиста при клике по кнопке + добавления Movements  
  finListNumberInArr() {

    let idx

    const plusBtn = document.querySelectorAll('.btn-all-finlist-operations')

    plusBtn.forEach(function (el) {
      el.addEventListener('click', function () {

        idx = el.classList[1];

        cntOperationsFL.style.display = 'block'

        // modalMovements.style.display = 'block'

        // проверяем какая валюта финлиста6 чтобы при необходимости отобрать инпут для курса обмена
        if (appData.finListCurrencyCheck(idx) === 1) {
          inputMovFLexrate.style.display = 'none'
        } else {
          inputMovFLexrate.style.display = 'block'
        }

        overlay.style.display = 'block'

        inputMovFLamount.focus()

        appData.indexFinList = idx

      })
    })



  }


  // добавление participance
  addParticipance(partName) {

    this.#finlists[this.indexFinList].participance.push(partName)

    console.log('---- Участник Добавлен');
    console.log(this.#finlists);

    containerFinLists.innerHTML = ''

    this.displayFinlists()

  }


  // удаление participance
  removeParticipance(partName) {

    const idx = this.#finlists[this.indexFinList].participance.indexOf(partName)
    this.#finlists[this.indexFinList].participance.splice(idx, 1)

    console.log('---- Участник Удален');
    console.log(this.#finlists);

    containerFinLists.innerHTML = ''

    this.displayFinlists()

  }

  // метод подсчета суммарного баланса по всем финлистам юзера - owner (вывод на главной) с пересчетмо в рубли
  calcTotalBalance() {

    const userOwnerFinLists = this.#finlists.filter(function (el) {
      return el.owner === appData.currentUser
    })

    let rubTotal = 0
    let usdTotal = 0

    console.log(userOwnerFinLists);

    userOwnerFinLists.forEach(function (el) {

      if (el.finlistCurrency === 'rub') {

        el.finlistMovements.forEach(function (el) {
          rubTotal = rubTotal + el.movAmount
        })

      } else if (el.finlistCurrency === 'usd') {

        el.finlistMovements.forEach(function (el) {
          usdTotal = usdTotal + el.movAmount
        })

      }

    })


    const usdToRub = usdTotal * 72

    const totalBalance = usdToRub + rubTotal

    accNumber.innerHTML = `${new Intl.NumberFormat('ru-RU').format(totalBalance)}<span>&#8381</span>`


  }



}



// создаем инстанс основной даты прилы
const appData = new MainData()




// Предустанавливаем Финлисты под Owner Tolik
appData.addNewFinlist('Накопления', 'rub', 'Tolik')
appData.addNewFinlist('Доллары', 'usd', 'Tolik')
appData.addNewFinlist('Инвестиции', 'rub', 'Tolik')
appData.addNewFinlist('Дом', 'rub', 'Katya')


// Предустанавливаем Mov в Финлист Накопления
appData.addNewMovements(0, 26300, '', '01.11.2021')
appData.addNewMovements(0, 30000, '', '27.10.2021')


// Предустанавливаем Mov в Финлист Инвестиции
appData.addNewMovements(2, 13660, '', '12.11.21')
appData.addNewMovements(2, 11508, '', '03.11.21')
appData.addNewMovements(2, 30500, '', '10.07.20')
appData.addNewMovements(2, 12864, '', '25.03.20')
appData.addNewMovements(2, 4260, '', '27.02.20')
appData.addNewMovements(2, 19730, '', '25.02.20')
appData.addNewMovements(2, 2740, '', '10.01.20')
appData.addNewMovements(2, 5675, '', '10.01.20')
appData.addNewMovements(2, 2732, '', '10.01.20')



appData.addNewMovements(1, 262, 70)


console.log('----- All Finlists in base');
console.log(appData.getAllFinlists());





























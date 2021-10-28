'use strict'


// Класс для хранения инфы о зарегенных юзерах
class MainData {

  // массив со всеми юзерами (объекты)
  #users = [];
  // массив со всеми финлистами и движениями
  #finlists = [];


  // метод поиска по массивам данных
  findData(arr, searchItem) {

    const check = arr.find(function (item) {
      return item.userName === searchItem
    })

    return check

  }


  // метод валидации данных при регистрации нового юзера
  validationNewSignUp(inputName, inputPass, inputRepeatPass) {

    // проверяем занаятость имени
    const check = this.findData(this.#users, inputName)

    // услолвия при различных сценариях валидации
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

    // проверка на наличие юзера с таким имени (если он есть то вернет его, а если нет то undefined)
    const check = this.findData(this.#users, name)

    // условие: если юзер существует и его пароль равен паролю передаваемому в качестве аргумента, то вход, иначе нотификашка об ошибке
    if (check && check.userPassword === +password) {
      console.log('Успешный логин');
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
  addNewFinlist(name, currency) {

    const newFinlistObj = {
      finlistName: name,
      finlistCurrency: currency,
      finlistMovements: []
    }

    this.#finlists.push(newFinlistObj)

  }

  // метод удаления финлиста
  removeFinList(name) {

    let index

    const checkName = this.#finlists.find(function (el, idx) {
      index = idx
      return el.finlistName === name
    })

    if (checkName) {
      this.#finlists.splice(index, 1)
    }

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
  addNewMovements(finListIndex, movAmount, exRateInp, manualSetDate) {


    // пока нет бека даты проставляю вручную, если есть manualSetDate, то он ставится, если нет, то автоматически формируется текущая дата
    let dateCur

    if (manualSetDate) {

      dateCur = manualSetDate

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

      const arr = this.#finlists[finListIndex].finlistMovements

      let sum = 0

      arr.forEach(function (el) {
        sum = sum + el.movAmount
      })

      if (Math.abs(movAmount) <= sum) {

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

}


// создаем инстанс основной даты прилы
const appData = new MainData()







// класс нового юзера
class Users {
  constructor(userName, userPassword) {
    this.userName = userName,
      this.userPassword = userPassword
  }
}



// создаем инстансы двух предустановленных юзеров
const newUser = new Users('Tolik', 1987)
const newUser2 = new Users('Katya', 1987)

// добавляем предустановленных юзеров (пушим) в инстанс с основной датой прилы (в массив)
appData.addNewUser(newUser)
appData.addNewUser(newUser2)


appData.addNewFinlist('Накопления', 'rub')
appData.addNewFinlist('Доллары', 'usd')
appData.addNewFinlist('Инвестиции', 'rub')

appData.addNewMovements(0, 30000)

appData.addNewMovements(1, 262, 71, '27.08.2020')

appData.addNewMovements(2, 27700, 0, '08.09.2020')
appData.addNewMovements(2, 30500, 0, '10.07.2020')
appData.addNewMovements(2, 12864, 0, '25.03.2020')
appData.addNewMovements(2, 4260, 0, '27.02.2020')
appData.addNewMovements(2, 19730, 0, '25.02.2020')
appData.addNewMovements(2, 2740, 0, '10.01.2020')
appData.addNewMovements(2, 5675, 0, '10.01.2020')
appData.addNewMovements(2, 2732, 0, '10.01.2020')
























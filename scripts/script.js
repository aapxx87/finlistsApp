'use strict'


// Класс для хранения инфы о зарегенных юзерах
class MainData {

  // массив со всеми юзерами (объекты)
  #users = [];
  // массив со всеми финлистами и движениями
  #finlists = [];


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


  // метод добавления нового movements в финлист
  addNewMovements(finListIndex, movAmount, exRateInp) {

    // формирование даты
    const now = new Date()
    const day = `${now.getDate()}`.padStart(2, 0)
    const month = `${now.getMonth() + 1}`.padStart(2, '0') // так как месяц стартует с нуля, то прибалвяем единицы
    const year = now.getFullYear()
    const dateCur = `${day}.${month}.${year}`


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
const newUser = new Users('tolik', 1987)
const newUser2 = new Users('katya', 1987)

// добавляем предустановленных юзеров (пушим) в инстанс с основной датой прилы (в массив)
appData.addNewUser(newUser)
appData.addNewUser(newUser2)





appData.addNewFinlist('Накопления', 'rub')

appData.addNewFinlist('Доллары', 'usd')

appData.addNewMovements(0, 30000)
appData.addNewMovements(0, 10000)

appData.addNewMovements(1, 262, 70)


// console.log(appData.getAllFinlists());





















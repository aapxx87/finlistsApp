'use strict'


// Класс для хранения инфы о зарегенных юзерах
class MainData {

  // массив со всеми юзерами (объекты)
  #users = [];
  // массив со всеми финлистами и движениями
  #finlists = [];

  // переменная для понимания текущей сессии (кто юзер)
  #currentUser;


  // метод добавления нового юзера в массив юзеров (регистрация)
  addNewUser(obj) {

    // проверка на занятость имени
    const check = this.#users.find(function (item) {
      return item.userName === obj.userName
    })

    // если check - undefined, то есть мы не нашли такого имени в масисве юзеров, то пушим нового юзера, если true, то есть нашли такое имя, то выдаем ошибку
    if (!check) {
      this.#users.push(obj)
      // console.log('Юзер успешно добавлен');
    } else {
      console.log('Имя уже анято');
    }

  }



  // метод логина (проверка имени и пасса при входе)
  _login(name, password) {

    // проверка на занятость имени (если он есть то вернет его, а если нет то undefined)
    const check = this.#users.find(function (item) {
      return item.userName === name
    })

    // условие: если юзер существует и его пароль равен паролю передаваемому в качестве аргумента, то вход, иначе нотификашка об ошибке
    if (check && check.userPassword === password) {
      console.log('Успешный логин');
    } else {
      console.log('Неправильный логин или пароль');
    }

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


  // метод добавления нового movements в финлист
  addNewMovements(finListName, movAmount) {

    let idx

    // находим нужный финлист и забираем его индекс
    this.#finlists.forEach(function (item, i) {
      if (item.finlistName === finListName) {
        idx = i
      }
    })


    this.#finlists[idx].finlistMovements.push({
      movAmount: movAmount,
      movDate: new Date()
    })



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



// класс нового юзера
class Users {
  constructor(userName, userPassword) {
    this.userName = userName,
      this.userPassword = userPassword
  }
}



// инстанс основной даты прилы
const appData = new MainData()


// создаем новых юзеров
const newUser = new Users('Igor', 1111)
const newUser2 = new Users('Olga', 2222)



// добавляем нового юзера (пушим) в инстанс с основной датой прилы (в массив)
appData.addNewUser(newUser)
appData.addNewUser(newUser2)



// тестовый юзер
const newUser3 = new Users('ira', 3333)

// appData.checkFreeName(newUser3)
appData.addNewUser(newUser3)


appData._login('Olga', 2222)

appData.addNewFinlist('Vacation', 'rub')

appData.addNewFinlist('Save', 'usd')





appData.addNewMovements('Save', 2000);

console.log(appData.getAllFinlists());















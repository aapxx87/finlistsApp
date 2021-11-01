'use strict'

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
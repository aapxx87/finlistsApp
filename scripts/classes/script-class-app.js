'use strict'

// Класс приложения
class App {

  constructor() {

    btnSignUp.addEventListener('click', this._regNewUser.bind(this))

    btnLogin.addEventListener('click', this._loginUser.bind(this))

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

      this.clearInputValue()

      this.labelDown()

    }

  }


  // метод чистки инпутов
  clearInputValue() {
    inputUsername.value = ''
    inputPassword.value = ''
    inputRepeatPassword.value = ''

    inputUsernameLogin.value = ''
    inputPasswordLogin.value = ''

    inputMovFLamount.value = ''
    inputMovFLexrate.value = ''

    inputInviteMember.value = ''
    inputDeleteMember.value = ''
  }


  // метод возврата лейблов после ошибки валидации обратно в инпцты (опускаются обратно вниз)
  labelDown() {
    labels.forEach(function (el) {
      el.classList.remove('labelActive')
      console.log(el);
    })
  }


  // метод вызова окна нотификации об ошибках при регистрации
  displayWarningNotification(notificationText, color, selector) {
    selector.innerHTML = `<p>${notificationText}</p>`
    selector.style.background = color
    selector.style.display = 'flex'
  }


}




// создаем инстанс Аппа
const app = new App()
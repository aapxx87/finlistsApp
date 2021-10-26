// функция чистки инпутов
const clearInputValue = function () {
  inputUsername.value = ''
  inputPassword.value = ''
  inputRepeatPassword.value = ''
}

// функция вызова окна нотификации об ошибках при регистрации
const displayWarningNotification = function (notificationText) {
  boxWarning.textContent = notificationText
  boxWarning.style.background = '#6d9656'
  boxWarning.style.display = 'block'
}


// ИвентХендлер на кнопке Sign Up
btnSignUp.addEventListener('click', function () {

  // создаем инстанс юзера
  const newUser = new Users(inputUsername.value, inputPassword.value)

  // Валидация при регистрации по методу validationNewSignUp
  if (appData.validationNewSignUp(inputUsername.value, inputPassword.value, inputRepeatPassword.value) === 1) {
    // первое условие когда все ок

    // вызываем метод addNewUser и добавляем пользователя в массив зарегенных юзеров
    appData.addNewUser(newUser)

    displayWarningNotification('Аккаунт создан')

    setTimeout(function () {
      boxWarning.style.display = 'none'
      loginContainer.style.display = 'block'
      signUpContainer.style.display = 'none'
    }, 1000)

    clearInputValue()

  } else if (appData.validationNewSignUp(inputUsername.value, inputPassword.value, inputRepeatPassword.value) === 0) {

    displayWarningNotification('Имя уже занято')

    setTimeout(function () {
      boxWarning.style.display = 'none'
    }, 3000)

    clearInputValue()

  } else if (appData.validationNewSignUp(inputUsername.value, inputPassword.value, inputRepeatPassword.value) === 2) {

    displayWarningNotification('Не совападают пароли')

    setTimeout(function () {
      boxWarning.style.display = 'none'
    }, 3000)

    clearInputValue()

  } else if (appData.validationNewSignUp(inputUsername.value, inputPassword.value, inputRepeatPassword.value) === 3) {

    displayWarningNotification('Введите имя')

    setTimeout(function () {
      boxWarning.style.display = 'none'
    }, 3000)

    clearInputValue()

  } else if (appData.validationNewSignUp(inputUsername.value, inputPassword.value, inputRepeatPassword.value) === 4) {

    displayWarningNotification('Введите пароль')

    setTimeout(function () {
      boxWarning.style.display = 'none'
    }, 3000)

    clearInputValue()

  }

  console.log(appData.getAllUsers());

})
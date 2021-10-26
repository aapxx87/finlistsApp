const clearInputs = function () {
  inputUsernameLogin.value = ''
  inputPasswordLogin.value = ''
}

btnLogin.addEventListener('click', function () {

  if (appData._login(inputUsernameLogin.value, inputPasswordLogin.value) === 1) {

    loginSignUpContainer.style.display = 'none'
    mainPageContainer.style.display = 'block'

    clearInputs()

  } else if (appData._login(inputUsernameLogin.value, inputPasswordLogin.value) === 0) {

    boxWarningLogin.textContent = 'Неправильный логин или пароль'
    boxWarningLogin.style.background = '#EF3957'
    boxWarningLogin.style.display = 'block'

    setTimeout(function () {
      boxWarningLogin.style.display = 'none'
    }, 3000)

    clearInputs()

  }

})
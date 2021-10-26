
// ****** Блок Регистрации / Логина *******

// -- Кнопки переключения между Регой и Логином

btnLoginMode.addEventListener('click', function () {
  loginContainer.style.display = 'block'
  signUpContainer.style.display = 'none'
})


btnSignUpMode.addEventListener('click', function () {
  loginContainer.style.display = 'none'
  signUpContainer.style.display = 'block'
})



// ****** Анимация label для инпутов в блоке Регистрации/Логина *******

// функция для отъезжания лейбла вверх при клике на лейбле
const labelClickMoveUp = function (label, input) {

  label.addEventListener('click', function () {

    label.classList.add('labelActive')
    // добавит фокус ин инпуту
    input.focus()

  })

}

labelClickMoveUp(inputUsernameSignUpLabel, inputUsername)
labelClickMoveUp(inputUsernameSignUpPassLabel, inputPassword)
labelClickMoveUp(inputUsernameSignUpPassRepeatLabel, inputRepeatPassword)

labelClickMoveUp(inputUsernameLoginLabel, inputUsernameLogin)
labelClickMoveUp(inputUsernameLoginPassLabel, inputPasswordLogin)


// функция для отъезжания лейбла вверх при клике (фокусе) на инпуте
const inputLabelAnimationIn = function (inputName, labelName) {

  inputName.addEventListener('focusin', function () {
    labelName.classList.add('labelActive')
  })

}

// функция возврата лейбла обратно в инпут при снятии фокуса при условии что в нем ничего не напечатано
const inputLabelAnimationOut = function (inputName, labelName) {

  inputName.addEventListener('focusout', function () {

    // условие проверки есть что-то в инпуте или нет
    if (inputName.value.length > 0) {
      labelName.classList.add('labelActive')
    } else if (inputName.value.length === 0) {
      labelName.classList.remove('labelActive')
    }

  })

}

// параметры для страницы Регистрации
inputLabelAnimationIn(inputUsername, inputUsernameSignUpLabel)
inputLabelAnimationOut(inputUsername, inputUsernameSignUpLabel)

inputLabelAnimationIn(inputPassword, inputUsernameSignUpPassLabel)
inputLabelAnimationOut(inputPassword, inputUsernameSignUpPassLabel)

inputLabelAnimationIn(inputRepeatPassword, inputUsernameSignUpPassRepeatLabel)
inputLabelAnimationOut(inputRepeatPassword, inputUsernameSignUpPassRepeatLabel)

// параметры для страницы Логина
inputLabelAnimationIn(inputUsernameLogin, inputUsernameLoginLabel)
inputLabelAnimationOut(inputUsernameLogin, inputUsernameLoginLabel)

inputLabelAnimationIn(inputPasswordLogin, inputUsernameLoginPassLabel)
inputLabelAnimationOut(inputPasswordLogin, inputUsernameLoginPassLabel)
// ** SELECTORS **



// ** CONTAINERS

const loginSignUpContainer = document.querySelector('.container-signup-login')
const loginContainer = document.querySelector('.container-login')
const signUpContainer = document.querySelector('.container-signup')

const mainPageContainer = document.querySelector('.container-mainPage')

const containerFinLists = document.querySelector('.container-finList')

// - Кнопки переключения между Регой и Логином
const logRegSwitchBox = document.querySelector('.reg-mode')
const btnLoginMode = document.querySelector('.login-box')
const btnSignUpMode = document.querySelector('.reg-box')



// ** SIGNUP

// -- Inputs
const inputUsername = document.querySelector('.input-username')
const inputPassword = document.querySelector('.input-password')
const inputRepeatPassword = document.querySelector('.input-password-repeat')

// -- Labels
const inputUsernameSignUpLabel = document.querySelector('.label-input-box-signUp-username')
const inputUsernameSignUpPassLabel = document.querySelector('.label-input-box-signUp-password')
const inputUsernameSignUpPassRepeatLabel = document.querySelector('.label-input-box-signUp-password-rep')

// -- Buttons
const btnSignUp = document.querySelector('.btn-signUp')

// -- Notification 
const boxWarning = document.querySelector('.notification')




// ** LOGIN

// -- Inputs
const inputUsernameLogin = document.querySelector('.input-username-log')
const inputPasswordLogin = document.querySelector('.input-password-log')

// -- Labels
const inputUsernameLoginLabel = document.querySelector('.label-input-box-login-username')
const inputUsernameLoginPassLabel = document.querySelector('.label-input-box-login-password')

// -- Buttons
const btnLogin = document.querySelector('.btn-login')

// -- Notification 
const boxWarningLogin = document.querySelector('.notification-login')




// ** MAIN PAGE

// ! Modal Window Add New Fin List / Remove Fin List
const modalFinList = document.querySelector('.container-modal-add-finlist')

// -- Buttons
const btnModalFinList = document.querySelector('.btn-addModalFinList')
const btnAddNewFinList = document.querySelector('.btn-addFinList')
const btnRemoveFinList = document.querySelector('.btn-removeFinList')

// -- Input
const inputFinListName = document.querySelector('.input-add-finlist-name')
const inputFinListCur = document.querySelector('.input-add-finlist-cur')
const inputFinListNameRemove = document.querySelector('.input-remove-finlist-name')

// - Overlay
const overlay = document.querySelector('.container-overlay')


// ! Modal Window Add Movements
const modalMovements = document.querySelector('.container-modal-add-movements')

// -- Buttons
const btnModalMov = document.querySelector('.btn-addFinMove')
const btnAddNewMov = document.querySelector('.btn-addMov')

const btnAddNewMovPlus = document.querySelector('.btn-addMov-plus')

// -- Input
const inputMovFLamount = document.querySelector('.input-add-mov-amount')
const inputMovFLexrate = document.querySelector('.input-add-mov-exrate')

// - Modal Window Add Movements on Plus Btn
const modalMovementsPlusBtn = document.querySelector('.container-modal-add-movements-PlusBtn')


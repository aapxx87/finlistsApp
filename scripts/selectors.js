// ** SELECTORS **



// ** CONTAINERS

const loginSignUpContainer = document.querySelector('.container-signup-login')
const loginContainer = document.querySelector('.container-login')
const signUpContainer = document.querySelector('.container-signup')

const mainPageContainer = document.querySelector('.container-mainPage')
const containerFinLists = document.querySelector('.container-finList')
const cntOperationsFL = document.querySelector('.container-operation-with-finlists')



// ** Переключение между Регой и Логином

// - Контейнер
const logRegSwitchBox = document.querySelector('.reg-mode')

// - Buttons
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
const labels = document.querySelectorAll('.label')

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

// ! Modal Window Add New Fin List
const modalFinList = document.querySelector('.container-modal-add-finlist')

// -- Buttons
const btnModalFinList = document.querySelector('.btn-addModalFinList')
const btnAddNewFinList = document.querySelector('.btn-addFinList')

// -- Input
const inputFinListName = document.querySelector('.input-add-finlist-name')
const inputFinListCur = document.querySelector('.input-add-finlist-cur')



// ! Container operations with FinLists
// - Кнопка раскрытия списка действий над финлистами (+ определение номера эелемента финлиста в)
const btnModalMov = document.querySelector('.btn-all-finlist-operations')

// - Общий Box с вариантами действий 
const boxOperations = document.querySelector('.box-operations-list')

// -- Box добавления movements
const boxAddMov = document.querySelector('.box-operations-add-movements')

// -- Box Sharing setting
const boxShareFL = document.querySelector('.box-operations-share')

// -- Button delete FinList
const btnRemoveFinList = document.querySelector('.btn-removeFinList')


// - Action links
const linkAddMov = document.querySelector('.btn-add-movements')
const linkShareFL = document.querySelector('.btn-share-fl')


// - Стрелки возврата на основной экран выбора действий
const backFromMov = document.querySelector('.back-from-add-mov')
const backFromShare = document.querySelector('.back-from-sharing')


// ! Box Add Movements
// -- Buttons
const btnAddNewMov = document.querySelector('.btn-addMov')

// -- Input
const inputMovFLamount = document.querySelector('.input-add-mov-amount')
const inputMovFLexrate = document.querySelector('.input-add-mov-exrate')



// ! Box Share Settings
// - Box
const boxSharingSetting = document.querySelector('.box-operations-share')

//  - Inputs
const inputInviteMember = document.querySelector('.input-invite-member')
const inputDeleteMember = document.querySelector('.input-delete-member')

// - Buttons
const btnInviteMember = document.querySelector('.btn-invite')
const btnDeleteMember = document.querySelector('.btn-delete-member')



// ! Overlay
const overlay = document.querySelector('.container-overlay')


// ! Welcome title
const welcomeTitle = document.querySelector('.welcome-title')

// ! Logout box
const logout = document.querySelector('.logout-box')




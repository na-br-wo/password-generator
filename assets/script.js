// Assigning variables
const confirmBtn = document.querySelector('.confirmBtn');
const closeBtn = document.querySelector('.closeBtn');
const showPrompts = document.getElementById('showPrompts');
// variable to toggle overlay element
const overlay = document.getElementById('overlay');
// linking the password length slider with the number box
const pwordLengthRange = document.getElementById('pwordLengthRange');
const pwordLengthNumber = document.getElementById('pwordLengthNumber');


// variables for the checkboxes
const includeUppercaseEl = document.getElementById('includeUppercase');
const includeNumericEl = document.getElementById('includeNumeric');
const includeSpecialCharsEl = document.getElementById('includeSpecialChars');



// variables for ASCII char chodes
const LOWERCASE_CHAR_CODES = arrayLoop(97, 122);
const UPPERCASE_CHAR_CODES = arrayLoop(65, 90);
const NUMERIC_CHAR_CODES = arrayLoop(48, 57);
// using concat because the special characters are split up
const SPECIAL_CHAR_CODES = arrayLoop(33, 47).concat(
  arrayLoop(58, 64)
).concat(
  arrayLoop(91, 95)
).concat(
  arrayLoop(123, 126)
);

// variable for password display
const passwordDisplay = document.getElementById('password');

// Opening passwordPrompts modal when user clicks Generate Password button
showPrompts.addEventListener('click', () => {
  // selecting modal based on HTML class .modal
  const modal = document.querySelector('.modal');
  openModal(modal);
});

// closing the modal with 'confirm' button -- needs to display password based on prompts
confirmBtn.addEventListener('click', () => {
  // since the confirm/close buttons are inside modal
  // using .closest to select the closest parent element
  // logic to generate a password based on passwordPrompts form input
  
  // setting up variables within the eventlistener
  passwordLength = pwordLengthNumber.value;
  const includeUppercase = includeUppercaseEl.checked;
  const includeNumeric = includeNumericEl.checked;
  const includeSpecialChars = includeSpecialCharsEl.checked;
  // for the confirmBtn scope
  let password = generatePassword(passwordLength, includeUppercase, includeNumeric, includeSpecialChars)

  passwordDisplay.textContent = password;


  const modal = confirmBtn.closest('.modal');
  closeModal(modal);
});

// closing the modal with 'close' button -- does not display password
closeBtn.addEventListener('click', () => {
  // selecting modal based on HTML class .modal
  const modal = closeBtn.closest('.modal');
  closeModal(modal);
});

// adding code to close modal and end overlay if overlay object is clicked
overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal');
  closeModal(modals[modals.length - 1]);
});


// closing the modal with 'close' button -- does not display password
closeBtn.addEventListener('click', () => {
  // selecting modal based on HTML class .modal
  const modal = closeBtn.closest('.modal');
  closeModal(modal);
})

// adding code to close modal and end overlay if overlay object is clicked
overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal');
  closeModal(modal);
})

// writing openModal function which will toggle the .active class for any modal passed through
function openModal(modal) {
  if (modal == null) return;
  // adding '.active' class to the modal, which will make is visible
  modal.classList.add('active');
  // also activating the overlay, because we want it to display
  // when modal is active
  overlay.classList.add('active');
}

// function to close modal
function closeModal(modal) {
  if (modal == null) return;

  modal.classList.remove('active');
  overlay.classList.remove('active');
}

// event listeners linking the pwordlength range & numbers
pwordLengthRange.addEventListener('input', syncLength);
pwordLengthNumber.addEventListener('input', syncLength);

function syncLength(e) {
  const value = e.target.value;
  pwordLengthRange.value = value;
  pwordLengthNumber.value = value;
}

// function to generate the password, based on ASCII character codes
// https://www.ascii-code.com/
// parameters are lengnth of password, whether to include uppercase, lowercase, and special chars
let passwordLength = pwordLengthNumber.value;

function generatePassword(passwordLength, includeUppercase, includeNumeric, includeSpecialChars) {
  let charCodes = LOWERCASE_CHAR_CODES;

  if (includeUppercase) {
    charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
  }

  if (includeNumeric) {
    charCodes = charCodes.concat(NUMERIC_CHAR_CODES);
  }

  if (includeSpecialChars) {
    charCodes = charCodes.concat(SPECIAL_CHAR_CODES);
  }
  console.log(charCodes)

  const passwordCharacters = [];

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * charCodes.length);
    const characterCode = charCodes[randomIndex];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }

  return passwordCharacters.join('');
}

// looping array function to generate numbers that will be
// converted to ASCII codes
function arrayLoop(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array
}




// Assignment code here

var resultElement = document.getElementById('result');
var lengthElement = document.getElementById('length');
var uppercaseElement = document.getElementById('uppercase');
var lowercaseElement = document.getElementById('lowercase');
var numbersElement = document.getElementById('numbers');
var symbolsElement = document.getElementById('symbols');
var generateElement = document.getElementById('generate');
var clipboardElement = document.getElementById('result');

var randomFunction = {
  upper: getRandomUpper,
  lower: getRandomLower,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// Generator functions - https://net-comber.com/charset.html

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  var symbols = '!@#$%^&*(){}+<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}

var randomFunction = {
  upper: getRandomUpper,
  lower: getRandomLower,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// Get references to the elements
var resultElement = document.getElementById('result');
var passwordTextElement = document.getElementById('password-text');
var lengthElement = document.getElementById('length');
var uppercaseElement = document.getElementById('uppercase');
var lowercaseElement = document.getElementById('lowercase');
var numbersElement = document.getElementById('numbers');
var symbolsElement = document.getElementById('symbols');
var generateElement = document.getElementById('generate');
var clipboardElement = document.getElementById('clipboard-btn');

// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
  var generatedPassword = '';

  var typesCount = lower + upper + number + symbol;
  var typesArray = [
    { upper },
    { lower },
    { number },
    { symbol }
  ].filter(item => Object.values(item)[0]);

  if (typesCount === 0) {
    return '';
  }

  for (var i = 0; i < length; i += typesCount) {
    typesArray.forEach(type => {
      var funcName = Object.keys(type)[0];
      var func = randomFunction[funcName];
      generatedPassword += func();
    });
  }

  var finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

// Event listeners
generateElement.addEventListener('click', () => {
  var length = parseInt(lengthElement.value);
  var hasLower = lowercaseElement.checked;
  var hasUpper = uppercaseElement.checked;
  var hasNumber = numbersElement.checked;
  var hasSymbols = symbolsElement.checked;

  if (isNaN(length) || length < 8 || length > 128) {
    alert('Please enter a valid password length between 8 and 128.');
    return;
  }

  var password = generatePassword(hasLower, hasUpper, hasNumber, hasSymbols, length);
  passwordTextElement.innerText = password; // Update password text

  if (!password) {
    clipboardElement.disabled = true;
  } else {
    clipboardElement.disabled = false;
  }
});

clipboardElement.addEventListener('click', () => {
  var password = passwordTextElement.innerText;

  if (!password) {
    return;
  }

  navigator.clipboard.writeText(password)
    .then(() => {
      alert('Password copied to clipboard!');
    })
    .catch(err => {
      console.error('Failed to copy password: ', err);
    });
});


// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = '';
  var typesCount = lower + upper + number + symbol;
  var typesArray = [{ upper }, { lower }, { number }, { symbol }].filter(item => Object.values(item)[0]);

  // Does not have a selected type
  if (typesCount === 0) {
    return '';
  }

  // Loop
  for (let i = 0; i < length; i += typesCount) {
    typesArray.forEach(type => {
      var funcName = Object.keys(type)[0];
      var func = randomFunction[funcName];
      generatedPassword += func(); // Concatenate the generated character
    });
  }

  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}

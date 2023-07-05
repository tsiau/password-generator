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
  synbol: getRandomSymbol,
};

// Generator functions - https://net-comber.com/charset.html

function getRandomUpper () {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower () {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber () {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol () {
  var symbols = '!@#$%^&*(){}+<>/,.'
  return symbols[Math.floor(Math.random()* symbols.length)];
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}
// Add event listener to generate button

generateElement.addEventListener('click', () => {
  var length = lengthElement.value;
  var hasLower = lowercaseElement.checked;
  var hasUpper = uppercaseElement.checked;
  var hasNumber = numbersElement.checked;
  var hasSymbols = symbolsElement.checked;

  generatePassword(hasLower, hasUpper, hasNumber, hasSymbols);
});

// Copy password to clipboard

clipboardElement.addEventListener('click', () => {
  var textArea = document.createElement('textarea');
  var password = resultElement.innerText;

  if(!password) {
    return;
  }

  textArea.value = password;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  textArea.remove();
  alert('Password copied to clipboard!');
})

// Selecting what you want in the password 

generateBtn.addEventListener('click', () => {
var length = +lengthElement.value;
var hasUpper = uppercaseElement.checked;
var hasLower = lowercaseElement.checked;
var hasNumber = numbersElement.checked;
var hasSymbols = symbolsElement.checked;

resultElement.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbols, length);
});

// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
  let generatePassword = '';
  var typesCount = lower + upper + number + symbol;
  //console.log('typesCount: ', typesCount);
  var typesArray = [{upper}, {lower}, {number}, {symbols}];
  (
    item => Object.values(item)[0]);
  //console.log('typesArray: ', typesArray);
  if(typesCount === 0) {
    return '';
  }
// loop
    for(let i=0; i< length; i += typesCount) {
      typesArray.forEach(type => {
        var functionName = Object.keys(type)[0];
        console.log('functionName: ', functionName);
        generatePassword += randomFunction[functionName]();
      });
    }
  var finalPassword = generatePassword.slice(0, length);
  return finalPassword;
    }
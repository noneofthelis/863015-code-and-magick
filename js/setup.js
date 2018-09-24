'use strict';

var CHARACTERS_NAMES = [
  'Ивашко',
  'Хуан Себастьян де ля Фонтан',
  'Фридрих Хамутальевич',
  'Саурон',
  'Хуанхэ',
  'Владимир Владимирович',
  'Лютик',
  'Донат'
];
var CHARACTERS_SURNAMES = [
  'Иванов',
  'Фон Зажратт',
  'Гитлер',
  'Поперексебяш',
  'Храмп',
  'Ядовитый',
  'Побегайло',
  'Берегикопыто'
];
var COATS_COLOURS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLOURS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var FIREBALL_COLOURS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var CHARACTERS_AMOUNT = 4;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var submitButton = setup.querySelector('.setup-submit');

function appendElements(elements) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < elements.length; i++) {
    fragment.appendChild(elements[i]);
  }
  document.querySelector('.setup-similar-list').appendChild(fragment);
}

function generateCharacters(amount) {
  var characters = [];
  for (var i = 0; i < amount; i++) {
    var character = createCharacter(CHARACTERS_NAMES, CHARACTERS_SURNAMES, COATS_COLOURS, EYES_COLOURS);
    characters[i] = createElement(character);
  }
  return characters;
}

function createElement(object) {
  var template = document.getElementById('similar-wizard-template').content.querySelector('.setup-similar-item');
  var element = template.cloneNode(true);

  element.querySelector('.setup-similar-label').textContent = object.name;
  element.querySelector('.wizard-coat').style.fill = object.coatColour;
  element.querySelector('.wizard-eyes').style.fill = object.eyesColour;

  return element;
}

function createCharacter(names, surnames, clothes, eyesColours) {
  var character = {
    name: getRandomElement(names) + ' ' + getRandomElement(surnames),
    coatColour: getRandomElement(clothes),
    eyesColour: getRandomElement(eyesColours)
  };
  return character;
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// #14

function onUserNameInputInvalid() {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
}

function showPopup() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onEscPress);
  submitButton.addEventListener('keydown', onSubmitButtonPress);
  submitButton.addEventListener('click', onSubmitButtonClick);
}

function hidePopup() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onEscPress);
}

function sendForm() {
  setup.querySelector('.setup-wizard-form').submit();
}

function onSubmitButtonClick() {
  if (userNameInput.validity.valid) {
    sendForm();
  }
}

function onSubmitButtonPress(evt) {
  if (evt.keyCode === ENTER_KEYCODE && submitButton === document.activeElement && userNameInput.validity.valid) {
    sendForm();
  }
}

function onEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE && userNameInput !== document.activeElement) {
    hidePopup();
  }
}

function onCharacterCoatClick(evt) {
  generateValue(evt.target, 'fill', COATS_COLOURS, 'coat');
}

function onCharacterEyesClick(evt) {
  generateValue(evt.target, 'fill', EYES_COLOURS, 'eyes');
}

function onCharacterFireballClick(evt) {
  generateValue(evt.target.parentElement, 'background', FIREBALL_COLOURS, 'fireball');
}

function onSetupOpenClick() {
  showPopup();
}

function onSetupCloseClick() {
  hidePopup();
}

function onSetupOpenPress(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    showPopup();
  }
}

function onSetupClosePress(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    hidePopup();
  }
}

function generateValue(element, propertyToSet, array, selectorPrefix) {
  var colour = getRandomElement(array);
  element.setAttribute('style', propertyToSet + ':' + colour + ';');
  setup.querySelector('input[name = "' + selectorPrefix + '-color"]').value = colour;
}

userNameInput.addEventListener('invalid', onUserNameInputInvalid);

setupOpen.addEventListener('click', onSetupOpenClick);
setupOpen.addEventListener('keydown', onSetupOpenPress);
setupClose.addEventListener('click', onSetupCloseClick);
setupClose.addEventListener('keydown', onSetupClosePress);

setup.querySelector('.wizard-coat').addEventListener('click', onCharacterCoatClick);
setup.querySelector('.wizard-eyes').addEventListener('click', onCharacterEyesClick);
setup.querySelector('.setup-fireball').addEventListener('click', onCharacterFireballClick);

appendElements(generateCharacters(CHARACTERS_AMOUNT));

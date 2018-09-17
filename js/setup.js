'use strict';

document.querySelector('.setup.hidden').classList.remove('hidden');

var CHARACTERS_NAMES = ['Ивашко', 'Хуан Себастьян де ля Фонтан', 'Фридрих Хамутальевич', 'Саурон', 'Хуанхэ', 'Владимир Владимирович', 'Лютик', 'Донат'];
var CHARACTERS_SURNAMES = ['Иванов', 'Фон Зажратт', 'Гитлер', 'Поперексебяш', 'Храмп', 'Ядовитый', 'Побегайло', 'Берегикопыто'];
var COATS_COLOURS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOURS = ['black', 'red', 'blue', 'yellow', 'green'];

appendElements(generateCharacters(4));

document.querySelector('.setup-similar').classList.remove('hidden');

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

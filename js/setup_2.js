'use strict';

document.querySelector('.setup.hidden').classList.remove('hidden');

var CHARACTERS_NAMES = ['Ивашко', 'Хуан Себастьян де ля Фонтан', 'Фридрих Хамутальевич', 'Саурон', 'Хуанхэ', 'Владимир Владимирович', 'Лютик', 'Донат'];
var CHARACTERS_SURNAMES = ['Иванов', 'Фон Зажратт', 'Гитлер', 'Поперексебяш', 'Храмп', 'Ядовитый', 'Побегайло', 'Берегикопыто'];
var COATS_COLOURS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOURS = ['black', 'red', 'blue', 'yellow', 'green'];

appendElements(4);
document.querySelector('.setup-similar').classList.remove('hidden');

function appendElements(amount) {
  var characters = createCharacters(amount, CHARACTERS_NAMES, CHARACTERS_SURNAMES, COATS_COLOURS, EYES_COLOURS);
  var template = document.getElementById('similar-wizard-template').content.querySelector('.setup-similar-item');

  for (var i = 0; i < amount; i++) {
    var newElement = template.cloneNode(true);
    newElement.querySelector('.setup-similar-label').textContent = characters[i].name;
    newElement.querySelector('.wizard-coat').style.fill = characters[i].coatColour;
    newElement.querySelector('.wizard-eyes').style.fill = characters[i].eyesColour;
    document.querySelector('.setup-similar-list').appendChild(newElement);
  }
}

function createCharacters(amount, names, surnames, clothes, eyesColours) {
  var characters = [];
  for (var i = 0; i < +amount; i++) {
    var character = {
      name: getRandomElement(names) + ' ' + getRandomElement(surnames),
      coatColour: getRandomElement(clothes),
      eyesColour: getRandomElement(eyesColours)
    };
    characters.push(character);
  }
  return characters;
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

'use strict';

var RECT_COORDS = ['100, 10', '330, 22', '520, 10', '500, 110', '520, 280', '250, 260', '100, 280', '116, 160', '100, 10'];
var SHADOW_COORDS = ['110, 20', '340, 32', '530, 20', '510, 120', '530, 290', '260, 270', '110, 290', '126, 170', '110, 20'];
var ZERO_POINT_X = 100;
var ZERO_POINT_Y = 10;
var MAX_BAR_HEIGHT = 150;
var MAX_INNER_WIDTH = 420;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var TOP_GAP = 10;
var FONT_GAP = 20;

window.renderStatistics = function (ctx, names, times) {
  renderShape(ctx, SHADOW_COORDS, 'rgba(0, 0, 0, 0.7)');
  renderShape(ctx, RECT_COORDS, '#fff');
  renderText(ctx);
  renderBarChart(ctx, names, times);
};

function renderShape(ctx, coords, colour) {
  ctx.fillStyle = colour;
  ctx.beginPath();
  ctx.moveTo(ZERO_POINT_X, ZERO_POINT_Y); // x горизонт y вертикаль

  for (var i = 0; i < coords.length; i++) {
    var x = parseInt(coords[i], 10);
    var y = parseInt(coords[i].split(', ')[1], 10);
    ctx.lineTo(x, y);
  }

  ctx.closePath();
  ctx.fill();
}

function renderText(ctx) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура! Вы победили!', 120, 45); // Д19 ? Это магия ?
  ctx.fillText('Список результатов:', 120, 65);
}

function renderBarChart(ctx, names, times) {
  var numberOfPlayers = times.length;
  var opacities = getRandomNumbers(numberOfPlayers);
  console.log(numberOfPlayers);
  var padding = (MAX_INNER_WIDTH - BAR_WIDTH * numberOfPlayers - BAR_GAP * (numberOfPlayers - 1)) / 2;

  for (var i = 0; i < numberOfPlayers; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + opacities[0] + ')';
      opacities.splice(0, 1);
    }

    ctx.fillRect(ZERO_POINT_X + padding + (BAR_GAP + BAR_WIDTH) * i, ZERO_POINT_Y + 2 * TOP_GAP + 3 * FONT_GAP, BAR_WIDTH, MAX_BAR_HEIGHT);
    // console.log(padding, ZERO_POINT_X + padding + (BAR_GAP + BAR_WIDTH) * i, ZERO_POINT_Y + 2 * (TOP_GAP + FONT_GAP), BAR_WIDTH, MAX_BAR_HEIGHT); // ctx.fillRect(x, y, width, height)
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], BAR_WIDTH, MAX_BAR_HEIGHT + 40); // text, x, y [, maxWidth]
    ctx.fillText(times[i], BAR_WIDTH, MAX_BAR_HEIGHT + 80);
  }

}

/* На каждой итерации создаем столбец и имя и время.
Отдельно задаем насыщенность для игрока 'Вы';
Рассмотрим случай если не равное кол-во times и names;

*/

function getRandomNumbers(players) {
  var numbers = [];
  for (var i = 1; i < players; i++) {
    var number = getRandomNumber();
    while (numbers.indexOf(number) !== -1) {
      number = getRandomNumber();
    }
    numbers.push(number);
  }
  return numbers;
}

function getRandomNumber() { // возвращает случайное число от [0.1 до 0.9] c шагом 0.1
  var number = Math.random() * (1 - 0.1) + 0.1; // это магия? Д19
  return number.toFixed(1);
}
/* Function getCoords (x, y) {
  вариант с числами, где четное значение пойдет в х, а нечетное в y - get x, get y
}; */

/* Function getCoords (x, y) {
  вариант со строками, который провалился
}; */

/* Function getCoords (x, y) {
    for (var i = 0; i < RECT_COORDS.length; i++) {
      var x = parseInt(RECT_COORDS[i]);
      var y = parseInt(RECT_COORDS[i].split(', ')[1]);
    ctx.lineTo(x, y);
  }
}; */

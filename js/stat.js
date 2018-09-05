'use strict';

var COORDS = [[100, 10], [330, 22], [520, 10], [500, 110], [520, 280], [250, 267], [100, 280], [116, 160], [100, 10]];
var RECT_SHIFT = [0, 0];
var SHADOW_SHIFT = [10, 10];
var ZERO_POINT_X = 100;
var ZERO_POINT_Y = 10;
var MAX_BAR_HEIGHT = 150;
var MAX_INNER_WIDTH = 420;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var TOP_GAP = 10;
var FONT_GAP = 20;

window.renderStatistics = function (ctx, names, times) {
  renderShape(ctx, COORDS, SHADOW_SHIFT, 'rgba(0, 0, 0, 0.7)');
  renderShape(ctx, COORDS, RECT_SHIFT, '#fff');
  renderText(ctx);
  renderBarChart(ctx, names, times);
};

function renderShape(ctx, coords, shift, colour) {
  ctx.fillStyle = colour;
  ctx.beginPath();
  ctx.moveTo(ZERO_POINT_X, ZERO_POINT_Y);

  for (var i = 0; i < coords.length; i++) {
    var x = coords[i][0] + shift[0];
    var y = coords[i][1] + shift[1];
    ctx.lineTo(x, y);
  }

  ctx.closePath();
  ctx.fill();
}

function renderText(ctx) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура! Вы победили!', ZERO_POINT_X + 20, ZERO_POINT_Y + 3 * TOP_GAP);
  ctx.fillText('Список результатов:', ZERO_POINT_X + 20, ZERO_POINT_Y + 3 * TOP_GAP + FONT_GAP);
}

function renderBarChart(ctx, names, times) {
  var opacities = getRandomNumbers(times.length);
  for (var i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      var shifted = opacities.shift();
      ctx.fillStyle = 'rgba(0, 0, 255, ' + shifted + ')';
    }
    renderBar(ctx, names, times, i);
  }
}

function renderBar(ctx, names, times, index) {
  var maxTime = getMaxElement(times);
  var padding = (MAX_INNER_WIDTH - BAR_WIDTH * times.length - BAR_GAP * (times.length - 1)) / 2;
  var x = ZERO_POINT_X + (BAR_GAP + BAR_WIDTH) * index + padding;
  var y = ZERO_POINT_Y + TOP_GAP * 2 + FONT_GAP * 3;
  var barHeight = MAX_BAR_HEIGHT * times[index] / maxTime;
  var barPaddingTop = MAX_BAR_HEIGHT - barHeight;
  var time = Math.round(times[index]);

  ctx.fillRect(x, y + barPaddingTop, BAR_WIDTH, barHeight);
  ctx.fillStyle = '#000';
  ctx.fillText(names[index], x, y + MAX_BAR_HEIGHT + FONT_GAP);
  ctx.fillText(time, x, y - TOP_GAP / 2 + barPaddingTop);
}

function getMaxElement(array) {
  var maxElement = array[0];
  for (var i = 1; i < array.length; i++) {
    if (array[i] > maxElement) {
      maxElement = array[i];
    }
  }
  return maxElement;
}

function getRandomNumbers(numberOfPlayers) {
  var numbers = [];
  for (var i = 1; i < numberOfPlayers; i++) {
    var number = getRandomNumber();
    while (numbers.indexOf(number) !== -1) {
      number = getRandomNumber();
    }
    numbers.push(number);
  }
  return numbers;
}

function getRandomNumber() {
  var number = Math.random() * 0.9 + 0.1;
  return number.toFixed(1);
}

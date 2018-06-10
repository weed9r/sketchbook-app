(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
  // set canvas id to variable
  var canvas = document.querySelector('.canvas');
  var options = document.querySelector('.options');
  var fin = document.querySelector('#fin');
  var optionCords = [];

  // get canvas 2D context and set it to the correct size
  var ctx = canvas.getContext('2d');
  resize();

  // resize canvas when window is resized
  function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  }

  // add event listeners to specify when functions should be triggered
  window.addEventListener('resize', resize);
  document.addEventListener('mousemove', draw);
  document.addEventListener('mousedown', setPosition);
  document.addEventListener('mouseenter', setPosition);

  fin.addEventListener('click', hideOptions);

  // last known position
  var pos = { x: 0, y: 0 };

  // new position from mouse events
  function setPosition(e) {
    pos.x = e.clientX;
    pos.y = e.clientY;
  }

  function draw(e) {

    if (e.buttons !== 1) {
      return;
    } // if mouse is pressed.....

    showOptions();
    ctx.beginPath(); // begin the drawing path

    ctx.lineWidth = 20; // width of line
    ctx.lineCap = 'round'; // rounded end cap
    ctx.strokeStyle = '#ff0000'; // hex color of line

    ctx.moveTo(pos.x, pos.y); // from position
    setPosition(e);
    ctx.lineTo(pos.x, pos.y); // to position
    ctx.stroke(); // draw it!

    adjustOptions(pos.x, pos.y);
  }

  function adjustOptions(y, x) {
    if (optionCords.length === 0) {
      optionCords = [0, 0, 150, 150];
    }
    if (x - 50 > 0 || x - 50 < optionCords[0]) {
      optionCords[0] = x - 50;
    }
    if (y - 50 > 0 || y - 50 < optionCords[1]) {
      optionCords[1] = y - 50;
    }
    if (x > optionCords[2] - 50) {
      optionCords[2] = x + 50;
    }
    if (y > optionCords[3] - 50) {
      optionCords[3] = y + 50;
    }
    placeOptions();
  }

  function optionsVisible() {
    return options.classList.contains('options--active');
  }

  function showOptions() {
    options.classList.add('options--active');
  }

  function hideOptions() {
    options.classList.remove('options--active');
    optionCords = [];
  }

  function placeOptions() {
    options.style.top = optionCords[0] + 'px';
    options.style.left = optionCords[1] + 'px';
    options.style.height = optionCords[2] - optionCords[0] + 'px';
    options.style.width = optionCords[3] - optionCords[1] + 'px';
  }
})();

},{}]},{},[1])

//# sourceMappingURL=app.bundle.js.map

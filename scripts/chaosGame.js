"use strict";

let canvas = {};
let context = {};
let timer = 0;
let iteration = 0;
let distance = 2;
let startingPointSet = 0;

let currentPosition = {x: 400, y: 400};
let currentPoint = {color: 'green', r: 1, x: 1, y: 1};

let points = [];

window.onload = function() {
    setupCanvas();
    initMouse();
}

function setupCanvas(){
	canvas = document.getElementById("theCanvas");
	context = canvas.getContext('2d');
};

function initMouse() {
    canvas.addEventListener('mousedown', function(evt) {
        if(startingPointSet) {
            let mousePos = getMousePos(canvas, evt);
            const newPoint = {color: 'green', r: 10, x: mousePos.x, y: mousePos.y};
            points.push(newPoint);
            draw(newPoint);
        } else {
            let mousePos = getMousePos(canvas, evt);
            const newPoint = {color: 'green', r: 1, x: mousePos.x, y: mousePos.y};

            currentPoint.x = mousePos.x;
            currentPoint.y = mousePos.y;

            draw(newPoint);
            startingPointSet = 1;
        }
    }, false);
}

function getMousePos(canvas, evt){
        let rect = canvas.getBoundingClientRect(); 
        let root = document.documentElement;
        // return relative mouse position
        let mouseX = Math.floor((evt.clientX - rect.left - root.scrollLeft));
        let mouseY = Math.floor((evt.clientY - rect.top - root.scrollTop));
        return {
            x: mouseX,
            y: mouseY,
            root: root
        };
}

function createShape() {
    let number = getRandomNumber1to2N();
    if (!points.length) {
        stopFunction();
    } else {
        if(isEven(number)) {
            calcNewPosition(points[number/2]);
        } else {
            calcNewPosition(points[Math.floor((number-1)/2)]);
        }
    } 
}

function isEven(number) {
    return !number ? 1 : !(number % 2);
}

function calcNewPosition(point) {
    distance = document.getElementById("distance").value;
    currentPoint.x = ((currentPosition.x * (distance - 1)) / distance) + (point.x / distance);
    currentPoint.y = ((currentPosition.y * (distance - 1)) / distance) + (point.y / distance);
    draw(currentPoint);
    currentPosition.x = currentPoint.x;
    currentPosition.y = currentPoint.y;
}

function draw(point) {
    document.getElementById("iteration").innerHTML = "Iteration: " + iteration++;
    context.beginPath();
    context.arc(point.x, point.y, point.r, 0, 2 * Math.PI, false);
    context.fillStyle = point.color;
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#003300';
    context.stroke();
}

function getRandomNumber1to2N(){
    if(points.length < 2) {
        return 0;
    } else {
        return getRandomInt(0, (points.length*2)-1);
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startFunction(func){
    if(timer == undefined) {
        timer = setInterval(func, 1);
    }
}

function stopFunction(){
    clearInterval(timer);
    timer = undefined;
    document.getElementById("start").innerHTML = "Resume";
}

function restart() {
    stopFunction();
    context.clearRect(0, 0, canvas.width, canvas.height);
    points = [];
    startingPointSet = 0;
    document.getElementById("start").innerHTML = "Start";
    document.getElementById("iteration").innerHTML = "Iteration: 0";
}

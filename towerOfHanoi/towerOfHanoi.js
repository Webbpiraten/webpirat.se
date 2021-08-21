
let canvas;
let context;
let timer;
let iteration = 0;
let starting = 0;
let nrOfDisks = 0;

let pillarOne   = [];
let pillarTwo   = [];
let pillarThree = [];

let currentPillar = pillarOne;

window.onload = function() {
    setupCanvas();
    initPillarsWithDisks();
}

function setupCanvas(){
	canvas = document.getElementById("theCanvas");
	context = canvas.getContext('2d');
};

function initPillarsWithDisks() {   
    nrOfDisks = document.getElementById("disks").value;
    for(let i = 1; i <= nrOfDisks; i++) {
        pillarOne.push({id: i, w: i*20, h: 10});
    }
    console.log(pillarOne);
    drawPillars();
}

function updateNrOfDisks() {
    console.log("updateNrOfDisks");
    clearCanvas()
    pillarOne = [];
    initPillarsWithDisks();
}

function move() {
    let topDisk = currentPillar.shift();

    if(topDisk === undefined) {
        console.log("undefined");
        if(currentPillar === pillarOne) {
            currentPillar = pillarTwo;
        } else if (currentPillar === pillarTwo) {
            currentPillar = pillarThree;
        } else if (currentPillar === pillarThree) {
            currentPillar = pillarOne;
        }
        console.log(currentPillar);
        return;
    }

    if(!pillarTwo.length && currentPillar !== pillarTwo) {
        pillarTwo.push(topDisk);
        drawPillars();
        return;
    } 
    if(!pillarThree.length && currentPillar !== pillarThree) {
        pillarThree.push(topDisk);
        drawPillars();
        return;
    }

}

function drawPillars() {
    clearCanvas();

    pillarOne.forEach(disk => {
        draw(disk, 100)    
    });

    pillarTwo.forEach(disk => {
        draw(disk, 300)    
    });

    pillarThree.forEach(disk => {
        draw(disk, 500)    
    });
}

function draw(disk, offsett) {
    document.getElementById("iteration").innerHTML = "Iteration: " + iteration++;
    context.beginPath();

    context.rect(offsett - disk.w/2, 
                 100 + disk.h * disk.id, 
                 disk.w, 
                 disk.h
                 ); // upperLeftX, upperLeftY

    context.fillStyle = "green";
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#003300';
    context.stroke();
}

function calcNewPosition(disk) {
    distance = document.getElementById("disks").value;
    currentPoint.x = ((currentPosition.x * (distance - 1)) / distance) + (disk.x / distance);
    currentPoint.y = ((currentPosition.y * (distance - 1)) / distance) + (disk.y / distance);
    draw(currentPoint);
    currentPosition.x = currentPoint.x;
    currentPosition.y = currentPoint.y;
}

function startFunction(func){
    if(timer == undefined) {
        timer = setInterval(func, 1000);
    }
}

function stopFunction(){
    clearInterval(timer);
    timer = undefined;
    document.getElementById("start").innerHTML = "Resume";
}

function restart() {
    stopFunction();
    clearCanvas()
    
    pillarOne   = [];
    pillarTwo   = [];
    pillarThree = [];
    
    starting = 0;
    document.getElementById("start").innerHTML = "Start";
    document.getElementById("iteration").innerHTML = "Iteration: 0";
    iteration = 0;

    initPillarsWithDisks();
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("iteration").innerHTML = "Iteration: 0";
    iteration = 0;
}

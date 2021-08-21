
let canvas;
let context;
let timer;
let iteration = 0;
let starting = 0;
let ready = 0;
let speed = 0;
let mode = 0;

let mouseX;
let mouseY;

let col;
let row;
let resolution = 10;

let gridOfCells = [];

window.onload = function() {
    setupEventListeners();
    init();
}

function init() {
    setupCanvas();

    col = canvas.width / resolution;
    row = canvas.height / resolution;

    
    gridOfCells = generateGrid(col, row);
    
    drawGrid(canvas.width, canvas.height, resolution);
    fillCells(gridOfCells, resolution);
}

function setupCanvas(){
    

	canvas = document.getElementById("theCanvas");

    //canvas.width  = canvas.width / resolution;
    //canvas.height = 600;

	context = canvas.getContext('2d');
};

function generateGrid(col, row) {
    let grid = [];
    for(let i = 0; i < col; i++) {
        grid[i] = new Array(row); 
    }
    for(let j = 0; j < grid.length; j++) {
        for(let k = 0; k < grid[j].length; k++) {
            if (mode === 0) {
                grid[j][k] = getRandomInt(0, 1);
            } else {
                grid[j][k] = 0;
            }
            
        }
    }
    ready = 1;
    return grid;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fillCells(grid, resolution){
    document.getElementById("iteration").innerHTML = "Iteration: " + iteration++;
    for(let i = 0; i < col; i++) {
        for(let j = 0; j < row; j++) {

            let x = i * resolution;
            let y = j * resolution;

            if(grid[i][j] === 1) {
                context.fillStyle = "black";
                context.fillRect(x + 1, y + 1, resolution-2, resolution-2);
            } else {
                context.fillStyle = "white";
                context.fillRect(x + 1, y + 1, resolution-2, resolution-2);
            }

        }
    }	
}

function fillCell(){
    let cellValue = gridOfCells[mouseX][mouseY];
    if (cellValue === 0) {
        gridOfCells[mouseX][mouseY] = 1;
    } else {
        gridOfCells[mouseX][mouseY] = 0;
    }
    fillCells(gridOfCells, resolution);
}

function drawGrid(w, h, resolution) {
    context.beginPath(); 
	// Vertical
    for (let x = 0; x <= w; x += resolution) {
            context.moveTo(x, 0);
            context.lineTo(x, h);
    }
    context.lineWidth = 1;
    context.stroke(); 
    context.beginPath(); 
	// Horizontal
    for (let y = 0; y <= h; y += resolution) {
            context.moveTo(0, y);
            context.lineTo(w, y);
    }
    context.lineWidth = 1;
    context.stroke(); 
}

/*
Any live cell with fewer than two live neighbours dies, as if by underpopulation.
Any live cell with two or three live neighbours lives on to the next generation.
Any live cell with more than three live neighbours dies, as if by overpopulation.
Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
*/
function generateNextGeneration() {

    fillCells(gridOfCells, resolution);

    let nextGeneration = generateGrid(col, row);

    for(let x = 0; x < gridOfCells.length; x++) {
        for(let y = 0; y < gridOfCells[x].length; y++) {
            let state = gridOfCells[x][y];

            let sum = countNeighbours(gridOfCells, x, y);

            if(state === 0 && sum === 3) {
                nextGeneration[x][y] = 1;
            } else if(state === 1 && (sum < 2 || sum > 3)) {
                nextGeneration[x][y] = 0;
            } else {
                nextGeneration[x][y] = state;
            }
        }
    }
    gridOfCells = nextGeneration;
}

function countNeighbours(grid, x, y) {
    //console.log("x: " + x + " , " + "y: " + y);
    let sum = 0;
    for(let i = -1; i < 2; i++) {
        if(grid[x+i] !== undefined) {
            for(let j = -1; j < 2; j++) {
                let value = grid[x+i][y+j];
                if(value !== undefined) {
                    sum += value;
                }
            }
        }
    }
    sum -= grid[x][y]
    return sum;
}

function startFunction(func){
    //document.getElementById("theCanvas").removeAttribute("hidden");
    speed = document.getElementById("speed").value;
    if(timer == undefined) {
        timer = setInterval(func, speed);
    }
}

function stopFunction(){
    clearInterval(timer);
    timer = undefined;
    document.getElementById("start").innerHTML = "Resume";
}

function restart() {
    stopFunction();
    clearCanvas();

    gridOfCells = [];

    starting = 0;
    document.getElementById("start").innerHTML = "Start";
    document.getElementById("iteration").innerHTML = "Iteration: 0";
    iteration = 0;

    init();
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("iteration").innerHTML = "Iteration: 0";
    iteration = 0;
}

function setupEventListeners() {
    let modeSelect = document.getElementById("mode");
    modeSelect.addEventListener("change", function() {
        let value = document.getElementById("mode").value;

        if (value === "0") {
            console.log("random");
            mode = 0;
            restart();
        } else {
            mode = 1;
            restart();
        }
    });

    let canvas = document.getElementById("theCanvas");
    /*
    canvas.addEventListener('mousedown', function(event) { 
        getMousePos(event);
        fillCell();
    });
    */
    canvas.addEventListener('click', function(event) { 
        getMousePos(event);
        fillCell();
    });
}

function getMousePos(event){
    let canvas = document.getElementById("theCanvas");
	let rect = canvas.getBoundingClientRect(); 
	root = document.documentElement;
    // return relative mouse position
    mouseX = Math.floor((event.clientX - rect.left - root.scrollLeft)/resolution);
    mouseY = Math.floor((event.clientY - rect.top - root.scrollTop)/resolution);
    //console.log("X: " + mouseX + ", Y: " + mouseY);

}

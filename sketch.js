var grid;
var newGrid;
var cols;
var rows;
let resolution = 5;
let fpsSlider;

const MIN_FPS = 0;
const MAX_FPS = 60;
const DEFAULT_FPS = 30;

const create2DArray = (cols, rows) => {
    let arr = new Array(cols);
    for (let i = 0; i < cols; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

const countNearbyLives = (i, j) => {
    let lives = 0;
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            if (i + x >= 0 && i + x < cols && j + y >= 0 && j + y < rows) {
                if (!(x == 0 && y == 0)) {
                    lives += grid[i + x][j + y];
                }
            }
        }
    }
    return lives;
}

const gridFillRandom = () => {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }  
}

const updateFrameRate = () => {
    fpsSliderValue = fpsSlider.value();
    frameRate(fpsSliderValue);
}


function setup() {
    createCanvas(1200, 800);
    textSize(15);
    noStroke();

    cols = width / resolution;
    rows = height / resolution;

    grid = create2DArray(cols, rows);
    gridFillRandom();

    fpsSlider = createSlider(MIN_FPS, MAX_FPS, DEFAULT_FPS, 1);
    fpsSlider.position(20, 20);
    frameRate(DEFAULT_FPS);
}

function draw() {
    console.time()
    updateFrameRate();
    
    text('red', fpsSlider.x * 2 + fpsSlider.width, 35);
    fillGrid();

    newGrid = create2DArray(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

            let current = grid[i][j];
            let neighbours = countNearbyLives(i, j);

            if (current == 0 && neighbours == 3) {
                newGrid[i][j] = 1;
            } else if (current == 1 && (neighbours < 2 || neighbours > 3)) {
                newGrid[i][j] = 0;
            } else {
                newGrid[i][j] = current;
            }
        }
    }

    grid = newGrid;
    console.timeEnd()
}

function fillGrid() {
    background(0);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] == 1) {
                fill(255);
            } else {
                fill(0);
            }
            rect(x, y, resolution, resolution);
        }
    }
}
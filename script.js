const levels = [
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    // Additional levels can be added here
];

let currentLevel = 0;
let player = { x: 1, y: 1 };
let goal = { x: 8, y: 8 };
let score = 0;
let timer = 0;
let interval;

function createMaze() {
    const maze = document.getElementById("maze");
    maze.innerHTML = ""; // Clear the maze content before rendering
    const mazeLayout = levels[currentLevel];

    for (let row = 0; row < mazeLayout.length; row++) {
        for (let col = 0; col < mazeLayout[row].length; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            if (mazeLayout[row][col] === 1) {
                cell.classList.add("wall");
            } else if (player.x === col && player.y === row) {
                cell.classList.add("player");
            } else if (goal.x === col && goal.y === row) {
                cell.classList.add("goal");
            } else {
                cell.classList.add("path");
            }
            maze.appendChild(cell);
        }
    }
}

function movePlayer(event) {
    const { x, y } = player;
    const mazeLayout = levels[currentLevel];

    switch (event.key) {
        case "ArrowUp":
            if (mazeLayout[y - 1][x] === 0) player.y--;
            break;
        case "ArrowDown":
            if (mazeLayout[y + 1][x] === 0) player.y++;
            break;
        case "ArrowLeft":
            if (mazeLayout[y][x - 1] === 0) player.x--;
            break;
        case "ArrowRight":
            if (mazeLayout[y][x + 1] === 0) player.x++;
            break;
    }
    createMaze();
    checkGoal();
}

function checkGoal() {
    if (player.x === goal.x && player.y === goal.y) {
        clearInterval(interval);
        score += Math.max(100 - timer, 0);
        alert(`Congratulations! You reached the goal!\nTime: ${timer}s\nScore: ${score}`);

        if (currentLevel < levels.length - 1) {
            currentLevel++;
            player = { x: 1, y: 1 };
            startLevel();
        } else {
            alert(`You've completed all levels! Final Score: ${score}`);
            resetGame();
        }
    }
}

function startLevel() {
    document.getElementById("level").innerText = `Level: ${currentLevel + 1}`;
    timer = 0;
    interval = setInterval(() => {
        timer++;
        document.getElementById("timer").innerText = `Time: ${timer}s`;
    }, 1000);
    createMaze();
}

function resetGame() {
    currentLevel = 0;
    score = 0;
    player = { x: 1, y: 1 };
    startLevel();
}

document.addEventListener("keydown", movePlayer);

resetGame();

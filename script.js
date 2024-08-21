const mazeLayout = [
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
];

const player = { x: 1, y: 1 };
const goal = { x: 8, y: 8 };

function createMaze() {
    const maze = document.getElementById("maze");
    maze.innerHTML = ""; // Clear the maze content before rendering
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
        alert("Congratulations! You reached the goal!");
        player.x = 1;
        player.y = 1;
        createMaze();
    }
}

document.addEventListener("keydown", movePlayer);

createMaze();

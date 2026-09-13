import { Board, BOARD_SIZE } from "./board.js";
import { Game } from "./game.js"

const boardElement = document.querySelector("#board");
const turnElement = document.querySelector("#turn");
const blackCountElement = document.querySelector("#black-count");
const whiteCountElement = document.querySelector("#white-count")
const gameMessageElement = document.querySelector("#game-message");
const resetButton = document.querySelector("#reset-button");

const board = new Board();
const game = new Game(board);

for (let row = 0; row < BOARD_SIZE; row++) {
    for (let column = 0; column < BOARD_SIZE; column++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        cell.dataset.row = row;
        cell.dataset.column = column;

        cell.addEventListener("click", (event) => {
            const row = Number(event.currentTarget.dataset.row);
            const column = Number(event.currentTarget.dataset.column);

            const result = game.play(row, column);

            if (!result.success) {
                return;
            }

            cell.classList.remove("preview-black", "preview-white");

            render();
            renderGameStatus(result);
        });

        cell.addEventListener("mouseenter", () => {
            const row = Number(cell.dataset.row);
            const column = Number(cell.dataset.column);

            if (game.canPlace(row, column)) {
                if (game.isValidMove(row, column)) {
                    cell.classList.add(`preview-${game.currentPlayer}`);
                }
            }
        })
        cell.addEventListener("mouseleave", () => {
            cell.classList.remove("preview-black", "preview-white");
        })
        boardElement.appendChild(cell);
    }
}

resetButton.addEventListener("click", () => {
    game.reset();
    gameMessageElement.textContent = "";
    gameMessageElement.style.display = "none";
    render();
})

render();

// ---------------------
// Functions
// ---------------------
function renderBoard() {
    const cells = boardElement.querySelectorAll(".cell");

    for (let row = 0; row < board.cells.length; row++) {
        for (let column = 0; column < board.cells[row].length; column++) {
            const index = row * board.cells[row].length + column;
            const cell = cells[index];

            cell.classList.remove("black", "white");

            const disk = board.cells[row][column];

            if (disk === "black") {
                cell.classList.add("black");
            }
            if (disk === "white") {
                cell.classList.add("white");
            }
        }
    }
}

function renderTurn() {
    const player = 
        game.currentPlayer.charAt(0).toUpperCase()
        + game.currentPlayer.slice(1);
    turnElement.textContent = `${player}`;
}

function renderDiskCount() {
    const counts = board.countDisks();

    blackCountElement.textContent = counts.black;
    whiteCountElement.textContent = counts.white;
}

function renderGameStatus(result) {
    if (result.status === "pass") {
        gameMessageElement.textContent =
            `${result.player} has no valid moves.`;
    }

    if (result.status === "gameover") {
        const counts = board.countDisks();

        if (counts.black > counts.white) {
            gameMessageElement.textContent = "Black wins!";
        } else if (counts.white > counts.black) {
            gameMessageElement.textContent = "white wins!";
        } else {
            gameMessageElement.textContent = "Draw!";
        }

        gameMessageElement.style.display = "block";
    }
}
function render() {
    renderBoard();
    renderTurn();
    renderDiskCount();
}

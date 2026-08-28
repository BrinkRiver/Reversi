import { Board, BOARD_SIZE } from "./board.js";

const boardElement = document.querySelector("#board");

const board = new Board();

for (let row = 0; row < BOARD_SIZE; row++) {
    for (let column = 0; column < BOARD_SIZE; column++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        boardElement.appendChild(cell);
    }
}

function renderBoard() {
    const cells = boardElement.querySelectorAll(".cell");

    for (let row = 0; row < board.cells.length; row++) {
        for (let column = 0; column < board.cells[row].length; column++) {
            const index = row * board.cells[row].length + column;
            const cell = cells[index];

            const disk = board.cells[row][column];

            if (disk === "black") {
                cell.classList.add("black");
            }
            if (disk === "white") {
                cell.classList.add("white");
            }
        }
    }
    console.log(board.cells);
}
renderBoard();
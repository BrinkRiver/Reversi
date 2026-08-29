import { Board, BOARD_SIZE } from "./board.js";
import { Game } from "./game.js"

const boardElement = document.querySelector("#board");

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

           if (game.play(row, column)) {
                renderBoard();
           }
        });
        boardElement.appendChild(cell);
    }
}

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
    console.log(board.cells);
}
renderBoard();
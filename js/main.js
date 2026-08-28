const boardElement = document.querySelector("#board");

const BOARD_SIZE = 8;

for (let row = 0; row < BOARD_SIZE; row++) {
    for (let column = 0; column < BOARD_SIZE; column++) {
        const cell = document.createElement("div");
        cell.classList.add("cell")

        boardElement.appendChild(cell);
    }
}
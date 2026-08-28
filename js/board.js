export const BOARD_SIZE = 8;

export class Board {

    constructor() {
        this.cells = [];

        this.createBoard();
        this.setupInitialPosition();
    }

    createBoard() {
        const BOARD_SIZE = 8;

        for (let row = 0; row < BOARD_SIZE; row++) {
            const line = [];

            for (let column = 0; column < BOARD_SIZE; column++) {
                line.push(null);
            }

            this.cells.push(line);
        }
    }

    setupInitialPosition() {
        const center = BOARD_SIZE / 2;

        this.cells[center - 1][center - 1] = "white";
        this.cells[center - 1][center] = "black";
        this.cells[center    ][center - 1] = "black";
        this.cells[center    ][center] = "white";
    }
}
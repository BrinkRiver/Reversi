export const BOARD_SIZE = 8;

const DIRECTIONS = [
    [-1, -1],
    [-1,  0],
    [-1,  1],
    [0,  -1],
    [0,   1],
    [1,  -1],
    [1,   0],
    [1,   1]
];

export class Board {

    constructor() {
        this.cells = Array.from(
            { length: BOARD_SIZE },
            () => Array(BOARD_SIZE).fill(null)
        );

        this.setupInitialPosition();
    }

    setupInitialPosition() {
        const center = BOARD_SIZE / 2;

        this.cells[center - 1][center - 1] = "white";
        this.cells[center - 1][center    ] = "black";
        this.cells[center    ][center - 1] = "black";
        this.cells[center    ][center    ] = "white";
    }

    placeDisk(row, column, color) {
        this.cells[row][column] = color;

        const disksToFlip = this.getFlippableDisks(row, column, color);

        for (const [diskRow, diskColumn] of disksToFlip) {
            this.cells[diskRow][diskColumn] = color;
        }
    }

    isEmpty(row, column) {
        return this.cells[row][column] === null;
    }

    isInsideBoard(row, column) {
        return (
            row >= 0
            && row < BOARD_SIZE
            && column >= 0
            && column < BOARD_SIZE
        );
    }

    isValidMove(row, column, color) {
        return this.getFlippableDisks(row, column, color).length > 0;
    }

    getOpponent(color) {
        return color === "black" ? "white" : "black";
    }

    getFlippableDisks(row, column, color) {
        const opponent = this.getOpponent(color);

        const disksToFlip = [];

        for (const [rowDirection, columnDirection] of DIRECTIONS) {
            let currentRow = row + rowDirection;
            let currentColumn = column + columnDirection;

            const disksInDirection = [];

            while (this.isInsideBoard(currentRow, currentColumn)) {
                const disk = this.cells[currentRow][currentColumn];

                if (disk === opponent) {
                    disksInDirection.push([
                        currentRow,
                        currentColumn
                    ]);
                } else if (disk === color) {
                    if (disksInDirection.length > 0) {
                        disksToFlip.push(...disksInDirection);
                    }
                    break;
                } else {
                    break;
                }

                currentRow += rowDirection;
                currentColumn += columnDirection;
            }
        }

        return disksToFlip;
    }

    countDisks() {
        const cells = this.cells.flat();


        const whiteCount = cells.filter(
            cell => cell === "white"
        ).length;

        return {
            black: cells.filter(cell => cell === "black").length,
            white: cells.filter(cell => cell === "white").length,
        };
    }
}
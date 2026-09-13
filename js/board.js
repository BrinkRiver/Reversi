export const BOARD_SIZE = 8;
export const PLAYER = {
    BLACK: "black",
    WHITE: "white",
};

const DIRECTIONS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];

export class Board {
    constructor() {
        this.setupInitialPosition();
    }

    setupInitialPosition() {
        this.cells = Array.from({ length: BOARD_SIZE }, () =>
            Array(BOARD_SIZE).fill(null),
        );

        const center = BOARD_SIZE / 2;

        this.cells[center - 1][center - 1] = PLAYER.WHITE;
        this.cells[center - 1][center] = PLAYER.BLACK;
        this.cells[center][center - 1] = PLAYER.BLACK;
        this.cells[center][center] = PLAYER.WHITE;
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
            row >= 0 && row < BOARD_SIZE && column >= 0 && column < BOARD_SIZE
        );
    }

    isValidMove(row, column, color) {
        return (
            this.isEmpty(row, column) &&
            this.getFlippableDisks(row, column, color).length > 0
        );
    }

    getOpponent(color) {
        return color === PLAYER.BLACK ? PLAYER.WHITE : PLAYER.BLACK;
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
                    disksInDirection.push([currentRow, currentColumn]);
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

        const whiteCount = cells.filter((cell) => cell === PLAYER.WHITE).length;

        return {
            black: cells.filter((cell) => cell === PLAYER.BLACK).length,
            white: cells.filter((cell) => cell === PLAYER.WHITE).length,
        };
    }

    reset() {
        this.setupInitialPosition();
    }

    remainValidMove(color) {
        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let column = 0; column < BOARD_SIZE; column++) {
                if (this.isValidMove(row, column, color)) {
                    return true;
                }
            }
        }

        return false;
    }
}

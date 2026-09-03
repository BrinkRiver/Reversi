export class Game {
    constructor(board) {
        this.board = board;
        this.currentPlayer = "black";
    }

    play(row, column) {
        if (!this.board.isValidMove(row, column, this.currentPlayer)) {
            return false;
        }

        this.board.placeDisk(row, column, this.currentPlayer);

        this.switchPlayer();

        return true;
    }

    switchPlayer() {
        if (this.currentPlayer === "black") {
            this.currentPlayer = "white";
        } else {
            this.currentPlayer = "black";
        }
    }

    reset() {
        this.board.reset();
        this.currentPlayer = "black";
    }
}
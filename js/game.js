export class Game {
    constructor(board) {
        this.board = board;
        this.currentPlayer = "black";
        this.gameOver = false;
    }

    play(row, column) {
        if (this.gameOver) {
            return { success: false};
        }

        if (!this.board.isValidMove(row, column, this.currentPlayer)) {
            return { success: false};
        }

        this.board.placeDisk(row, column, this.currentPlayer);

        const nextPlayer = this.getNextPlayer();

        if (this.board.remainValidMove(nextPlayer)) {
            this.currentPlayer = nextPlayer;
            return {
                success: true,
                status: "normal",
            }
        }

        if (this.board.remainValidMove(this.currentPlayer)) {
            return {
                success: true,
                status: pass,
                player: nextPlayer
            }
        }

        this.gameOver = true;

        return {
            success: true,
            status: "gameover",
        }
    }

    getNextPlayer() {
        if (this.currentPlayer === "black") {
            return "white";
        } else {
            return "black";
        }
    }

    reset() {
        this.board.reset();
        this.currentPlayer = "black";
        this.gameOver = false;
    }

    isValidMove(row, column) {
        return this.board.isValidMove(
            row,
            column,
            this.currentPlayer
        )
    }

    canPlace(row, column) {
        return this.board.isEmpty(row, column);
    }
}
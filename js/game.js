import { PLAYER } from "./board.js";

export const GAME_STATUS = {
    NORMAL: "normal",
    PASS: "pass",
    GAME_OVER: "gameover",
    INVALID: "invalid",
};

export class Game {
    constructor(board) {
        this.board = board;
        this.currentPlayer = PLAYER.BLACK;
        this.gameOver = false;
    }

    play(row, column) {
        if (this.gameOver) {
            return {
                status: GAME_STATUS.INVALID,
                player: this.currentPlayer,
            };
        }

        if (!this.board.isValidMove(row, column, this.currentPlayer)) {
            return {
                status: GAME_STATUS.INVALID,
                player: this.currentPlayer,
            };
        }

        this.board.placeDisk(row, column, this.currentPlayer);

        const nextPlayer = this.getNextPlayer();

        if (this.board.remainValidMove(nextPlayer)) {
            this.currentPlayer = nextPlayer;
            return {
                status: GAME_STATUS.NORMAL,
                player: this.currentPlayer,
            };
        }

        if (this.board.remainValidMove(this.currentPlayer)) {
            return {
                status: GAME_STATUS.PASS,
                player: nextPlayer,
            };
        }

        this.gameOver = true;

        return {
            status: GAME_STATUS.GAME_OVER,
            player: nextPlayer,
        };
    }

    getNextPlayer() {
        if (this.currentPlayer === PLAYER.BLACK) {
            return PLAYER.WHITE;
        } else {
            return PLAYER.BLACK;
        }
    }

    reset() {
        this.board.reset();
        this.currentPlayer = PLAYER.BLACK;
        this.gameOver = false;
    }

    isValidMove(row, column) {
        return this.board.isValidMove(row, column, this.currentPlayer);
    }

    canPlace(row, column) {
        return this.board.isEmpty(row, column);
    }
}

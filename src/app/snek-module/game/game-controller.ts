import { Board } from "../board/board";
import { Snake } from "../player/player";

export class GameController {
    private player: Snake;
    public board: Board;

    private _gameRunning = false;
    public get gameRunning() { return this._gameRunning; }

    gameIntervalId: number;

    // game settings 
    readonly numCellsWide = 17;
    readonly updateFreqMs = 150;
    readonly arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

    constructor(drawCtx: CanvasRenderingContext2D, boardSizePx: number) {
        this.board = new Board(drawCtx, this.numCellsWide, boardSizePx);
        this.player = new Snake(drawCtx, this);
        this.player.deathSubject.subscribe(() => {
            console.log("deathsubject trigger");
            this.gameOver();
        });

        this.setUpKeyboardListener();
    }

    startUpdateLoop() {
        this.gameIntervalId = window.setInterval(() => this.doGameUpdate(), this.updateFreqMs);
    }

    public draw(timeDeltaS: number) {
        this.board.draw(timeDeltaS);
        this.player.draw(timeDeltaS);
    }

    private startGame() {
        this.player.resetForStart();
        this._gameRunning = true;
        this.startUpdateLoop();
    }

    private doGameUpdate() {
        this.player.update();
    }

    private gameOver() {
        console.log("gameover");
        this._gameRunning = false;
        window.clearInterval(this.gameIntervalId);
    }

    private setUpKeyboardListener() {
        window.addEventListener('keydown', this.onKeyDown.bind(this));
    }
    private onKeyDown(e: KeyboardEvent) {
        if (!this.gameRunning && this.arrowKeys.includes(e.key))
            this.startGame();

        if (this.gameRunning)
            this.player.onKeyDown(e);
    }

    public onFoodEaten() {
        // spawn a new food

        // increment points

    }
}
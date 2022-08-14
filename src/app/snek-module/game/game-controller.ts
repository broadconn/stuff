import { Board } from "../board/board";
import { FoodDispenser } from "../food/food-dispenser";
import { Snake } from "../player/player";

export class GameController {
    public player: Snake;
    public board: Board;
    private food: FoodDispenser;

    score: number = 0;

    private _gameState: GameState = GameState.MainMenu;
    public get gameState() { return this._gameState; }
    public get onMainMenu() { return this._gameState == GameState.MainMenu; }
    public get isPlaying() { return this._gameState == GameState.Playing; }
    public get isGameOver() { return this._gameState == GameState.GameOver; }

    gameIntervalId: number;

    // game settings 
    readonly numCellsWide = 17;
    readonly updateFreqMs = 200;
    readonly arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    readonly spaceCode = "Space";

    constructor(drawCtx: CanvasRenderingContext2D, boardSizePx: number) {
        this._gameState = GameState.MainMenu;

        this.board = new Board(drawCtx, this.numCellsWide, boardSizePx);
        this.food = new FoodDispenser(drawCtx, this);
        this.player = new Snake(drawCtx, this);
        this.player.deathSubject.subscribe(() => {
            this.gameOver();
        });

        this.setUpKeyboardListener();
    }

    private setUpKeyboardListener() {
        window.addEventListener('keydown', this.onKeyDown.bind(this));
    }
    private onKeyDown(e: KeyboardEvent) {
        switch (this.gameState) {
            case GameState.Playing:
                this.player.onKeyDown(e);
                break;
            case GameState.MainMenu:
                if (this.arrowKeys.includes(e.key))
                    this.startGame(e);
                break;
            case GameState.GameOver:
                if (e.code == this.spaceCode)
                    this.goToMainMenu();
                break;
        }
    }

    public draw(timeDeltaS: number) {
        this.board.draw(timeDeltaS);
        this.player.draw(timeDeltaS);
    }

    private startGame(e: KeyboardEvent) {
        this.player.resetForStart();
        this.player.onKeyDown(e);
        this._gameState = GameState.Playing;
        this.startUpdateLoop();
    }

    startUpdateLoop() {
        this.gameIntervalId = window.setInterval(() => this.doGameUpdate(), this.updateFreqMs);
    }

    private doGameUpdate() {
        this.player.update();
    }

    private gameOver() {
        this._gameState = GameState.GameOver;
        window.clearInterval(this.gameIntervalId);
    }

    private goToMainMenu() {
        this._gameState = GameState.MainMenu;
        this.player.resetForStart();
        this.score = 0;
    }

    public onFoodEaten() {
        // spawn a new food
        this.food.spawnNewFood();

        // increment points
        this.score++;
    }
}

enum GameState {
    MainMenu,
    Playing,
    GameOver
}

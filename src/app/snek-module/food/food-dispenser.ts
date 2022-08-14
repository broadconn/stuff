import { GameController } from "../game/game-controller";
import { MyMath, Vector2 } from "../utils/utils";

export class FoodDispenser {
    private foods: Food[] = [];

    constructor(private gameControl: GameController, private drawCtx: CanvasRenderingContext2D) { }

    public spawnNewPrey(): Food {
        let cell = this.getFreeBoardCell();
        let food = new Food(cell);
        this.foods.push(food);
        return food;
    }

    private getFreeBoardCell(): Vector2 {
        let freeCells = this.gameControl.board.getUnoccupiedCells();
        let freeCell = freeCells[Math.floor(freeCells.length * Math.random())];
        return freeCell;
    }

    public reset() {
        this.foods = [];
    }

    public draw(timeDelta: number) {
        for (let food of this.foods) {
            if (!food.enabled) continue;
            let bounceSpeed = 200;
            let spinSpeed = 5;
            this.drawCtx.fillStyle = `rgb(0,150,180)`;

            let maxWidth = this.gameControl.board.cellWidthPx / 2.1;
            let minWidth = this.gameControl.board.cellWidthPx / 2.5;
            let scalePerc = Math.sin(food.timeAlive() / bounceSpeed);
            let spawnPerc = food.getSpawnScalePerc();
            let width = MyMath.lerp(minWidth, maxWidth, scalePerc) * spawnPerc;
            let x = this.gameControl.board.getBoardPos(food.cell.x) - width / 2;
            let y = this.gameControl.board.getBoardPos(food.cell.y) - width / 2;

            // rect rotation... dunno why this works but whatevs man
            let halfWidth = width / 2;
            this.drawCtx.save();
            this.drawCtx.translate(x + halfWidth, y + halfWidth);
            this.drawCtx.rotate((food.timeAlive() / spinSpeed) * Math.PI / 180);
            this.drawCtx.fillRect(-halfWidth, -halfWidth, width, width);
            this.drawCtx.restore();
        }
    }
}

export class Food {
    private spawnSpeed = 400;

    private _enabled = true;
    public get enabled() { return this._enabled; };
    private wasEaten = false;
    public cell: Vector2;
    public timeCreated: number;
    public timeEaten: number;

    constructor(cell: Vector2) {
        this.cell = cell;
        this.timeCreated = Date.now();
    }

    public timeAlive(): number {
        return Date.now() - this.timeCreated;
    }

    public timeSinceEaten(): number {
        return Date.now() - this.timeEaten;
    }

    public getEaten() {
        this.wasEaten = true;
        this.timeEaten = Date.now();
    }

    public getSpawnScalePerc() {
        let spawnScale01 = Math.min(1.0, this.timeAlive() / this.spawnSpeed);
        let despawnScale01 = 1;

        if (this.wasEaten) {
            despawnScale01 = 1 - (Math.min(1.0, (Math.max(0, this.timeSinceEaten() / this.spawnSpeed))));
            if (despawnScale01 == 0) this._enabled = false;
        }

        return spawnScale01 * despawnScale01;
    }
}
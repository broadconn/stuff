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
            let x = this.gameControl.board.getBoardPos(food.cell.x);
            let y = this.gameControl.board.getBoardPos(food.cell.y);

            let maxRadius = this.gameControl.board.cellWidthPx / 3;
            let minRadius = this.gameControl.board.cellWidthPx / 5;
            let animPerc = Math.abs(Math.sin(Date.now() / 100));
            let spawnPerc = Math.min(1.0, (Date.now() - food.timeCreated) / 400);
            let radius = MyMath.lerp(minRadius, maxRadius, animPerc) * spawnPerc;

            this.drawCtx.fillStyle = `rgb(0,150,180)`;
            this.drawCtx.beginPath();
            this.drawCtx.arc(x, y, radius, 0, 2 * Math.PI)
            this.drawCtx.fill();
        }
    }
}

export class Food {
    public enabled = true;
    public cell: Vector2;
    public timeCreated: number;
    constructor(cell: Vector2) {
        this.cell = cell;
        this.timeCreated = Date.now();
    }
}
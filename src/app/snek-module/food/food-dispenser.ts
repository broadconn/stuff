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
            let spawnSpeed = 400;
            let bounceSpeed = 200;
            let spinSpeed = 5;
            this.drawCtx.fillStyle = `rgb(0,150,180)`;

            let maxRadius = this.gameControl.board.cellWidthPx / 2.1;
            let minRadius = this.gameControl.board.cellWidthPx / 2.5;
            let scalePerc = Math.sin(food.timeAlive() / bounceSpeed);
            let spawnPerc = Math.min(1.0, food.timeAlive() / spawnSpeed);
            let width = MyMath.lerp(minRadius, maxRadius, scalePerc) * spawnPerc;
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
    public enabled = true;
    public cell: Vector2;
    public timeCreated: number;
    constructor(cell: Vector2) {
        this.cell = cell;
        this.timeCreated = Date.now();
    }
    public timeAlive(): number {
        return Date.now() - this.timeCreated;
    }
}
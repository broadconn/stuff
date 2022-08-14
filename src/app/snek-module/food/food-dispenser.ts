import { GameController } from "../game/game-controller";
import { Vector2 } from "../utils/utils";

export class FoodDispenser {
    constructor(private drawCtx: CanvasRenderingContext2D, private gameControl: GameController) { }

    public spawnNewFood() {
        // get free location from the board, that isn't occupied by a player
    }

    public draw() {

    }
}

class Food {
    private cell: Vector2;
    constructor(cell: Vector2) {

    }
}
import { Vector2 } from "../utils/vector2";

// The movement style this class enacts goes like this:
// There are two movement request slots, one for the x axis, one for the y axis.
// These can each hold -1, 0, or 1. 
// 0 means no request, otherwise a direction on that axis has been requested. 
// The player can have both slots queued up. This allows for easy U-turns.
// The processor will consume both requests accordingly with respect to the current direction
// The processor will also ensure to not queue a direction request along the current axis, unless the other axis has already been requested. 
// Otherwise unexpected movements occur.
export class PlayerMovementProcessor {
    private directionRequests = new Vector2();
    private currentDirection = Vector2.zero();

    constructor() {
        this.setupKeyListeners();
    }

    private setupKeyListeners() {
        window.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    private onKeyDown(e: KeyboardEvent) {
        let keyDir = this.arrowKeyToDirection(e.key);

        // if the key is an x axis request, don't add it to the requests if we are moving on the x axis unless there is already a y axis request
        if (keyDir.x != 0 && (this.notMoving() || this.movingOnYAxis() || this.directionRequests.y != 0)) {
            this.directionRequests.x = keyDir.x;
        }
        // if the key is a y axis request, don't add it to the requests if we are moving on the y axis unless there is already an x axis request
        if (keyDir.y != 0 && (this.notMoving() || this.movingOnXAxis() || this.directionRequests.x != 0)) {
            this.directionRequests.y = keyDir.y;
        }
    }

    private arrowKeyToDirection(key: string): Vector2 {
        switch (key) {
            case "ArrowUp":
                return Vector2.up();
            case "ArrowDown":
                return Vector2.down();
            case "ArrowLeft":
                return Vector2.left();
            case "ArrowRight":
                return Vector2.right();
            default:
                return Vector2.zero();
        }
    }

    public updateDirection(): Vector2 {
        return this.currentDirection = this.checkForNewDirection();
    }

    private checkForNewDirection(): Vector2 {
        // at the start of the game the player has no axis; allow any direction request
        let requestedDirection = this.consumeRequestedDirection(this.notMoving());

        // if no direction requested, return current direction.
        if (requestedDirection.equals(Vector2.zero()))
            return this.currentDirection;

        return requestedDirection;
    }

    private consumeRequestedDirection(ignoreCurrentDirection: boolean): Vector2 {
        // if we are moving on the x axis, check for y axis requests
        if (this.movingOnXAxis() || ignoreCurrentDirection) {
            if (this.directionRequests.y != 0) {
                let requestedDir = new Vector2(0, this.directionRequests.y);
                this.directionRequests.y = 0; //consume >:D
                return requestedDir;
            }
        }

        // if we are moving on the y axis, check for x axis requests
        if (this.movingOnYAxis() || ignoreCurrentDirection) {
            if (this.directionRequests.x != 0) {
                let requestedDir = new Vector2(this.directionRequests.x, 0);
                this.directionRequests.x = 0; //consume >:D
                return requestedDir;
            }
        }

        return Vector2.zero();
    }

    private notMoving(): boolean {
        return this.currentDirection.equals(Vector2.zero());
    }

    private movingOnXAxis(): boolean {
        return this.currentDirection.x != 0;
    }

    private movingOnYAxis(): boolean {
        return this.currentDirection.y != 0;
    }
}
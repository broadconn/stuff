import { Vector2 } from "../utils/Vector2";

export class PlayerMovementProcessor {
    private readonly keysRecognised: string[] = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
    private _keysPressed: string[] = [];

    private moveDirection: Vector2 = new Vector2(0, 0);

    constructor() {
        this.setupKeyListeners();
    }

    private setupKeyListeners() {
        window.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    private onKeyDown(e: KeyboardEvent) {
        //add the pressed key to the list of keys pressed
        if (this.keysRecognised.indexOf(e.key) >= 0 && this._keysPressed.indexOf(e.key) < 0) {
            this._keysPressed.push(e.key);
        }
        //console.log(this._keysPressed);
    }

    public getMoveDirection(): Vector2 {
        this.moveDirection = this.checkForNewMoveDirection();
        return this.moveDirection
    }

    private checkForNewMoveDirection(): Vector2 {
        let requestedDirection = this.getRequestedDirection();
        this._keysPressed = []; // clear key queue

        // start of the game, allow any direction
        if (this.moveDirection.x == 0 && this.moveDirection.y == 0)
            return requestedDirection;

        // no input, dont change dir
        if (requestedDirection.x == 0 && requestedDirection.y == 0)
            return this.moveDirection;

        // dont allow moving backwards
        if (!this.directionChangeIsValid(requestedDirection))
            return this.moveDirection;

        return requestedDirection;
    }

    // to improve: it's easy to accidentally press a key too early, then overwrite it with your next move resulting in no direction change. This feels bad and is annoying. 
    // suggestion: save the time pressed along with the key. 
    //      make the threshold for which key it picks be something like within 0.1s of the update
    //      move any other keys pressed after that to the next update's key queue
    private getRequestedDirection(): Vector2 {
        let latestKey = this._keysPressed.length == 0 ? "" : this._keysPressed[this._keysPressed.length - 1]; // get last key in the list
        switch (latestKey) {
            case "ArrowUp":
                return new Vector2(0, -1);
            case "ArrowDown":
                return new Vector2(0, 1);
            case "ArrowLeft":
                return new Vector2(-1, 0);
            case "ArrowRight":
                return new Vector2(1, 0);
            default:
        }
        return new Vector2(0, 0);
    }

    private directionChangeIsValid(requestDir: Vector2): boolean {
        return this.moveDirection.x == 0 && requestDir.x != 0   // if we're moving along y, the request must be along x
            || this.moveDirection.x != 0 && requestDir.x == 0;  // if we're moving along x, the request must be along y 
    }
}
import { Vector2 } from "../utils/Vector2";

export class PlayerMovementProcessor {
    private readonly keysRecognised: string[] = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
    private _keysPressed: string[] = [];
    public get keysPressed(): string[] { return this._keysPressed; }

    private moveDirection: Vector2 = new Vector2(0, 0);

    constructor() {
        this.setupKeyListeners();
    }

    private setupKeyListeners() {
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    //adds the pressed key to the list of keys pressed
    private onKeyDown(e: KeyboardEvent) {
        if (this.keysRecognised.indexOf(e.key) >= 0 && this._keysPressed.indexOf(e.key) < 0) {
            this._keysPressed.push(e.key);
        }
        console.log(this._keysPressed);
    }

    //removes the released key from the list of keys pressed
    private onKeyUp(e: KeyboardEvent) {
        if (this.keysRecognised.indexOf(e.key) >= 0) {
            this._keysPressed.splice(this._keysPressed.indexOf(e.key), 1);
        }
        console.log(this._keysPressed);
    }

    public updateMoveDirection(): Vector2 {
        let requestedDirection = this.getRequestedDirection();
        if (requestedDirection.x == 0 && requestedDirection.y == 0)
            return this.moveDirection;

        if (!this.directionChangeIsValid(requestedDirection))
            return this.moveDirection;

        this.moveDirection = requestedDirection;
        return this.moveDirection;
    }

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
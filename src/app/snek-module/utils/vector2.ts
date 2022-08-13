export class Vector2 {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    add(v: Vector2): Vector2 {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    equals(v: Vector2) {
        return this.x == v.x && this.y == v.y;
    }

    static up(): Vector2 {
        return new Vector2(0, -1);
    }
    static down(): Vector2 {
        return new Vector2(0, 1);
    }
    static left(): Vector2 {
        return new Vector2(-1, 0);
    }
    static right(): Vector2 {
        return new Vector2(1, 0);
    }
    static zero(): Vector2 {
        return new Vector2(0, 0);
    }
}

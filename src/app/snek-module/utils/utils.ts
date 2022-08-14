export class Vector2 {
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    set(v: Vector2) {
        this.x = v.x;
        this.y = v.y;
    }

    add(v: Vector2): Vector2 {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    equals(v: Vector2) {
        return this.x == v.x && this.y == v.y;
    }

    static get up(): Vector2 {
        return new Vector2(0, -1);
    }
    static get down(): Vector2 {
        return new Vector2(0, 1);
    }
    static get left(): Vector2 {
        return new Vector2(-1, 0);
    }
    static get right(): Vector2 {
        return new Vector2(1, 0);
    }
    static get zero(): Vector2 {
        return new Vector2(0, 0);
    }
}

export class MyMath {
    public static lerp(start: number, end: number, perc: number) {
        return start * (1 - perc) + end * perc;
    }
}
import { MyMath, Vector2 } from "../utils/utils";

// TODO: refactor, kinda ugly. Separate the head handling from body handling.
export class SnakeSegment {
    private isControllable = false; // only the head of the snake should be controllable.
    public nextSegment: SnakeSegment | null;

    // the cell the segment is in / moving into
    private _cell = Vector2.zero;
    public get cell() { return new Vector2(this._cell.x, this._cell.y); };

    // the smoothed position during animation
    private _drawnPos = Vector2.zero;
    public get drawnPos() { return new Vector2(this._drawnPos.x, this._drawnPos.y); };

    constructor(segment: SnakeSegment | null, isControllable: boolean = false) {
        this.nextSegment = segment;
        this.isControllable = isControllable;

        this._cell = this.nextSegment?.cell ?? this._cell;
        this._drawnPos.set(this._cell);
    }

    // intended for controllable segments (the head) only
    public moveToCell(cell: Vector2, instant: boolean = false) {
        if (!this.isControllable) return;
        this._cell = cell;

        if (instant)
            this._drawnPos = this._cell;
    }

    // intended to be applied from tail -> head
    public followSegment() {
        if (!this.nextSegment) return;
        this._cell = this.nextSegment.cell;
    }

    public moveDrawPosTowardsTgtPos(timeDelta: number) {
        if (isNaN(timeDelta)) timeDelta = 0;
        this._drawnPos.x = MyMath.lerp(this._drawnPos.x, this.cell.x, Math.min(timeDelta, 1));
        this._drawnPos.y = MyMath.lerp(this._drawnPos.y, this.cell.y, Math.min(timeDelta, 1));
    }
}

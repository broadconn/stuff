import { MyMath, Vector2 } from "../utils/utils";

// TODO: refactor, kinda ugly. Separate head handling from body handling.
export class SnakeSegment {
    private isControllable = false; // only the head of the snake should be controllable.
    public nextSegment: SnakeSegment | null;

    // the cell the snake will move into
    private _tgtCellPos = Vector2.zero;
    public get tgtCellPos() { return new Vector2(this._tgtCellPos.x, this._tgtCellPos.y); };

    // the smoothed position used for drawing only
    private _drawCellPos = Vector2.zero;
    public get drawCellPos() { return new Vector2(this._drawCellPos.x, this._drawCellPos.y); };

    constructor(segment: SnakeSegment | null, isControllable: boolean = false) {
        this.nextSegment = segment;
        this.isControllable = isControllable;

        this._tgtCellPos = this.nextSegment?.tgtCellPos ?? this._tgtCellPos;
        this._drawCellPos.set(this._tgtCellPos);
    }

    // intended for controllable segments (the head) only
    public moveToCell(cellPos: Vector2, instant: boolean = false) {
        if (!this.isControllable) return;
        this._tgtCellPos = cellPos;

        if (instant)
            this._drawCellPos = this._tgtCellPos;
    }

    // intended to be applied from the tail to the head
    public followSegment() {
        if (!this.nextSegment) return;
        this._tgtCellPos = this.nextSegment.tgtCellPos;
    }

    public moveDrawPosTowardsTgtPos(timeDelta: number) {
        if (isNaN(timeDelta)) timeDelta = 0;
        this._drawCellPos.x = MyMath.lerp(this._drawCellPos.x, this.tgtCellPos.x, Math.min(timeDelta, 1));
        this._drawCellPos.y = MyMath.lerp(this._drawCellPos.y, this.tgtCellPos.y, Math.min(timeDelta, 1));
    }
}

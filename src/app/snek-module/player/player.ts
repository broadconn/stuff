import { Board } from "../board/board";
import { MyMath, Vector2 } from "../utils/utils";
import { PlayerMovementProcessor } from "./player-movement";

export class Snake {
  // references
  private board: Board;
  private drawCtx: CanvasRenderingContext2D;
  private movementProcessor: PlayerMovementProcessor;

  // snake body
  private snakeSegments: SnakeSegment[] = [];
  private segmentWidth: number;
  private headSegment: SnakeSegment;

  constructor(drawCtx: CanvasRenderingContext2D, board: Board) {
    this.movementProcessor = new PlayerMovementProcessor();
    this.board = board;
    this.drawCtx = drawCtx;
    this.segmentWidth = board.cellWidthPx * 0.9;

    let startLocation = board.getCenterCell();
    this.headSegment = new SnakeSegment(null, true);
    this.headSegment.setPosition(startLocation);
    this.snakeSegments.push(this.headSegment);

    // starting snake length
    this.attachSegment();
    this.attachSegment();
  }

  public update() {
    let moveDirection = this.movementProcessor.updateDirection(); // a valid direction the player has committed to moving in
    let tgtCell = this.headSegment.tgtCellPos.add(moveDirection); // the cell the player will try to move into

    // check for any crashes 
    if (!this.board.cellIsInsideBoard(tgtCell) || this.cellIsInsidePlayer(tgtCell)) {
      this.die();
      return;
    }

    // if all checks pass, move the player
    this.moveInDirection(moveDirection);
  }

  private cellIsInsidePlayer(tgtCell: Vector2): boolean {
    for (let i = 1; i < this.snakeSegments.length - 1; i++) { // -1 to ignore the tail - it will move out of the way
      if (this.snakeSegments[i].tgtCellPos.equals(tgtCell))
        return true;
    }
    return false;
  }

  public draw(timeDelta: number) {
    // update the snake's drawn position
    this.snakeSegments.forEach((segment, i) => {
      let smoothSpeed = timeDelta * 20;
      segment.moveDrawPosTowardsTgtPos(smoothSpeed);
    });

    // line down the snake
    let lineWidth = 20;
    this.drawCtx.strokeStyle = `rgb(0,100,100)`;
    this.drawCtx.lineWidth = lineWidth;
    this.drawCtx.lineCap = 'round';
    this.drawCtx.lineJoin = 'round';
    this.drawCtx.beginPath();
    this.drawCtx.moveTo(this.board.getBoardPos(this.snakeSegments[this.snakeSegments.length - 1].drawCellPos.x), this.board.getBoardPos(this.snakeSegments[this.snakeSegments.length - 1].drawCellPos.y));
    [...this.snakeSegments].reverse().forEach(segment => {
      if (segment.nextSegment != null) {
        this.drawCtx.lineTo(this.board.getBoardPos(segment.nextSegment.drawCellPos.x), this.board.getBoardPos(segment.nextSegment.drawCellPos.y));
      }
    });
    this.drawCtx.stroke();

    // box segments
    let headRGB = { r: 50, g: 175, b: 115 };
    let bodyRGBs = { r: 20, g: 120, b: 120 };
    this.snakeSegments.forEach((segment, i) => {
      let perc = Math.max(0, 1 - i / 5);
      this.drawCtx.fillStyle = `rgb(${MyMath.lerp(bodyRGBs.r, headRGB.r, perc)},${MyMath.lerp(bodyRGBs.g, headRGB.g, perc)},${MyMath.lerp(bodyRGBs.b, headRGB.b, perc)})`;

      let width = this.segmentWidth * (1 - (i / 10));
      width = Math.max(width, lineWidth * 1.2);
      let x = this.board.getBoardPos(segment.drawCellPos.x) - width / 2;
      let y = this.board.getBoardPos(segment.drawCellPos.y) - width / 2;
      this.drawCtx.fillRect(x, y, width, width);
      // this.drawCtx.beginPath();
      // this.drawCtx.arc(x, y, width, 0, 2 * Math.PI);
      // this.drawCtx.fill();
    });
  }

  private moveInDirection(dir: Vector2) {
    // move body into itself
    [...this.snakeSegments].reverse().forEach(segment => {
      segment.followSegment();
    });
    // move head segment in the move direction 
    this.headSegment.setPosition(this.headSegment.tgtCellPos.add(dir));
  }

  private eat() {
    // add another segment to the segments list
    this.attachSegment();

    //move the thing that was eaten

    // fire off success event for effects canvas to send off a nova blast? invert this: https://www.w3schools.com/tags/canvas_createradialgradient.asp
  }

  private die() {

  }

  private attachSegment() {
    let lastSegment = this.snakeSegments[this.snakeSegments.length - 1];
    let newSegment = new SnakeSegment(lastSegment);
    this.snakeSegments.push(newSegment);
  }
}

// TODO: refactor, kinda ugly. Separate head code from the body segments.
class SnakeSegment {
  private isControllable = false;
  public nextSegment: SnakeSegment | null;

  private _tgtCellPos = Vector2.zero;
  public get tgtCellPos() { return new Vector2(this._tgtCellPos.x, this._tgtCellPos.y); };

  private _drawCellPos = Vector2.zero; // the smoothed position used for drawing only
  public get drawCellPos() { return new Vector2(this._drawCellPos.x, this._drawCellPos.y); };

  constructor(segment: SnakeSegment | null, isControllable: boolean = false) {
    this.nextSegment = segment;
    this.isControllable = isControllable;
    this._tgtCellPos = this.nextSegment?.tgtCellPos ?? this._tgtCellPos;
    this._drawCellPos.set(this._tgtCellPos);
  }

  // intended for controllable segments (the head) only
  public setPosition(cellPos: Vector2) {
    if (!this.isControllable) return;
    this._tgtCellPos = cellPos;
  }

  // intended to be applied from the tail to the head
  public followSegment() {
    if (this.isControllable) return;
    this._tgtCellPos = this.nextSegment?.tgtCellPos ?? this._tgtCellPos;
  }

  public moveDrawPosTowardsTgtPos(timeDelta: number) {
    if (isNaN(timeDelta)) timeDelta = 0;
    this._drawCellPos.x = MyMath.lerp(this._drawCellPos.x, this.tgtCellPos.x, Math.min(timeDelta, 1));
    this._drawCellPos.y = MyMath.lerp(this._drawCellPos.y, this.tgtCellPos.y, Math.min(timeDelta, 1));
  }
}


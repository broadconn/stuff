import { Board } from "../board/board";
import { Vector2 } from "../utils/vector2";
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

    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
    this.attachSegment();
  }

  public update() {
    //console.log("player update");

    let moveDirection = this.movementProcessor.updateDirection(); // a valid direction the player has committed to moving in
    let tgtCell = this.headSegment.cellPos.add(moveDirection);

    // get target location, check for any crashes 
    // check that the target location is within board bounds
    if (!this.board.cellIsValid(tgtCell)
      || this.cellIsInsidePlayer(tgtCell)) {
      this.die();
      return;
    }
    // check that the target location is not inside any player segments 

    // if all checks pass, move the player
    this.moveInDirection(moveDirection);
  }

  private cellIsInsidePlayer(tgtCell: Vector2): boolean {
    let collision = false;
    this.snakeSegments.forEach(seg => {
      if (tgtCell.equals(seg.cellPos)) {
        collision = true;
      }
    });
    return collision;
  }

  public draw() {
    // line down the snake
    let lineWidth = 20;
    this.drawCtx.strokeStyle = `rgb(0,100,100)`;
    this.drawCtx.lineWidth = lineWidth;
    this.drawCtx.beginPath();
    this.drawCtx.moveTo(this.board.getCellCoord(this.snakeSegments[this.snakeSegments.length - 1].cellPos.x), this.board.getCellCoord(this.snakeSegments[this.snakeSegments.length - 1].cellPos.y));
    [...this.snakeSegments].reverse().forEach(segment => {
      if (segment.nextSegment != null) {
        this.drawCtx.lineTo(this.board.getCellCoord(segment.nextSegment.cellPos.x), this.board.getCellCoord(segment.nextSegment.cellPos.y));
      }
    });
    this.drawCtx.stroke();

    // box segments
    let headRGB = { r: 20, g: 120, b: 120 };
    let bodyRGB = { r: 50, g: 175, b: 115 };
    this.snakeSegments.forEach((segment, i) => {
      let perc = Math.max(0, 1 - i / 5);
      this.drawCtx.fillStyle = `rgb(${this.lerp(headRGB.r, bodyRGB.r, perc)},${this.lerp(headRGB.g, bodyRGB.g, perc)},${this.lerp(headRGB.b, bodyRGB.b, perc)})`;

      let width = this.segmentWidth * (1 - (i / 10));
      width = Math.max(width, lineWidth * 1.2);
      let x = this.board.getCellCoord(segment.cellPos.x) - width / 2;
      let y = this.board.getCellCoord(segment.cellPos.y) - width / 2;
      this.drawCtx.fillRect(x, y, width, width);
    });
  }

  private lerp(start: number, end: number, perc: number) {
    return (1 - perc) * start + perc * end;
  }

  private moveInDirection(dir: Vector2) {
    //  move body into itself
    [...this.snakeSegments].reverse().forEach(segment => {
      segment.followSegment();
    });
    //  move head segment in the move direction 
    this.headSegment.setPosition(this.headSegment.cellPos.add(dir));
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

// TODO: refactor, kinda ugly
class SnakeSegment {
  private isControllable = false;
  public nextSegment: SnakeSegment | null;
  private _cellPos = Vector2.zero;
  public get cellPos() { return new Vector2(this._cellPos.x, this._cellPos.y); };

  constructor(segment: SnakeSegment | null, isControllable: boolean = false) {
    this.nextSegment = segment;
    this.isControllable = isControllable;
    if (this.nextSegment != null)
      this._cellPos = this.nextSegment.cellPos;
  }

  // intended for controllable segments (the head) only
  public setPosition(cellPos: Vector2) {
    if (!this.isControllable) return;
    this._cellPos = cellPos;
  }

  // intended to be applied from the tail to the head
  public followSegment() {
    if (this.isControllable) return;
    this._cellPos = this.nextSegment?.cellPos ?? this._cellPos;
  }
}


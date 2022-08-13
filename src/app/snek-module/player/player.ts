import { Board } from "../board/board";
import { Vector2 } from "../utils/Vector2";
import { PlayerMovementProcessor } from "./player-movement";

export class Snake {
  // input handling

  // references
  private board: Board;
  private drawCtx: CanvasRenderingContext2D;
  private movement: PlayerMovementProcessor;

  // snake body
  private snakeSegments: SnakeSegment[] = [];
  private segmentWidth: number;
  private headSegment: SnakeSegment;

  // movement

  constructor(drawCtx: CanvasRenderingContext2D, board: Board) {
    this.movement = new PlayerMovementProcessor();
    this.board = board;
    this.drawCtx = drawCtx;
    this.segmentWidth = board.cellWidthPx * 0.9;

    let startLocation = board.getCenterCell();
    this.headSegment = new SnakeSegment(startLocation);
    this.snakeSegments.push(this.headSegment);
  }

  update() {
    //console.log("player update");

    let moveDirection = this.movement.getMoveDirection(); // a valid direction the player has committed to moving in
    //console.log(moveDirection);

    // get target location, check for any crashes 
    // check that the target location is within board bounds
    // check that the target location is not inside any player segments

    // if all checks pass, move the player
    //  move body into itself
    //  move head segment in the move direction 

    this.headSegment.cellPos = this.headSegment.cellPos.add(moveDirection);
    //console.log(this.snakeSegments[0].cellPos);
  }

  draw() {
    this.drawCtx.fillStyle = 'rgb(0,185,100)';
    this.snakeSegments.forEach(segment => {
      this.drawCtx.fillRect(this.board.getCellCoord(segment.cellPos.x) - this.segmentWidth / 2, this.board.getCellCoord(segment.cellPos.y) - this.segmentWidth / 2, this.segmentWidth, this.segmentWidth);
    });
  }

  eat() {
    // just add another segment to the segments list

    // fire off success event for effects canvas to send off a nova blast? invert this: https://www.w3schools.com/tags/canvas_createradialgradient.asp
  }
}

class SnakeSegment {
  private _cellPos: Vector2 = new Vector2(0, 0);
  public get cellPos(): Vector2 { return this._cellPos; };
  public set cellPos(value: Vector2) { this._cellPos = value; }

  constructor(position: Vector2) {
    this._cellPos = position;
  }

  followSegment(segment: SnakeSegment) {
    this._cellPos = segment.cellPos;
  }
}


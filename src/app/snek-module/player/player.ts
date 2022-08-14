import { Subject } from "rxjs";
import { Food } from "../food/food-dispenser";
import { GameController } from "../game/game-controller";
import { MyMath, Vector2 } from "../utils/utils";
import { PlayerMovementProcessor } from "./player-movement";
import { SnakeSegment } from "./snake-segment";

export class Snake {
  // references  
  private drawCtx: CanvasRenderingContext2D;
  private gameControl: GameController;
  private movementProcessor: PlayerMovementProcessor;

  // snake body
  private snakeSegments: SnakeSegment[] = [];
  private snakeHeadSegment: SnakeSegment;
  private snakeHeadWidth: number;
  private readonly movementAntiSmooth = 20;

  // events
  public deathEvent: Subject<boolean> = new Subject<boolean>();
  public ateFoodEvent: Subject<boolean> = new Subject<boolean>();

  //food target
  private food: Food;

  constructor(gameControl: GameController, drawCtx: CanvasRenderingContext2D,) {
    this.drawCtx = drawCtx;
    this.gameControl = gameControl;
    this.movementProcessor = new PlayerMovementProcessor();
    this.snakeHeadWidth = this.gameControl.board.cellWidthPx * 0.9;
    this.snakeHeadSegment = new SnakeSegment(null, true);

    this.reset();
  }

  public reset() {
    this.snakeSegments = [];
    let startingCell = this.gameControl.board.getCenterCell();
    this.snakeHeadSegment.moveToCell(startingCell, true);
    this.gameControl.board.snakeHeadMovedIntoCell(startingCell);
    this.snakeSegments.push(this.snakeHeadSegment);
    this.movementProcessor.reset();

    // starting snake length
    this.grow();
    //this.growSegment();
  }

  public onKeyDown(e: KeyboardEvent) {
    this.movementProcessor.onKeyDown(e);
  }

  public update() {
    let nextDirection = this.movementProcessor.updateDirection(); // a valid direction the player has committed to moving in
    let nextCell = this.snakeHeadSegment.cell.add(nextDirection); // the cell the player will try to move into

    if (this.cellIsInvalid(nextCell)) {
      this.die();
      return;
    }

    let ateThisUpdate = false;
    if (this.food.cell.round().equals(nextCell.round())) {
      this.eat();
      ateThisUpdate = true;
    }

    this.moveIntoCell(nextCell);

    if (ateThisUpdate)
      this.ateFoodEvent.next(true);
  }

  private cellIsInvalid(cell: Vector2): boolean {
    return !this.gameControl.board.cellIsOnBoard(cell) || this.cellIsInsidePlayer(cell);
  }

  private cellIsInsidePlayer(tgtCell: Vector2): boolean {
    for (let i = 1; i < this.snakeSegments.length - 1; i++) { // -1 to ignore the tail - it will move out of the way
      if (this.snakeSegments[i].cell.round().equals(tgtCell.round())) {
        console.log('cell', tgtCell, "is within snake segment", this.snakeSegments[i].cell, this.snakeSegments);
        return true;
      }
    }
    return false;
  }

  private moveIntoCell(cell: Vector2) {
    let snakeTailCellBeforeMove = this.snakeSegments[this.snakeSegments.length - 1].cell;

    // move body into itself
    [...this.snakeSegments].reverse().forEach(segment => {
      segment.followSegment();
    });

    // move head segment in the move direction 
    this.snakeHeadSegment.moveToCell(cell);

    //update the board's occupied cells list
    let snakeTailCellAfterMove = this.snakeSegments[this.snakeSegments.length - 1].cell;
    if (!snakeTailCellBeforeMove.round().equals(snakeTailCellAfterMove.round()))
      this.gameControl.board.snakeTailLeftCell(snakeTailCellBeforeMove);
    this.gameControl.board.snakeHeadMovedIntoCell(cell);
  }

  private die() {
    this.deathEvent.next(true);
  }

  private eat() {
    this.food.enabled = false;
    this.grow();
  }

  public setFoodCell(cell: Food) {
    this.food = cell;
  }

  private grow() {
    let lastSegment = this.snakeSegments[this.snakeSegments.length - 1];
    let newSegment = new SnakeSegment(lastSegment);
    this.snakeSegments.push(newSegment);
  }

  public draw(timeDelta: number) {
    // update the snake's drawn position
    this.snakeSegments.forEach((segment, i) => {
      let smoothSpeed = timeDelta * this.movementAntiSmooth;
      segment.moveDrawPosTowardsTgtPos(smoothSpeed);
    });

    // line down the snake
    let lineWidth = this.snakeHeadWidth * 0.5;
    this.drawCtx.strokeStyle = `rgb(0,100,100)`;
    this.drawCtx.lineWidth = lineWidth;
    this.drawCtx.lineJoin = 'round';
    this.drawCtx.beginPath();
    this.drawCtx.moveTo(this.gameControl.board.getBoardPos(this.snakeSegments[this.snakeSegments.length - 1].drawnPos.x), this.gameControl.board.getBoardPos(this.snakeSegments[this.snakeSegments.length - 1].drawnPos.y));
    [...this.snakeSegments].reverse().forEach(segment => {
      if (segment.nextSegment != null) {
        this.drawCtx.lineTo(this.gameControl.board.getBoardPos(segment.nextSegment.drawnPos.x), this.gameControl.board.getBoardPos(segment.nextSegment.drawnPos.y));
      }
    });
    this.drawCtx.stroke();

    // box segments
    let headRGB = { r: 50, g: 175, b: 115 };
    let bodyRGBs = { r: 20, g: 120, b: 120 };
    for (let i = this.snakeSegments.length - 1; i >= 0; i--) {
      let segment = this.snakeSegments[i];
      let perc = Math.max(0, 1 - i / 5);
      this.drawCtx.fillStyle = `rgb(${MyMath.lerp(bodyRGBs.r, headRGB.r, perc)},${MyMath.lerp(bodyRGBs.g, headRGB.g, perc)},${MyMath.lerp(bodyRGBs.b, headRGB.b, perc)})`;

      let width = this.snakeHeadWidth * (1 - (i / 10));
      width = Math.max(width, lineWidth * 1.2);
      let x = this.gameControl.board.getBoardPos(segment.drawnPos.x) - width / 2;
      let y = this.gameControl.board.getBoardPos(segment.drawnPos.y) - width / 2;
      this.drawCtx.fillRect(x, y, width, width);
    };
  }
}


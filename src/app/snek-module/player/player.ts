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
  private readonly movementAntiSmooth = 12;

  // events
  public deathEvent: Subject<boolean> = new Subject<boolean>();
  public atePreyEvent: Subject<boolean> = new Subject<boolean>();

  private isDead = false;

  //food target
  private prey: Food;

  constructor(gameControl: GameController, drawCtx: CanvasRenderingContext2D,) {
    this.drawCtx = drawCtx;
    this.gameControl = gameControl;
    this.movementProcessor = new PlayerMovementProcessor();
    this.snakeHeadWidth = this.gameControl.board.cellWidthPx * 1;
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
    this.isDead = false;

    // starting snake length
    this.grow();
    this.grow();
  }

  public onKeyDown(e: KeyboardEvent) {
    this.movementProcessor.onKeyDown(e);
  }

  public update() {
    let nextDirection = this.movementProcessor.updateDirection(); // a valid direction the player has committed to moving in
    let nextCell = this.snakeHeadSegment.cell.add(nextDirection); // the cell the player will try to move into

    if (this.cellIsInvalid(nextCell))
      this.die();

    this.moveIntoCell(nextCell);

    if (this.prey.cell.round().equals(this.snakeHeadSegment.cell.round())) {
      this.eat();
      this.atePreyEvent.next(true);
    }
  }

  private cellIsInvalid(cell: Vector2): boolean {
    return !this.gameControl.board.cellIsOnBoard(cell) || this.cellIsInsidePlayer(cell);
  }

  private cellIsInsidePlayer(tgtCell: Vector2): boolean {
    for (let i = 1; i < this.snakeSegments.length - 1; i++) { // -1 to ignore the tail - it will move out of the way
      if (this.snakeSegments[i].cell.round().equals(tgtCell.round()))
        return true;
    }
    return false;
  }

  private moveIntoCell(cell: Vector2) {
    let snakeTailCellBeforeMove = this.snakeSegments[this.snakeSegments.length - 1].cell;

    // move body into itself
    [...this.snakeSegments].reverse().forEach(segment => {
      segment.followSnake();
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
    this.isDead = true;
    this.deathEvent.next(true);
  }

  private eat() {
    this.prey.getEaten();
    this.grow();
  }

  public setPrey(food: Food) {
    this.prey = food;
  }

  private grow() {
    let tailSegment = this.snakeSegments[this.snakeSegments.length - 1];
    let newSegment = new SnakeSegment(tailSegment);
    this.snakeSegments.push(newSegment);
  }

  public draw(timeDelta: number) {
    // update the snake's drawn position
    this.snakeSegments.forEach((segment, i) => {
      let smoothSpeed = timeDelta * this.movementAntiSmooth;
      segment.moveDrawPosTowardsCell(smoothSpeed);
    });

    // line down the snake
    let lineWidth = this.snakeHeadWidth * 0.7;
    this.drawCtx.strokeStyle = `rgb(0,100,100)`;
    this.drawCtx.lineWidth = lineWidth;
    this.drawCtx.lineJoin = 'round';
    this.drawCtx.lineCap = 'round';
    this.drawCtx.beginPath();
    this.drawCtx.moveTo(this.gameControl.board.getBoardPos(this.snakeSegments[this.snakeSegments.length - 1].drawnPos.x), this.gameControl.board.getBoardPos(this.snakeSegments[this.snakeSegments.length - 1].drawnPos.y));
    [...this.snakeSegments].reverse().forEach(segment => {
      if (segment.attachedTo != null) {
        this.drawCtx.lineTo(this.gameControl.board.getBoardPos(segment.attachedTo.drawnPos.x), this.gameControl.board.getBoardPos(segment.attachedTo.drawnPos.y));
      }
    });
    this.drawCtx.stroke();

    // box segments
    let headLightRGB = !this.isDead ? { r: 50, g: 175, b: 115 } : { r: 200, g: 50, b: 50 };
    let headDarkRGB = !this.isDead ? { r: 20, g: 120, b: 120 } : { r: 50, g: 50, b: 50 };

    // draw backwards so the head is drawn on top of the tail / body
    for (let i = this.snakeSegments.length - 1; i >= 0; i--) {
      let segment = this.snakeSegments[i];
      let colorPerc = Math.max(0, 1 - i / 5);
      this.drawCtx.fillStyle = `rgb(${MyMath.lerp(headDarkRGB.r, headLightRGB.r, colorPerc)}, ${MyMath.lerp(headDarkRGB.g, headLightRGB.g, colorPerc)}, ${MyMath.lerp(headDarkRGB.b, headLightRGB.b, colorPerc)})`;

      //scale
      let bodySizeMin = this.snakeHeadWidth * 0.3;
      let bodySizeDiminishment = (i / 12);
      let width = this.snakeHeadWidth * (1 - bodySizeDiminishment);
      width = Math.max(bodySizeMin, width);

      //position
      let x = this.gameControl.board.getBoardPos(segment.drawnPos.x) - width / 2;
      let y = this.gameControl.board.getBoardPos(segment.drawnPos.y) - width / 2;

      // rotation 
      let halfWidth = width / 2;
      this.drawCtx.save();
      this.drawCtx.translate(x + halfWidth, y + halfWidth);
      this.drawCtx.rotate((45) * Math.PI / 180);
      this.drawCtx.fillRect(-halfWidth, -halfWidth, width, width);
      this.drawCtx.restore();
    };
  }
}


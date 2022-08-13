import { Vector2 } from "../utils/vector2";

export class Board {
  private drawCtx: CanvasRenderingContext2D;
  private boardWidthPx: number; // is also board height
  private numCellsWide: number;
  private _cellWidthPx: number;
  public get cellWidthPx(): number { return this._cellWidthPx; }

  constructor(drawingCtx: CanvasRenderingContext2D, numCellsWide: number, width: number) {
    this.drawCtx = drawingCtx;
    this.numCellsWide = numCellsWide;
    this.boardWidthPx = width;
    this._cellWidthPx = this.boardWidthPx / numCellsWide;
  }

  public draw() {
    for (let i = 0; i < this.numCellsWide; i++) {
      for (let j = 0; j < this.numCellsWide; j++) {
        if ((i + j) % 2 == 0) continue;
        this.drawCtx.fillStyle = '#acccc6';
        this.drawCtx.fillRect(i * this.cellWidthPx, j * this.cellWidthPx, this._cellWidthPx, this._cellWidthPx);
        this.drawCtx.fillStyle = '#b8d2cd';
        this.drawCtx.fillRect(i * this.cellWidthPx, j * this.cellWidthPx, this._cellWidthPx - 2, this._cellWidthPx - 2);
      }
    }
  }

  public getCellCoord(i: number) {
    return i * this.cellWidthPx + this.cellWidthPx / 2;
  }

  public getCenterCell(): Vector2 {
    let x = Math.floor(this.numCellsWide / 2);
    return new Vector2(x, x);
  }

  public cellIsValid(cell: Vector2) {
    return cell.x >= 0 && cell.x < this.numCellsWide
      && cell.y >= 0 && cell.y < this.numCellsWide;
  }
}

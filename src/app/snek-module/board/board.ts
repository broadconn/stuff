import { Vector2 } from "../../services/vector/vector2";

export class Board {
  private drawCtx: CanvasRenderingContext2D;
  private boardWidthPx: number; // also board height
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
    this.drawCtx.strokeStyle = `rgba(255,255,255,0.2)`;
    this.drawCtx.lineWidth = 1;

    //horizontal lines
    for (let i = 0; i < this.numCellsWide; i++) {
      this.drawCtx.beginPath();
      this.drawCtx.moveTo(i * this.cellWidthPx, 0);
      this.drawCtx.lineTo(i * this.cellWidthPx, this.boardWidthPx);
      this.drawCtx.stroke();
    }

    //vertical lines
    for (let i = 0; i < this.numCellsWide; i++) {
      this.drawCtx.beginPath();
      this.drawCtx.moveTo(0, i * this.cellWidthPx);
      this.drawCtx.lineTo(this.boardWidthPx, i * this.cellWidthPx);
      this.drawCtx.stroke();
    }
  }

  public getCellCoord(i: number) {
    return i * this.cellWidthPx + this.cellWidthPx / 2;
  }

  public getCenterCell(): Vector2 {
    let x = Math.floor(this.numCellsWide / 2);
    return new Vector2(x, x);
  }
}

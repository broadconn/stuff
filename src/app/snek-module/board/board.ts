import { Vector2 } from "../utils/utils";

export class Board {
  private drawCtx: CanvasRenderingContext2D;
  private boardWidthPx: number; // is also board height
  private numCellsWide: number;
  private tileColor = '#b8d2cd';
  private tileShadowColor = '#acccc6';
  private tileShadowVisiblePx = 2;
  private _cellWidthPx: number;
  public get cellWidthPx(): number { return this._cellWidthPx; }

  constructor(drawingCtx: CanvasRenderingContext2D, numCellsWide: number, width: number) {
    this.drawCtx = drawingCtx;
    this.numCellsWide = numCellsWide;
    this.boardWidthPx = width;
    this._cellWidthPx = this.boardWidthPx / numCellsWide;
  }

  public draw(timeDelta: number) {
    for (let i = 0; i < this.numCellsWide; i++) {
      for (let j = 0; j < this.numCellsWide; j++) {
        if ((i + j) % 2 == 0) continue;
        // shadow tile
        this.drawCtx.fillStyle = this.tileShadowColor;
        this.drawCtx.fillRect(i * this.cellWidthPx, j * this.cellWidthPx, this._cellWidthPx, this._cellWidthPx);
        // actual tile
        this.drawCtx.fillStyle = this.tileColor;
        this.drawCtx.fillRect(i * this.cellWidthPx, j * this.cellWidthPx, this._cellWidthPx - this.tileShadowVisiblePx, this._cellWidthPx - this.tileShadowVisiblePx);
      }
    }
  }

  public getBoardPos(cell: number) {
    return cell * this.cellWidthPx + this.cellWidthPx / 2;
  }

  public getCenterCell(): Vector2 {
    let x = Math.floor(this.numCellsWide / 2);
    return new Vector2(x, x);
  }

  public cellIsOnBoard(cell: Vector2) {
    cell.round();
    return cell.x >= 0 && cell.x < this.numCellsWide
      && cell.y >= 0 && cell.y < this.numCellsWide;
  }
}

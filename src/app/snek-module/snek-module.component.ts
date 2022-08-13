import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Board } from './board/board';
import { Snake } from './player/player';

@Component({
  selector: 'app-snek-module',
  templateUrl: './snek-module.component.html',
  styleUrls: ['./snek-module.component.css']
})
export class SnekModuleComponent implements AfterViewInit {
  @ViewChild('gameCanvas') gameCanvas: ElementRef;

  // game settings 
  readonly boardSizePx = 500;
  readonly numCellsWide = 21;
  readonly updateFreqMs = 200;

  board: Board;
  player: Snake;
  drawCtx: CanvasRenderingContext2D;

  canvasShiftPerc: number = 5;
  canvasShiftS: number = 10;

  constructor() { }

  ngAfterViewInit(): void {
    this.initObjects();
    this.startUpdateLoops();
    this.animateBoard();
  }

  initObjects() {
    this.setUpCanvas(this.gameCanvas);
    this.board = new Board(this.drawCtx, this.numCellsWide, this.boardSizePx);
    this.player = new Snake(this.drawCtx, this.board);
  }

  private setUpCanvas(gameCanvas: ElementRef) {
    gameCanvas.nativeElement.width = this.boardSizePx;
    gameCanvas.nativeElement.height = this.boardSizePx;

    this.drawCtx = gameCanvas.nativeElement.getContext('2d');
    this.drawCtx.imageSmoothingEnabled = true;
    this.drawCtx.imageSmoothingQuality = "high";
  }

  startUpdateLoops() {
    window.setInterval(() => this.doGameUpdate(), this.updateFreqMs);
    window.setInterval(() => this.boardFloatingAnim(), this.canvasShiftS * 1000);
  }

  doGameUpdate() {
    this.player.update();
  }

  animateBoard() {
    this.refreshCanvas();
    this.boardFloatingAnim();
  }

  // optional timestamp parameter! Can use to get time delta between frames
  refreshCanvas() {
    this.drawCtx.clearRect(0, 0, this.boardSizePx, this.boardSizePx);
    this.board.draw();
    this.player.draw();
    window.requestAnimationFrame(() => this.refreshCanvas());
  }

  boardFloatingAnim() {
    this.canvasShiftPerc = -1 * this.canvasShiftPerc;
    this.gameCanvas.nativeElement.style.setProperty("--canvas-y", `${this.canvasShiftPerc}%`);
    this.gameCanvas.nativeElement.style.setProperty("--canvas-shifttime", `${this.canvasShiftS}s`);
  }

  private startGame() {
  }
}

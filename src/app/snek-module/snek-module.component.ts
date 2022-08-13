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

  constructor() { }

  ngAfterViewInit(): void {
    this.initObjects();
    this.startPlayerUpdateLoop();
    this.refreshFrame();
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

  startPlayerUpdateLoop() {
    window.setInterval(() => this.doGameUpdate(), this.updateFreqMs);
  }

  doGameUpdate() {
    this.player.update();
  }

  // optional timestamp parameter! Can use to get time delta between frames
  refreshFrame() {
    this.drawCtx.clearRect(0, 0, this.boardSizePx, this.boardSizePx);
    this.board.draw();
    this.player.draw();
    window.requestAnimationFrame(() => this.refreshFrame());
  }

  private startGame() {
  }
}

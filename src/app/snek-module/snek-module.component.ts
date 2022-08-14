import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GameController } from './game/game-controller';

@Component({
  selector: 'app-snek-module',
  templateUrl: './snek-module.component.html',
  styleUrls: ['./snek-module.component.css']
})
export class SnekModuleComponent implements OnInit, AfterViewInit {
  @ViewChild('gameCanvas') gameCanvas: ElementRef;
  drawingContext: CanvasRenderingContext2D;

  gameControl: GameController;
  private timeLastFrame: number;

  readonly boardSizePx = 700;
  readonly boardFloatMag: number = 5;
  readonly boardFloatS: number = 10;
  boardFloatDir: number = 1;

  constructor() {
  }

  ngOnInit(): void {
    this.gameControl = new GameController(this.drawingContext, this.boardSizePx);
  }

  ngAfterViewInit(): void {
    this.initObjects();
    this.doAnimation();
  }

  private initObjects() {
    this.setUpCanvas(this.gameCanvas);
    this.gameControl = new GameController(this.drawingContext, this.boardSizePx);
  }

  private setUpCanvas(gameCanvas: ElementRef) {
    gameCanvas.nativeElement.width = this.boardSizePx;
    gameCanvas.nativeElement.height = this.boardSizePx;

    this.drawingContext = gameCanvas.nativeElement.getContext('2d');

    window.setInterval(() => this.boardFloatingAnim(this.boardFloatMag), this.boardFloatS * 1000);
  }

  doAnimation() {
    this.animateCanvas(0);
    this.boardFloatingAnim(0);
  }

  animateCanvas(timestamp: number) {
    let timeDeltaS = timestamp - this.timeLastFrame;
    this.timeLastFrame = timestamp;
    timeDeltaS /= 1000;

    this.drawingContext.clearRect(0, 0, this.boardSizePx, this.boardSizePx);
    this.gameControl.draw(timeDeltaS);
    window.requestAnimationFrame((timestamp) => this.animateCanvas(timestamp));
  }

  boardFloatingAnim(floatMagnitude: number) {
    this.boardFloatDir = -1 * this.boardFloatDir;
    this.gameCanvas.nativeElement.style.setProperty("--canvas-y", `${this.boardFloatDir * floatMagnitude}%`);
    this.gameCanvas.nativeElement.style.setProperty("--canvas-shifttime", `${this.boardFloatS}s`);
  }
}
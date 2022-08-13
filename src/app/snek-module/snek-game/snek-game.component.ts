import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-snek-game',
  templateUrl: './snek-game.component.html',
  styleUrls: ['./snek-game.component.css']
})
export class SnekGameComponent implements OnInit, AfterViewInit {
  @ViewChild('gameCanvas') gameCanvas!: ElementRef;
  canvasCtx: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.gameCanvas.nativeElement.width = 500;
    this.gameCanvas.nativeElement.height = 500;

    //canvas drawing context
    this.canvasCtx = this.gameCanvas.nativeElement.getContext('2d');
    this.canvasCtx.imageSmoothingEnabled = false;
    this.canvasCtx.imageSmoothingQuality = "high";
  }

}

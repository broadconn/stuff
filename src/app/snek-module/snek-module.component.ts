import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-snek-module',
  templateUrl: './snek-module.component.html',
  styleUrls: ['./snek-module.component.css']
})
export class SnekModuleComponent implements OnInit {
  @ViewChild('gameCanvas') gameCanvas!: ElementRef;
  canvasCtx: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.gameCanvas.nativeElement.width = 500;
    this.gameCanvas.nativeElement.height = 500;

    // canvas event listeners
    this.gameCanvas.nativeElement.addEventListener('keydown', (e: KeyboardEvent) => this.onKeyDown(e));

    //canvas drawing context
    this.canvasCtx = this.gameCanvas.nativeElement.getContext('2d');
    this.canvasCtx.imageSmoothingEnabled = false;
    this.canvasCtx.imageSmoothingQuality = "high";
  }

  onKeyDown(e: KeyboardEvent) {
    console.log(e.key);
  }

}

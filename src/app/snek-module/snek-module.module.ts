import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnekModuleRoutingModule } from './snek-module-routing.module';
import { SnekModuleComponent } from './snek-module.component';
import { PlayerComponent } from './player/player.component';
import { BoardComponent } from './board/board.component';


@NgModule({
  declarations: [
    SnekModuleComponent,
    PlayerComponent,
    BoardComponent
  ],
  imports: [
    CommonModule,
    SnekModuleRoutingModule
  ]
})
export class SnekModuleModule { }

"use strict";(self.webpackChunkmisc_stuff=self.webpackChunkmisc_stuff||[]).push([[671],{312:(R,w,u)=>{u.r(w),u.d(w,{SnekModuleModule:()=>O});var C=u(808),f=u(879);class g{static lerp(e,t,n){return e*(1-n)+t*n}}class o{constructor(e=0,t=0){this.x=e,this.y=t}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}set(e){this.x=e.x,this.y=e.y}add(e){return new o(this.x+e.x,this.y+e.y)}equals(e){return this.x==e.x&&this.y==e.y}static get up(){return new o(0,-1)}static get down(){return new o(0,1)}static get left(){return new o(-1,0)}static get right(){return new o(1,0)}static get zero(){return new o(0,0)}}class y{constructor(e,t,n){this.tileColor="#b8d2cd",this.tileShadowColor="#acccc6",this.tileShadowVisiblePx=2,this.freeCells=[],this.drawCtx=e,this.numCellsWide=t,this.boardWidthPx=n,this._cellWidthPx=this.boardWidthPx/t,this.reset()}get cellWidthPx(){return this._cellWidthPx}draw(e){for(let t=0;t<this.numCellsWide;t++)for(let n=0;n<this.numCellsWide;n++)(t+n)%2!=0&&(this.drawCtx.fillStyle=this.tileShadowColor,this.drawCtx.fillRect(t*this.cellWidthPx,n*this.cellWidthPx,this._cellWidthPx,this._cellWidthPx),this.drawCtx.fillStyle=this.tileColor,this.drawCtx.fillRect(t*this.cellWidthPx,n*this.cellWidthPx,this._cellWidthPx-this.tileShadowVisiblePx,this._cellWidthPx-this.tileShadowVisiblePx))}reset(){this.constructFreeCellsArray()}getBoardPos(e){return e*this.cellWidthPx+this.cellWidthPx/2}getCenterCell(){let e=Math.floor(this.numCellsWide/2);return new o(e,e)}cellIsOnBoard(e){return e.round(),e.x>=0&&e.x<this.numCellsWide&&e.y>=0&&e.y<this.numCellsWide}constructFreeCellsArray(){this.freeCells=[];for(let e=0;e<this.numCellsWide;e++)for(let t=0;t<this.numCellsWide;t++)this.freeCells.push(new o(t,e))}snakeHeadMovedIntoCell(e){this.freeCells=this.freeCells.filter(t=>!t.equals(e))}snakeTailLeftCell(e){this.freeCells.push(e)}getUnoccupiedCells(){return[...this.freeCells]}}class v{constructor(e,t){this.gameControl=e,this.drawCtx=t,this.foods=[]}spawnNewPrey(){let e=this.getFreeBoardCell(),t=new P(e);return this.foods.push(t),t}getFreeBoardCell(){let e=this.gameControl.board.getUnoccupiedCells();return e[Math.floor(e.length*Math.random())]}reset(){this.foods=[]}draw(e){for(let t of this.foods){if(!t.enabled)continue;let n=this.gameControl.board.getBoardPos(t.cell.x),r=this.gameControl.board.getBoardPos(t.cell.y),l=this.gameControl.board.cellWidthPx/3,d=this.gameControl.board.cellWidthPx/5,h=Math.abs(Math.sin(Date.now()/100)),c=Math.min(1,(Date.now()-t.timeCreated)/400),m=g.lerp(d,l,h)*c;this.drawCtx.fillStyle="rgb(0,150,180)",this.drawCtx.beginPath(),this.drawCtx.arc(n,r,m,0,2*Math.PI),this.drawCtx.fill()}}}class P{constructor(e){this.enabled=!0,this.cell=e,this.timeCreated=Date.now()}}var x=u(579);class b{constructor(){this.directionRequests=new o,this.currentDirection=o.zero}onKeyDown(e){let t=this.keyToDirection(e.key),n=!this.isMoving();t.x&&(n||this.movingOnYAxis()||this.directionRequests.y)&&(this.directionRequests.x=t.x),t.y&&(n||this.movingOnXAxis()||this.directionRequests.x)&&(this.directionRequests.y=t.y)}keyToDirection(e){switch(e){case"ArrowUp":return o.up;case"ArrowDown":return o.down;case"ArrowLeft":return o.left;case"ArrowRight":return o.right;default:return o.zero}}updateDirection(){return this.currentDirection=this.checkForNewDirection()}checkForNewDirection(){let e=!this.isMoving(),t=this.consumeRequestedDirection(e);return t.equals(o.zero)?this.currentDirection:t}consumeRequestedDirection(e){if((this.movingOnXAxis()||e)&&this.directionRequests.y){let t=new o(0,this.directionRequests.y);return this.directionRequests.y=0,t}if((this.movingOnYAxis()||e)&&this.directionRequests.x){let t=new o(this.directionRequests.x,0);return this.directionRequests.x=0,t}return o.zero}isMoving(){return!this.currentDirection.equals(o.zero)}movingOnXAxis(){return 0!=this.currentDirection.x}movingOnYAxis(){return 0!=this.currentDirection.y}reset(){this.directionRequests=new o,this.currentDirection=o.zero}}class p{constructor(e,t=!1){var n,r;this.isControllable=!1,this._cell=o.zero,this._drawnPos=o.zero,this.attachedTo=e,this.isControllable=t,this._cell=null!==(r=null===(n=this.attachedTo)||void 0===n?void 0:n.cell)&&void 0!==r?r:this._cell,this._drawnPos.set(this._cell)}get cell(){return new o(this._cell.x,this._cell.y)}get drawnPos(){return new o(this._drawnPos.x,this._drawnPos.y)}moveToCell(e,t=!1){!this.isControllable||(this._cell=e,t&&(this._drawnPos=this._cell))}followSnake(){!this.attachedTo||(this._cell=this.attachedTo.cell)}moveDrawPosTowardsCell(e){isNaN(e)&&(e=0),this._drawnPos.x=g.lerp(this._drawnPos.x,this.cell.x,Math.min(e,1)),this._drawnPos.y=g.lerp(this._drawnPos.y,this.cell.y,Math.min(e,1))}}class M{constructor(e,t){this.snakeSegments=[],this.movementAntiSmooth=15,this.deathEvent=new x.x,this.atePreyEvent=new x.x,this.isDead=!1,this.drawCtx=t,this.gameControl=e,this.movementProcessor=new b,this.snakeHeadWidth=.9*this.gameControl.board.cellWidthPx,this.snakeHeadSegment=new p(null,!0),this.reset()}reset(){this.snakeSegments=[];let e=this.gameControl.board.getCenterCell();this.snakeHeadSegment.moveToCell(e,!0),this.gameControl.board.snakeHeadMovedIntoCell(e),this.snakeSegments.push(this.snakeHeadSegment),this.movementProcessor.reset(),this.isDead=!1,this.grow(),this.grow()}onKeyDown(e){this.movementProcessor.onKeyDown(e)}update(){let e=this.movementProcessor.updateDirection(),t=this.snakeHeadSegment.cell.add(e);this.cellIsInvalid(t)&&this.die(),this.moveIntoCell(t),this.prey.cell.round().equals(this.snakeHeadSegment.cell.round())&&(this.eat(),this.atePreyEvent.next(!0))}cellIsInvalid(e){return!this.gameControl.board.cellIsOnBoard(e)||this.cellIsInsidePlayer(e)}cellIsInsidePlayer(e){for(let t=1;t<this.snakeSegments.length-1;t++)if(this.snakeSegments[t].cell.round().equals(e.round()))return!0;return!1}moveIntoCell(e){let t=this.snakeSegments[this.snakeSegments.length-1].cell;[...this.snakeSegments].reverse().forEach(r=>{r.followSnake()}),this.snakeHeadSegment.moveToCell(e);let n=this.snakeSegments[this.snakeSegments.length-1].cell;t.round().equals(n.round())||this.gameControl.board.snakeTailLeftCell(t),this.gameControl.board.snakeHeadMovedIntoCell(e)}die(){this.isDead=!0,this.deathEvent.next(!0)}eat(){this.prey.enabled=!1,this.grow()}setPrey(e){this.prey=e}grow(){let t=new p(this.snakeSegments[this.snakeSegments.length-1]);this.snakeSegments.push(t)}draw(e){this.snakeSegments.forEach((l,d)=>{l.moveDrawPosTowardsCell(e*this.movementAntiSmooth)});let t=.5*this.snakeHeadWidth;this.drawCtx.strokeStyle="rgb(0,100,100)",this.drawCtx.lineWidth=t,this.drawCtx.lineJoin="round",this.drawCtx.beginPath(),this.drawCtx.moveTo(this.gameControl.board.getBoardPos(this.snakeSegments[this.snakeSegments.length-1].drawnPos.x),this.gameControl.board.getBoardPos(this.snakeSegments[this.snakeSegments.length-1].drawnPos.y)),[...this.snakeSegments].reverse().forEach(l=>{null!=l.attachedTo&&this.drawCtx.lineTo(this.gameControl.board.getBoardPos(l.attachedTo.drawnPos.x),this.gameControl.board.getBoardPos(l.attachedTo.drawnPos.y))}),this.drawCtx.stroke();let n=this.isDead?{r:200,g:50,b:50}:{r:50,g:175,b:115},r=this.isDead?{r:50,g:50,b:50}:{r:20,g:120,b:120};for(let l=this.snakeSegments.length-1;l>=0;l--){let d=this.snakeSegments[l],h=Math.max(0,1-l/5);this.drawCtx.fillStyle=`rgb(${g.lerp(r.r,n.r,h)}, ${g.lerp(r.g,n.g,h)}, ${g.lerp(r.b,n.b,h)})`;let c=this.snakeHeadWidth*(1-l/10);c=Math.max(c,1.2*t);let m=this.gameControl.board.getBoardPos(d.drawnPos.x)-c/2,I=this.gameControl.board.getBoardPos(d.drawnPos.y)-c/2;this.drawCtx.fillRect(m,I,c,c)}}}class S{constructor(e,t){this.score=0,this._gameState=a.MainMenu,this.boardNumCellsWide=9,this.updateFreqMs=250,this.arrowKeys=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],this.spaceCode="Space",this._gameState=a.MainMenu,this.board=new y(e,this.boardNumCellsWide,t),this.player=new M(this,e),this.player.deathEvent.subscribe(()=>{this.gameOver(!1)}),this.player.atePreyEvent.subscribe(()=>{this.onPreyEaten()}),this.preyDispenser=new v(this,e),this.setUpKeyboardListener(),this.resetGame()}get gameState(){return this._gameState}get onMainMenu(){return this._gameState==a.MainMenu}get isPlaying(){return this._gameState==a.Playing}get isGameOver(){return this._gameState==a.GameOver}get playerHasWon(){return this._gameState==a.Victorious}setUpKeyboardListener(){window.addEventListener("keydown",this.onKeyDown.bind(this))}onKeyDown(e){switch(this.gameState){case a.Playing:this.player.onKeyDown(e);break;case a.MainMenu:this.arrowKeys.includes(e.key)&&this.startGame(e);break;case a.GameOver:case a.Victorious:e.code==this.spaceCode&&this.goToMainMenu()}}draw(e){this.board.draw(e),this.player.draw(e),this.preyDispenser.draw(e)}startGame(e){this.player.onKeyDown(e),this._gameState=a.Playing,this.startUpdateLoop()}startUpdateLoop(){this.gameIntervalId=window.setInterval(()=>this.doGameUpdate(),this.updateFreqMs)}doGameUpdate(){this.player.update()}gameOver(e){this._gameState=e?a.Victorious:a.GameOver,window.clearInterval(this.gameIntervalId)}goToMainMenu(){this._gameState=a.MainMenu,this.resetGame()}resetGame(){this.preyDispenser.reset(),this.board.reset(),this.player.reset(),this.score=0,this.spawnPrey()}spawnPrey(){let e=this.preyDispenser.spawnNewPrey();this.player.setPrey(e)}onPreyEaten(){this.score++,this.board.getUnoccupiedCells().length>0?this.spawnPrey():this.gameOver(!0)}}var a=(()=>{return(i=a||(a={}))[i.MainMenu=0]="MainMenu",i[i.Playing=1]="Playing",i[i.GameOver=2]="GameOver",i[i.Victorious=3]="Victorious",a;var i})(),s=u(223);const k=["gameCanvas"];function D(i,e){1&i&&(s.TgZ(0,"div",6),s._uU(1," Press any arrow key to start! :D "),s.qZA())}function _(i,e){if(1&i&&(s.TgZ(0,"div",6)(1,"div",7),s._uU(2),s.qZA(),s.TgZ(3,"h1"),s._uU(4,"GAME OVER"),s.qZA(),s._uU(5," Press space to reset "),s.qZA()),2&i){const t=s.oxw();s.xp6(2),s.hij("Score: ",t.gameControl.score,"")}}function A(i,e){if(1&i&&(s.TgZ(0,"div",6)(1,"div",7),s._uU(2),s.qZA(),s.TgZ(3,"h1"),s._uU(4,"\u{1f60e} Victory! \u{1f60e}"),s.qZA(),s._uU(5," Press space to reset "),s.qZA()),2&i){const t=s.oxw();s.xp6(2),s.hij("Score: ",t.gameControl.score,"")}}function q(i,e){if(1&i&&(s.TgZ(0,"div",8)(1,"div",9),s._uU(2),s.qZA()()),2&i){const t=s.oxw();s.xp6(2),s.hij(" Score: ",t.gameControl.score," ")}}const T=[{path:"",component:(()=>{class i{constructor(){this.boardSizePx=800,this.boardFloatMag=5,this.boardFloatS=10,this.boardFloatDir=1}ngOnInit(){}ngAfterViewInit(){this.initObjects(),this.doAnimation()}initObjects(){this.setUpCanvas(this.gameCanvas),this.gameControl=new S(this.drawingContext,this.boardSizePx)}setUpCanvas(t){t.nativeElement.width=this.boardSizePx,t.nativeElement.height=this.boardSizePx,this.drawingContext=t.nativeElement.getContext("2d"),window.setInterval(()=>this.boardFloatingAnim(this.boardFloatMag),1e3*this.boardFloatS)}doAnimation(){this.animateCanvas(0),this.boardFloatingAnim(0)}animateCanvas(t){let n=t-this.timeLastFrame;this.timeLastFrame=t,n/=1e3,this.drawingContext.clearRect(0,0,this.boardSizePx,this.boardSizePx),this.gameControl.draw(n),window.requestAnimationFrame(r=>this.animateCanvas(r))}boardFloatingAnim(t){this.boardFloatDir=-1*this.boardFloatDir,this.gameCanvas.nativeElement.style.setProperty("--canvas-y",this.boardFloatDir*t+"%"),this.gameCanvas.nativeElement.style.setProperty("--canvas-shifttime",`${this.boardFloatS}s`)}}return i.\u0275fac=function(t){return new(t||i)},i.\u0275cmp=s.Xpm({type:i,selectors:[["app-snek-module"]],viewQuery:function(t,n){if(1&t&&s.Gf(k,5),2&t){let r;s.iGM(r=s.CRH())&&(n.gameCanvas=r.first)}},decls:8,vars:4,consts:[["id","game-bg"],["id","menu-text-container"],["class","info-text",4,"ngIf"],["id","game-text-container",4,"ngIf"],["id","gameCanvas"],["gameCanvas",""],[1,"info-text"],[1,"score-text"],["id","game-text-container"],["id","ingame-score"]],template:function(t,n){if(1&t&&(s.TgZ(0,"div",0)(1,"div",1),s.YNc(2,D,2,0,"div",2),s.YNc(3,_,6,1,"div",2),s.YNc(4,A,6,1,"div",2),s.qZA(),s.YNc(5,q,3,1,"div",3),s._UZ(6,"canvas",4,5),s.qZA()),2&t){let r,l,d,h;s.xp6(2),s.Q6J("ngIf",null!==(r=null==n.gameControl?null:n.gameControl.onMainMenu)&&void 0!==r&&r),s.xp6(1),s.Q6J("ngIf",null!==(l=null==n.gameControl?null:n.gameControl.isGameOver)&&void 0!==l&&l),s.xp6(1),s.Q6J("ngIf",null!==(d=null==n.gameControl?null:n.gameControl.playerHasWon)&&void 0!==d&&d),s.xp6(1),s.Q6J("ngIf",null!==(h=null==n.gameControl?null:n.gameControl.isPlaying)&&void 0!==h&&h)}},directives:[C.O5],styles:["@import\"https://fonts.googleapis.com/css2?family=Fredoka One&display=swap\";*[_ngcontent-%COMP%]{font-family:Fredoka One,Arial,Helvetica,sans-serif}#game-bg[_ngcontent-%COMP%]{width:100vw;height:100vh;background-color:#dbe5de;background-image:url(\"data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%2392aca7' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\");position:relative;display:inline-block}#gameCanvas[_ngcontent-%COMP%]{position:relative;top:50%;left:50%;transform:translate(-50%,calc(-50% + var(--canvas-y)));border:2px solid rgb(230,230,230);border-radius:5px;background-color:#d5e3db;box-shadow:0 30px 100px #026a7c81;max-width:90%;max-height:90%;transition:transform var(--canvas-shifttime) ease-in-out}#menu-text-container[_ngcontent-%COMP%]{z-index:1;width:100vw;height:100vh;position:absolute;text-align:center;display:flex;justify-content:center;align-items:center}.score-text[_ngcontent-%COMP%], .info-text[_ngcontent-%COMP%]{font-size:30px}#game-text-container[_ngcontent-%COMP%]{z-index:1;width:100vw;height:100vh;position:absolute;font-size:30px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}#ingame-score[_ngcontent-%COMP%]{margin-top:auto;margin-bottom:10px;bottom:0}"]}),i})()}];let W=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=s.oAB({type:i}),i.\u0275inj=s.cJS({imports:[[f.Bz.forChild(T)],f.Bz]}),i})(),O=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=s.oAB({type:i}),i.\u0275inj=s.cJS({imports:[[C.ez,W]]}),i})()}}]);
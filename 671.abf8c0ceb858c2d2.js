"use strict";(self.webpackChunkmisc_stuff=self.webpackChunkmisc_stuff||[]).push([[671],{312:(B,x,u)=>{u.r(x),u.d(x,{SnekModuleModule:()=>E});var f=u(808),p=u(879);class g{static lerp(e,t,n){return e*(1-n)+t*n}}class r{constructor(e=0,t=0){this.x=e,this.y=t}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}set(e){this.x=e.x,this.y=e.y}add(e){return new r(this.x+e.x,this.y+e.y)}equals(e){let t=this.round(),n=e.round();return t.x==n.x&&t.y==n.y}get copy(){return new r(this.x,this.y)}static get up(){return new r(0,-1)}static get down(){return new r(0,1)}static get left(){return new r(-1,0)}static get right(){return new r(1,0)}static get zero(){return new r(0,0)}}class P{constructor(e,t,n){this.tileColor="#b8d2cd",this.tileShadowColor="#acccc6",this.tileShadowVisiblePx=3,this.freeCells=[],this.drawCtx=e,this.numCellsWide=t,this.boardWidthPx=n,this._cellWidthPx=this.boardWidthPx/t,this.reset()}get cellWidthPx(){return this._cellWidthPx}draw(e){for(let t=0;t<this.numCellsWide;t++)for(let n=0;n<this.numCellsWide;n++)(t+n)%2!=0&&(this.drawCtx.fillStyle=this.tileShadowColor,this.drawCtx.fillRect(t*this.cellWidthPx,n*this.cellWidthPx,this._cellWidthPx,this._cellWidthPx),this.drawCtx.fillStyle=this.tileColor,this.drawCtx.fillRect(t*this.cellWidthPx,n*this.cellWidthPx,this._cellWidthPx-this.tileShadowVisiblePx,this._cellWidthPx-this.tileShadowVisiblePx))}reset(){this.constructFreeCellsArray()}getBoardPosI(e){return e*this.cellWidthPx+this.cellWidthPx/2}getBoardPos(e){return new r(this.getBoardPosI(e.x),this.getBoardPosI(e.y))}getCenterCell(){let e=Math.floor(this.numCellsWide/2);return new r(e,e)}cellIsOnBoard(e){return e.round(),e.x>=0&&e.x<this.numCellsWide&&e.y>=0&&e.y<this.numCellsWide}constructFreeCellsArray(){this.freeCells=[];for(let e=0;e<this.numCellsWide;e++)for(let t=0;t<this.numCellsWide;t++)this.freeCells.push(new r(t,e))}snakeHeadMovedIntoCell(e){this.freeCells=this.freeCells.filter(t=>!t.equals(e))}snakeTailLeftCell(e){this.freeCells.push(e)}getUnoccupiedCells(){return[...this.freeCells]}}class S{constructor(e,t){this.gameControl=e,this.drawCtx=t,this.foods=[],this.spinSpeed=.2,this.bounceSpeed=.005}spawnNewPrey(){let e=this.getFreeBoardCell(),t=new M(e);return this.foods.push(t),t}getFreeBoardCell(){let e=this.gameControl.board.getUnoccupiedCells();return e[Math.floor(e.length*Math.random())]}reset(){this.foods=[]}draw(e){for(let t of this.foods){if(!t.enabled)continue;this.drawCtx.fillStyle="rgb(0,150,180)";let n=this.gameControl.board.cellWidthPx/2.1,l=this.gameControl.board.cellWidthPx/2.5,a=Math.sin(t.timeAlive()*this.bounceSpeed),h=t.getSpawnScalePerc(),o=g.lerp(l,n,a)*h,w=this.gameControl.board.getBoardPosI(t.cell.x)-o/2,C=this.gameControl.board.getBoardPosI(t.cell.y)-o/2,c=o/2;this.drawCtx.save(),this.drawCtx.translate(w+c,C+c),this.drawCtx.rotate(t.timeAlive()*this.spinSpeed*Math.PI/180),this.drawCtx.fillRect(-c,-c,o,o),this.drawCtx.restore()}}}class M{constructor(e){this.spawnSpeed=400,this._enabled=!0,this.wasEaten=!1,this.cell=e,this.timeCreated=Date.now()}get enabled(){return this._enabled}timeAlive(){return Date.now()-this.timeCreated}timeSinceEaten(){return Date.now()-this.timeEaten}getEaten(){this.wasEaten=!0,this.timeEaten=Date.now()}getSpawnScalePerc(){let e=Math.min(1,this.timeAlive()/this.spawnSpeed),t=1;return this.wasEaten&&(t=1-Math.min(1,Math.max(0,this.timeSinceEaten()/this.spawnSpeed)),0==t&&(this._enabled=!1)),e*t}}var y=u(579);class b{constructor(){this.directionRequests=new r,this.currentDirection=r.zero}onKeyDown(e){let t=this.keyToDirection(e.key),n=!this.isMoving();t.x&&(n||this.movingOnYAxis()||this.directionRequests.y)&&(this.directionRequests.x=t.x),t.y&&(n||this.movingOnXAxis()||this.directionRequests.x)&&(this.directionRequests.y=t.y)}keyToDirection(e){switch(e){case"ArrowUp":return r.up;case"ArrowDown":return r.down;case"ArrowLeft":return r.left;case"ArrowRight":return r.right;default:return r.zero}}updateDirection(){return this.currentDirection=this.checkForNewDirection()}checkForNewDirection(){let e=!this.isMoving(),t=this.consumeRequestedDirection(e);return t.equals(r.zero)?this.currentDirection:t}consumeRequestedDirection(e){if((this.movingOnXAxis()||e)&&this.directionRequests.y){let t=new r(0,this.directionRequests.y);return this.directionRequests.y=0,t}if((this.movingOnYAxis()||e)&&this.directionRequests.x){let t=new r(this.directionRequests.x,0);return this.directionRequests.x=0,t}return r.zero}isMoving(){return!this.currentDirection.equals(r.zero)}movingOnXAxis(){return 0!=this.currentDirection.x}movingOnYAxis(){return 0!=this.currentDirection.y}reset(){this.directionRequests=new r,this.currentDirection=r.zero}}class v{constructor(e,t=!1){var n,l,a,h;this.isControllable=!1,this._cell=r.zero,this._lastCell=r.zero,this._drawnPos=r.zero,this._attachedTo=e,this.isControllable=t,this._cell.set(null!==(l=null===(n=this.attachedTo)||void 0===n?void 0:n.cell)&&void 0!==l?l:this._cell),this._drawnPos.set(null!==(h=null===(a=this.attachedTo)||void 0===a?void 0:a.drawnPos)&&void 0!==h?h:this.cell),this._lastCell.set(this._cell)}get attachedTo(){return this._attachedTo}get cell(){return this._cell.copy}get lastCell(){return this._lastCell.copy}get drawnPos(){return new r(this._drawnPos.x,this._drawnPos.y)}moveToCell(e,t=!1){!this.isControllable||(this._lastCell.set(this._cell),this._cell.set(e),t&&(this._drawnPos.set(this._cell),this._lastCell.set(this._cell)))}followSnake(){this._lastCell.set(this._cell),this.attachedTo&&this._cell.set(this.attachedTo.cell)}moveDrawPosTowardsCell(e){isNaN(e)&&(e=0),this._drawnPos.x=g.lerp(this._drawnPos.x,this.cell.x,Math.min(e,1)),this._drawnPos.y=g.lerp(this._drawnPos.y,this.cell.y,Math.min(e,1))}}class k{constructor(e,t){this.snakeSegments=[],this.movementAntiSmooth=12,this.deathEvent=new y.x,this.atePreyEvent=new y.x,this.isDead=!1,this.drawCtx=t,this.g=e,this.movementProcessor=new b,this.snakeHeadWidth=this.g.board.cellWidthPx,this.reset()}reset(){this.snakeSegments=[],this.snakeHeadSegment=new v(null,!0),this.snakeSegments.push(this.snakeHeadSegment);let e=this.g.board.getCenterCell();this.snakeHeadSegment.moveToCell(e,!0),this.g.board.snakeHeadMovedIntoCell(e),this.movementProcessor.reset(),this.isDead=!1,this.grow(),this.grow()}onKeyDown(e){this.movementProcessor.onKeyDown(e)}update(){let e=this.movementProcessor.updateDirection(),t=this.snakeHeadSegment.cell.add(e);this.cellWillKillPlayer(t)&&this.die(),this.moveIntoCell(t),this.prey.cell.equals(this.snakeHeadSegment.cell)&&(this.eat(),this.atePreyEvent.next(!0))}cellWillKillPlayer(e){let t=this.cellIsInsidePlayer(e)&&!e.equals(this.tail().cell);return!this.g.board.cellIsOnBoard(e)||t}tail(){return this.snakeSegments[this.snakeSegments.length-1]}cellIsInsidePlayer(e){for(let t=0;t<this.snakeSegments.length;t++)if(this.snakeSegments[t].cell.equals(e))return!0;return!1}moveIntoCell(e){let t=this.tail().cell;[...this.snakeSegments].reverse().forEach(l=>{l.followSnake()}),this.snakeHeadSegment.moveToCell(e);let n=this.tail().cell;t.equals(n)||this.g.board.snakeTailLeftCell(t),this.g.board.snakeHeadMovedIntoCell(e)}die(){this.isDead=!0,this.deathEvent.next(!0)}eat(){this.prey.getEaten(),this.grow()}setPrey(e){this.prey=e}grow(){let e=new v(this.tail());this.snakeSegments.push(e)}draw(e){this.snakeSegments.forEach((a,h)=>{a.moveDrawPosTowardsCell(e*this.movementAntiSmooth)}),this.drawCtx.lineWidth=.7*this.snakeHeadWidth,this.drawCtx.strokeStyle="rgb(0,100,100)",this.drawCtx.lineJoin="round",this.drawCtx.lineCap="round",this.drawCtx.beginPath();let t=this.g.board.getBoardPos(this.tail().drawnPos);this.drawCtx.moveTo(t.x,t.y);for(let a=this.snakeSegments.length-1;a>=0;--a){let h=this.snakeSegments[a];if(0==a){let o=this.g.board.getBoardPos(h.drawnPos);this.drawCtx.lineTo(o.x,o.y)}else{let o=this.g.board.getBoardPos(h.cell);this.drawCtx.lineTo(o.x,o.y)}}this.drawCtx.stroke();let n=this.isDead?{r:200,g:50,b:50}:{r:50,g:175,b:115},l=this.isDead?{r:50,g:50,b:50}:{r:20,g:120,b:120};for(let a=this.snakeSegments.length-1;a>=0;a--){let h=this.snakeSegments[a],o=Math.max(0,1-a/5);this.drawCtx.fillStyle=`rgb(${g.lerp(l.r,n.r,o)}, ${g.lerp(l.g,n.g,o)}, ${g.lerp(l.b,n.b,o)})`;let c=this.snakeHeadWidth*(1-a/12);c=Math.max(.3*this.snakeHeadWidth,c);let R=this.g.board.getBoardPosI(h.drawnPos.x)-c/2,z=this.g.board.getBoardPosI(h.drawnPos.y)-c/2,m=c/2;this.drawCtx.save(),this.drawCtx.translate(R+m,z+m),this.drawCtx.rotate(45*Math.PI/180),this.drawCtx.fillRect(-m,-m,c,c),this.drawCtx.restore()}}}class _{constructor(e,t){this.score=0,this._gameState=d.MainMenu,this.boardNumCellsWide=9,this.updateFreqMs=250,this.arrowKeys=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],this.spaceCode="Space",this._gameState=d.MainMenu,this.board=new P(e,this.boardNumCellsWide,t),this.player=new k(this,e),this.player.deathEvent.subscribe(()=>{this.gameOver(!1)}),this.player.atePreyEvent.subscribe(()=>{this.onPreyEaten()}),this.preyDispenser=new S(this,e),this.setUpKeyboardListener(),this.resetGame()}get gameState(){return this._gameState}get onMainMenu(){return this._gameState==d.MainMenu}get isPlaying(){return this._gameState==d.Playing}get isGameOver(){return this._gameState==d.GameOver}get playerHasWon(){return this._gameState==d.Victorious}setUpKeyboardListener(){window.addEventListener("keydown",this.onKeyDown.bind(this))}onKeyDown(e){switch(this.gameState){case d.Playing:this.player.onKeyDown(e);break;case d.MainMenu:this.arrowKeys.includes(e.key)&&this.startGame(e);break;case d.GameOver:case d.Victorious:e.code==this.spaceCode&&this.goToMainMenu()}}draw(e){this.board.draw(e),this.preyDispenser.draw(e),this.player.draw(e)}startGame(e){this.player.onKeyDown(e),this._gameState=d.Playing,this.startUpdateLoop()}startUpdateLoop(){this.gameIntervalId=window.setInterval(()=>this.doGameUpdate(),this.updateFreqMs)}doGameUpdate(){this.player.update()}gameOver(e){this._gameState=e?d.Victorious:d.GameOver,window.clearInterval(this.gameIntervalId)}goToMainMenu(){this._gameState=d.MainMenu,this.resetGame()}resetGame(){this.preyDispenser.reset(),this.board.reset(),this.player.reset(),this.score=0,this.spawnPrey()}onPreyEaten(){this.score++,this.board.getUnoccupiedCells().length>0?this.spawnPrey():this.gameOver(!0)}spawnPrey(){let e=this.preyDispenser.spawnNewPrey();this.player.setPrey(e)}}var d=(()=>{return(s=d||(d={}))[s.MainMenu=0]="MainMenu",s[s.Playing=1]="Playing",s[s.GameOver=2]="GameOver",s[s.Victorious=3]="Victorious",d;var s})(),i=u(223);const D=["gameCanvas"];function A(s,e){1&s&&(i.TgZ(0,"div",7),i._uU(1," Press any arrow key to start! :D "),i.qZA())}function W(s,e){if(1&s&&(i.TgZ(0,"div",8)(1,"div",9),i._uU(2),i.qZA(),i.TgZ(3,"h1"),i._uU(4,"GAME OVER"),i.qZA(),i._uU(5," Press space to reset "),i.qZA()),2&s){const t=i.oxw();i.xp6(2),i.hij("Score: ",t.gameControl.score,"")}}function I(s,e){if(1&s&&(i.TgZ(0,"div",7)(1,"div",9),i._uU(2),i.qZA(),i.TgZ(3,"h1"),i._uU(4,"\u{1f60e} Victory! \u{1f60e}"),i.qZA(),i._uU(5," Press space to reset "),i.qZA()),2&s){const t=i.oxw();i.xp6(2),i.hij("Score: ",t.gameControl.score,"")}}function T(s,e){if(1&s&&(i.TgZ(0,"div",10)(1,"div",11),i._uU(2),i.qZA()()),2&s){const t=i.oxw();i.xp6(2),i.hij(" Score: ",t.gameControl.score," ")}}const q=[{path:"",component:(()=>{class s{constructor(){this.boardSizePx=500,this.boardFloatMag=5,this.boardFloatS=10,this.boardFloatDir=1}ngOnInit(){}ngAfterViewInit(){this.initObjects(),this.doAnimation()}initObjects(){this.setUpCanvas(this.gameCanvas),this.gameControl=new _(this.drawingContext,this.boardSizePx)}setUpCanvas(t){t.nativeElement.width=this.boardSizePx,t.nativeElement.height=this.boardSizePx,this.drawingContext=t.nativeElement.getContext("2d"),window.setInterval(()=>this.boardFloatingAnim(this.boardFloatMag),1e3*this.boardFloatS)}doAnimation(){this.animateCanvas(0),this.boardFloatingAnim(0)}animateCanvas(t){let n=t-this.timeLastFrame;this.timeLastFrame=t,n/=1e3;let l=Math.sin(Date.now()/5e3)*this.boardFloatMag;this.gameCanvas.nativeElement.style.setProperty("--canvas-y",`${l}%`),this.drawingContext.clearRect(0,0,this.boardSizePx,this.boardSizePx),this.gameControl.draw(n),window.requestAnimationFrame(a=>this.animateCanvas(a))}boardFloatingAnim(t){}}return s.\u0275fac=function(t){return new(t||s)},s.\u0275cmp=i.Xpm({type:s,selectors:[["app-snek-module"]],viewQuery:function(t,n){if(1&t&&i.Gf(D,5),2&t){let l;i.iGM(l=i.CRH())&&(n.gameCanvas=l.first)}},decls:8,vars:4,consts:[["id","game-bg"],["id","menu-text-container"],["class","menu-text",4,"ngIf"],["class","menu-text text-light",4,"ngIf"],["id","game-text-container",4,"ngIf"],["id","gameCanvas"],["gameCanvas",""],[1,"menu-text"],[1,"menu-text","text-light"],[1,"score-text"],["id","game-text-container"],["id","ingame-score"]],template:function(t,n){if(1&t&&(i.TgZ(0,"div",0)(1,"div",1),i.YNc(2,A,2,0,"div",2),i.YNc(3,W,6,1,"div",3),i.YNc(4,I,6,1,"div",2),i.qZA(),i.YNc(5,T,3,1,"div",4),i._UZ(6,"canvas",5,6),i.qZA()),2&t){let l,a,h,o;i.xp6(2),i.Q6J("ngIf",null!==(l=null==n.gameControl?null:n.gameControl.onMainMenu)&&void 0!==l&&l),i.xp6(1),i.Q6J("ngIf",null!==(a=null==n.gameControl?null:n.gameControl.isGameOver)&&void 0!==a&&a),i.xp6(1),i.Q6J("ngIf",null!==(h=null==n.gameControl?null:n.gameControl.playerHasWon)&&void 0!==h&&h),i.xp6(1),i.Q6J("ngIf",null!==(o=null==n.gameControl?null:n.gameControl.isPlaying)&&void 0!==o&&o)}},directives:[f.O5],styles:["@import\"https://fonts.googleapis.com/css2?family=Fredoka One&display=swap\";*[_ngcontent-%COMP%]{font-family:Fredoka One,Arial,Helvetica,sans-serif}#game-bg[_ngcontent-%COMP%]{width:100vw;height:100vh;background-color:#dbe5de;background-image:url(\"data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%2392aca7' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\");position:relative;display:inline-block}#gameCanvas[_ngcontent-%COMP%]{position:relative;top:50%;left:50%;transform:translate(-50%,calc(-50% + var(--canvas-y)));border:2px solid rgb(230,230,230);border-radius:25px;background-color:#d5e3db;box-shadow:0 30px 100px #026a7c81;max-width:90%;max-height:90%;transition:transform var(--canvas-shifttime) ease-in-out}#menu-text-container[_ngcontent-%COMP%]{z-index:1;width:100vw;height:100vh;position:absolute;text-align:center;display:flex;justify-content:center;align-items:center}.menu-text[_ngcontent-%COMP%]{font-size:30px}.text-light[_ngcontent-%COMP%]{text-shadow:0px 5px 30px rgba(255,255,255,.534)}#game-text-container[_ngcontent-%COMP%]{z-index:1;width:100vw;height:100vh;position:absolute;font-size:30px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}#ingame-score[_ngcontent-%COMP%]{margin-top:auto;margin-bottom:10px;bottom:0}"]}),s})()}];let O=(()=>{class s{}return s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=i.oAB({type:s}),s.\u0275inj=i.cJS({imports:[[p.Bz.forChild(q)],p.Bz]}),s})(),E=(()=>{class s{}return s.\u0275fac=function(t){return new(t||s)},s.\u0275mod=i.oAB({type:s}),s.\u0275inj=i.cJS({imports:[[f.ez,O]]}),s})()}}]);
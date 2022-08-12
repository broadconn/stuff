import { Player } from './player.js'
import { InputHandler } from './input.js' 

class Game {
    constructor (width, height){
        this.width = width;
        this.height = height;

        this.player = new Player(this);
        this.input = new InputHandler();
    }

    //triggered every frame
    update(){
        this.player.update(this.input.keysPressed);
    }

    draw(context){
        this.player.draw(context);
    }
} 

function animate(timestamp){ 
    window.ctx.clearRect(0, 0, canvas.width, canvas.height);
    window.game.update();
    window.game.draw(window.ctx);
    requestAnimationFrame(animate);
} 

// starting the game here ensures all images are loaded
window.addEventListener('load', function() {
    window.canvas = document.getElementById("gameCanvas");
    window.canvas.width = 500;
    window.canvas.height = 500; 

    window.game = new Game(canvas.width, canvas.height); 
    window.ctx = canvas.getContext('2d');
 
    window.requestAnimationFrame(animate);
})
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
        this.player.update();
    }

    draw(context){
        this.player.draw(context);
    }
}

function setUpAnimation(game, ctx, canvas){
    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
}

window.addEventListener('load', function() {
    const canvas = document.getElementById("gameCanvas");
    canvas.width = 500;
    canvas.height = 500; 

    const game = new Game(canvas.width, canvas.height);
    console.log(game);

    const ctx = canvas.getContext('2d');
    setUpAnimation(game, ctx, canvas);
})
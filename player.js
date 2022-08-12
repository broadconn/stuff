export class Player {
    constructor(game){
        this.game = game;

        this.width = 100;
        this.height = 91.3;

        this.x = 0;
        this.y = this.game.height - this.height;

        this.image = document.getElementById("player");
    }

    update(inputKeys) { 
        console.log(inputKeys);
        if(inputKeys.includes('ArrowRight')) this.x++;
        if(inputKeys.includes('ArrowLeft')) this.x--;
        if(inputKeys.includes('ArrowUp')) this.y--;
        if(inputKeys.includes('ArrowDown')) this.y++;
    }
    
    draw(context){
        context.fillStyle = 'red';
        context.fillRect(this.x, this.y, this.width, this.height);

        // let cropX = 0;
        // let cropY = 0;
        // context.drawImage(this.image, cropX, cropY, this.width, this.height, this.x, this.y, this.width, this.height)
    }
}
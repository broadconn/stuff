export class InputHandler {    
    constructor(){
        this.keysRecognised = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
        this.keysPressed = [];
        
        // keep track of all keys pressed down at the same time
        // consider changing this to keep a list of the latest keys input? so the snake always follows the latest input when it wants to move?
        window.addEventListener('keydown', e => {
            if(this.keysRecognised.indexOf(e.key) >= 0 && this.keysPressed.indexOf(e.key) < 0)
                this.keysPressed.push(e.key); 
            //console.log(e.key, this.keys);
        });
        
        window.addEventListener('keyup', e => {
            if(this.keysRecognised.indexOf(e.key) >= 0)
                this.keysPressed.splice(this.keysPressed.indexOf(e.key), 1); 
            //console.log(e.key, this.keys);
        });
    }
}
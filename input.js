export class InputHandler {
    constructor(){
        this.keys = [];
        window.addEventListener('keydown', e => {
            console.log(e.key);
        });
    }
}
import CanvasManager from './demo1/CanvasManager';
import CanvasManager2 from './demo2/CanvasManager';

export default class App{
    constructor(){
        this.init();
    }

    private init():void{
        const canvas = document.body.querySelector('.js-canvas');
        const demo = parseInt(canvas.getAttribute('data-demo'));

        switch(demo){
            case 1:
                new CanvasManager();
                break;
            case 2:
                new CanvasManager2();
            break;
        }
    }
}

/**
 * IIFE for starting the app
 */
(()=>{
    new App();
})();
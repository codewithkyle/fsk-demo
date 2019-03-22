import Demo1 from './demo1/CanvasManager';
import Demo2 from './demo2/CanvasManager';
import Demo3 from './demo3/CanvasManager';
import Demo4 from './demo4/CanvasManager';

export default class App{
    constructor(){
        this.init();
    }

    private init():void{
        const canvas = document.body.querySelector('.js-canvas');
        const demo = parseInt(canvas.getAttribute('data-demo'));

        switch(demo){
            case 1:
                new Demo1();
                break;
            case 2:
                new Demo2();
                break;
            case 3:
                new Demo3();
                break;
            case 4:
                new Demo4();
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
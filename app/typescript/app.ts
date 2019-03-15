import CanvasManager from './canvas/CanvasManager';

export default class App{
    private CanvasManager:CanvasManager;

    constructor(){
        this.CanvasManager = new CanvasManager();
    }
}

/**
 * IIFE for starting the app
 */
(()=>{
    new App();
})();
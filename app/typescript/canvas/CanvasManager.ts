export default class CanvasManager{
    
    // Canvas
    private canvas:     HTMLCanvasElement;
    private context:    CanvasRenderingContext2D;

    // Timing
    private time:       number;
    
    constructor(){

        this.canvas = document.body.querySelector('.js-canvas');
        if(this.canvas === null){ console.log(`%c[Canvas Manager] %ccouldn't find the canvas element`, 'color:#f4f94f', 'color:#eee'); }else{ console.log(`%c[Canvas Manager] %cfound the canvas element`, 'color:#f4f94f', 'color:#eee'); }
        this.context = this.canvas.getContext('2d');
        console.log(`%c[Canvas Manager] %csetting the context to 2d`, 'color:#f4f94f', 'color:#eee');

        this.time = null;

        this.init();
    }

    /**
     * Called when the `CanvasManager` is constructed.
     */
    private init():void{
        this.time = performance.now();
        this.loop();
    }

    /**
     * Called on the DOMs reapaint using `requestAnimationFrame`.
     */
    private loop():void{
        const newTime:number    = performance.now();
        const deltaTime:number  = (newTime - this.time) / 1000;
        this.time               = newTime;

        requestAnimationFrame(()=>{ this.loop() });
    }
}
import InteractiveObject from "../InteractiveObject";

export default class Block extends InteractiveObject{

    public size:   ISize;

    constructor(canvas:HTMLCanvasElement, id:number, position:IPosition){
        super(canvas, id, position, { width: 48, height: 48 });
    }

    /**
     * Called by the `InteractiveObject` class when the `Block` is constructed.
     */
    init():void{
        
    }

    /**
     * Called on `requestAnimationFrame` from the `CanvasManager`
     * @param { number } deltaTime 
     */
    update(deltaTime:number):void{

        // Apply friction to the object
        this.velocity.deltaY *= InteractiveObject.FRICTION;

        // Increase gravity velocity
        this.velocity.deltaY += (deltaTime * InteractiveObject.GRAVITY_SPEED) + InteractiveObject.GRAVITY;

        // Update objects position
        this.position.y += this.velocity.deltaY;

        // Limit object to the screen
        if(this.position.y >= (this.canvas.height - this.size.height)){
            this.velocity.deltaY = 0;
            this.position.y = this.canvas.height - this.size.height;
        }
    }
}
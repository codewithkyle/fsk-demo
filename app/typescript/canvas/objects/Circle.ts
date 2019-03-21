import InteractiveObject from "../InteractiveObject";
import getRandomInt from "../../utils/getRandomInt";

export default class Circle extends InteractiveObject{

    public size:    ISize;
    public radius:  number;

    private _maxRadiusSize: number;

    constructor(canvas:HTMLCanvasElement, id:number, position:IPosition){
        super(canvas, id, position, { width: 48, height: 48 });

        this.radius = 0;
        this._maxRadiusSize = getRandomInt(4, 32);

        this.velocity.deltaX    = getRandomInt(1,12);
        this.velocity.deltaY    = getRandomInt(1,12);

        // Allow negative values
        if(getRandomInt(0, 1) === 0){ this.velocity.deltaX *= -1; }
        if(getRandomInt(0, 1) === 0){ this.velocity.deltaY *= -1; }
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

        // Adjust size until max size
        if(this.radius < this._maxRadiusSize){
            this.radius += (deltaTime * 512);
        }else{
            this.radius = this._maxRadiusSize;
        }

        this.velocity.deltaX += deltaTime * this.velocity.deltaX;
        this.velocity.deltaY += deltaTime * this.velocity.deltaY;

        this.position.x += this.velocity.deltaX;
        this.position.y += this.velocity.deltaY;

        // Get center position of the object
        const centerXPosition = this.position.x + (this.radius / 2);
        const centerYPosition = this.position.y + (this.radius / 2);
        
        // If the circle is off the screen, kill it
        if(centerXPosition >= this.canvas.width || centerXPosition <= 0 || centerYPosition >= this.canvas.height || centerYPosition <= 0){
            this.isDead = true;
        }
    }
}
import getRandomInt from '../utils/getRandomInt';

export default class Bubble{

    public position:    IPosition;
    public rotation:    number;
    public color:       string;
    public velocity:    IVelocity;
    public radius:      number;
    public id:          number;
    public isDead:      boolean;
    public markedForDeath:  boolean;
    public mass:        number;

    public canvas:    HTMLCanvasElement;
    
    constructor(canvas:HTMLCanvasElement, id:number, pos:IPosition, size:number = 64, rot:number = 0){
        this.position   = pos;
        this.rotation   = rot;
        this.radius     = size;
        this.id         = id;
        this.isDead     = false;
        this.color      = `${ getRandomInt(0,355) },${ getRandomInt(96, 99) }%,${ getRandomInt(65, 70) }%`;
        this.mass       = 1;
        this.velocity   = {
            deltaX: getRandomInt(1,6),
            deltaY: getRandomInt(1,6)
        }
        if(getRandomInt(0, 1) === 0){ this.velocity.deltaX *= -1; }
        if(getRandomInt(0, 1) === 0){ this.velocity.deltaY *= -1; }

        this.canvas    = canvas;
        
        this.init();
    }

    /**
     * Called when the `Bubble` is constructed.
     */
    public init():void{}

    public pop():void{
        if(this.radius >= 16){
            this.radius = this.radius / 2;
        }
    }

    public update(deltaTime:number):void{
        
        if(this.markedForDeath){
            this.radius *= 0.92;

            if(this.radius <= 1){
                this.isDead = true;
            }
        }

        // Update position
        this.position.x += this.velocity.deltaX;
        this.position.y += this.velocity.deltaY;

        // Check for out of bounds
        const right     = this.position.x + (this.radius / 2);
        const bottom    = this.position.y + (this.radius / 2);
        const left      = this.position.x - (this.radius / 2);
        const top       = this.position.y - (this.radius / 2);

        if(left < 0){
            // Hit screen left
            this.position.x = this.radius / 2;
            this.velocity.deltaX *= -1;
        }
        if(top < 0){
            // Hit screen top
            this.position.y = this.radius / 2;
            this.velocity.deltaY *= -1;
        }
        if(right > this.canvas.width){
            // Hit screen right
            this.position.x = (this.canvas.width - (this.radius / 2));
            this.velocity.deltaX *= -1;
        }
        if(bottom > this.canvas.height){
            // Hit screen bottom
            this.position.y = (this.canvas.height - (this.radius / 2));
            this.velocity.deltaY *= -1;
        }
    }
}
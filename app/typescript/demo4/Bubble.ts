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
    public opacity:     number;

    public canvas:    HTMLCanvasElement;
    
    constructor(canvas:HTMLCanvasElement, id:number, pos:IPosition, size:number = 64, rot:number = 0){
        this.position   = pos;
        this.rotation   = rot;
        this.radius     = size;
        this.id         = id;
        this.isDead     = false;
        this.color      = this.getColor();
        this.opacity    = 0.05;
        this.mass       = 1;
        this.velocity   = {
            deltaX: getRandomInt(1,2),
            deltaY: getRandomInt(1,2)
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

    private getColor():string{
        const colorID:number    = getRandomInt(1, 5);

        switch(colorID){
            case 1:
                return '11, 86%, 90%';
            case 2:
                return '47, 92%, 81%';
            case 3:
                return '90, 61%, 65%';
            case 4:
                return '182, 49%, 80%';
            default:
                return '26, 0%, 67%';
        }
    }

    public updateOpacity(deltaTime:number, direction:number):void{
        this.opacity += ((deltaTime * direction) * 0.0099);

        if(this.opacity >= 0.3){
            this.opacity = 0.3;
        }
        else if(this.opacity <= 0.05){
            this.opacity = 0.05;
        }
    }

    public update(deltaTime:number):void{

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
import getRandomInt from './utils/getRandomInt';

export default class InteractiveObject{
    
    public static GRAVITY:number        = 1;
    public static GRAVITY_SPEED:number  = 64;
    public static FRICTION:number       = 0.97;

    public position:    IPosition;
    public rotation:    number;
    public color:       string;
    public velocity:    IVelocity;
    public size:        ISize;
    public id:          number;

    public canvas:    HTMLCanvasElement;
    
    constructor(canvas:HTMLCanvasElement, id:number, pos:IPosition, size:ISize, rot:number = 0){
        this.position   = pos;
        this.rotation   = rot;
        this.size       = size;
        this.id         = id;

        this.color      = `rgba(${ getRandomInt(0,255) },${ getRandomInt(0,255) },${ getRandomInt(0,255) },0.87)`;

        this.velocity   = { deltaX: 0, deltaY: 0 };

        this.canvas    = canvas;
        
        this.init();
    }

    /**
     * Called when the `InteractiveBlock` is constructed.
     */
    public init():void{}

    public update(deltaTime:number):void{}
}
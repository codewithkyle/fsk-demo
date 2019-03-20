import InteractiveObject from "../InteractiveObject";
import getRandomInt from "../utils/getRandomInt";

export default class Circle extends InteractiveObject{

    public size:    ISize;
    public radius:  number;

    private _maxRadiusSize: number;

    constructor(canvas:HTMLCanvasElement, id:number, position:IPosition){
        super(canvas, id, position, { width: 48, height: 48 });

        this.radius = 0;
        this._maxRadiusSize = getRandomInt(8, 24);
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
        if(this.radius < this._maxRadiusSize){
            this.radius += (deltaTime * 128);
        }else{
            this.radius = this._maxRadiusSize;
        }
    }
}
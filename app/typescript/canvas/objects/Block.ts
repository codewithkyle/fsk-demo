import InteractiveObject from "../InteractiveObject";

export default class Block extends InteractiveObject{

    public size:   ISize;

    constructor(position:IPosition){
        super(position);

        this.size   = { width: 48, height: 48 };
    }

    /**
     * Called by the `InteractiveObject` class when the `Block` is constructed.
     */
    init():void{
        
    }
}
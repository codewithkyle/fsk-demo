export default class InteractiveObject{
    
    public position:    IPosition;
    public rotation:    number;
    public color:       string;
    
    constructor(pos:IPosition, rot:number = 0){
        this.position   = pos;
        this.rotation   = rot;

        this.color      = `rgba(${ this.getRandomInt(0,255) },${ this.getRandomInt(0,255) },${ this.getRandomInt(0,255) },0.87)`;
        
        this.init();
    }

    private getRandomInt(min:number, max:number):number{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Called when the `InteractiveBlock` is constructed.
     */
    public init():void{}
}
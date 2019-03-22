import Block from './objects/Block';
import detectCollision from '../utils/aabb';
import getCollisionResponse from '../utils/collisionResonse';
import Circle from './objects/Circle';
import getRandomInt from '../utils/getRandomInt';

export default class CanvasManager{
    
    // Canvas
    public canvas:      HTMLCanvasElement;
    private _context:   CanvasRenderingContext2D;

    // Timing
    private _time:  number;
    private _countdown: number;

    // Mouse tracking
    private _mouse:     IMouse;

    // Blocks
    private _blocks:    Array<Block>;
    private _bubbles:   Array<Circle>;
    
    constructor(){
        this.canvas = document.body.querySelector('.js-canvas');
        if(this.canvas === null){ console.log(`%c[Canvas Manager] %ccouldn't find the canvas element`, 'color:#f4f94f', 'color:#eee'); }else{ console.log(`%c[Canvas Manager] %cfound the canvas element`, 'color:#f4f94f', 'color:#eee'); }
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this._context = this.canvas.getContext('2d');
        console.log(`%c[Canvas Manager] %csetting the context to 2d`, 'color:#f4f94f', 'color:#eee');

        this._time      = null;
        this._countdown = 2;
        this._blocks    = [];
        this._bubbles   = [];
        this._mouse     = { x:this.canvas.width / 2, y: this.canvas.height / 2, prevX: this.canvas.width / 2, prevY:this.canvas.height / 2, isActive: false };

        this.init();
    }

    /**
     * Called when the `CanvasManager` is constructed.
     */
    private init():void{
        // this.spawnBlocks();

        document.body.addEventListener('mousedown', this.handleMouseDown);
        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        document.body.addEventListener('mouseup', this.handleMouseUp);
        
        this._time = performance.now();
        requestAnimationFrame(this.loop);
    }

    /**
     * Called when the user presses down the mouse button.
     */
    private handleMouseDown:EventListener = (e:MouseEvent)=>{
        const scrollOffset      = window.scrollY;
        this._mouse.isActive    = true;
        this._mouse.prevX       = this._mouse.x;
        this._mouse.prevY       = this._mouse.y;
        this._mouse.x           = e.x;
        this._mouse.y           = (e.y + scrollOffset);
        this._countdown         = getRandomInt(0, 2);
        this.spawnCircles();
    }

    /**
     * Called whenever the mouse is moving over the canvas.
     */
    private handleMouseMove:EventListener = (e:MouseEvent)=>{
        const scrollOffset  = window.scrollY;
        this._mouse.prevX   = this._mouse.x;
        this._mouse.prevY   = this._mouse.y;
        this._mouse.x       = e.x;
        this._mouse.y       = (e.y + scrollOffset);
    }

    /**
     * Called when the user releases the mouse button.
     */
    private handleMouseUp:EventListener = (e:MouseEvent)=>{
        const scrollOffset      = window.scrollY;
        this._mouse.isActive    = false;
        this._mouse.prevX       = this._mouse.x;
        this._mouse.prevY       = this._mouse.y;
        this._mouse.x           = e.x;
        this._mouse.y           = (e.y + scrollOffset);
    }

    /**
     * Called when the user presses down the mouse button.
     * Used to spawn `Cicle` objects.
     */
    private spawnCircles():void{
        const circleCount = getRandomInt(12, 24);

        for(let i = 0; i < circleCount; i++){
            const position:IPosition    = { x: this._mouse.x, y: this._mouse.y };
            const newBubble = new Circle(this.canvas, this._bubbles.length, position);
            this._bubbles.push(newBubble);
        }
    }

    /**
     * Used to spawn a grid of 9 `Block` objects.
     */
    private spawnBlocks():void{
        let id = 0;
        for(let x = 0; x < 3; x++){
            for(let y = 0; y < 3; y++){
                const blockPosition:IPosition = {
                    x: (x * 48 + (x * 8)),
                    y: (y * 48 + (y * 8))
                };
                const newBlock = new Block(this.canvas, id, blockPosition);
                this._blocks.push(newBlock);
                id++;
            }
        }
    }

    private draw():void{
        // Clear the canvas at the beginning of each frame
        this._context.clearRect(0,0,this.canvas.width, this.canvas.height);

        // Draw blocks
        for(let i = 0; i < this._blocks.length; i++){
            this._context.fillStyle = this._blocks[i].color;
            this._context.fillRect(this._blocks[i].position.x, this._blocks[i].position.y, this._blocks[i].size.width, this._blocks[i].size.height);
        }

        // Draw bubbles
        for(let i = 0; i < this._bubbles.length; i++){
            this._context.beginPath();
            this._context.arc(this._bubbles[i].position.x, this._bubbles[i].position.y, this._bubbles[i].radius, 0, (2 * Math.PI));
            this._context.fillStyle = this._bubbles[i].color;
            this._context.fill();
            this._context.closePath();
        }
    }

    private update(deltaTime:number):void{
        // Update countdown
        this._countdown -= deltaTime;

        if(this._countdown <= 0){
            this._countdown = getRandomInt(0, 2);
            this.spawnCircles();
        }
        
        // Update objects position
        for(let i = this._blocks.length - 1; i >= 0; i--){
            this._blocks[i].update(deltaTime);

            // Check for collisions
            for(let k = 0; k < this._blocks.length; k++){
                if(this._blocks[i].id !== this._blocks[k].id){
                    if(detectCollision(this._blocks[i], this._blocks[k])){
                        
                        // Handle collision
                        const collisionReponse:ICollisionResponse = getCollisionResponse(this._blocks[i], this._blocks[k]);
                        if(collisionReponse.x !== 0){
                            this._blocks[i].position.x = collisionReponse.x;
                        }else{
                            this._blocks[i].position.y = collisionReponse.y;
                            this._blocks[i].velocity.deltaY = 1;
                        }
                    }
                }
            }
        }

        const deadBubbles:Array<Circle> = [];
        for(let i = 0; i < this._bubbles.length; i++){
            this._bubbles[i].update(deltaTime);

            if(this._bubbles[i].isDead){
                deadBubbles.push(this._bubbles[i]);
            }
        }

        // If bubbles are marked for death, destroy them
        if(deadBubbles.length > 0){
            for(let i = 0; i < deadBubbles.length; i++){
                const index = this._bubbles.indexOf(deadBubbles[i]);
                this._bubbles.splice(index, 1);
            }
        }
    }

    /**
     * Called on the DOMs reapaint using `requestAnimationFrame`.
     */
    private loop:FrameRequestCallback = ()=>{
        const newTime:number    = performance.now();
        const deltaTime:number  = (newTime - this._time) / 1000;
        this._time               = newTime;

        this.update(deltaTime);
        this.draw();

        requestAnimationFrame(this.loop);
    }
}
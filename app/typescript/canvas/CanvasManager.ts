import Block from './objects/Block';

import getDistance from './utils/distance';
import detectCollision from './utils/aabb';
import getCollisionResponse from './utils/collisionResonse';

export default class CanvasManager{
    
    // Canvas
    public canvas:      HTMLCanvasElement;
    private _context:   CanvasRenderingContext2D;

    // Timing
    private _time:  number;

    // Blocks
    private _blocks:    Array<Block>;
    
    constructor(){
        this.canvas = document.body.querySelector('.js-canvas');
        if(this.canvas === null){ console.log(`%c[Canvas Manager] %ccouldn't find the canvas element`, 'color:#f4f94f', 'color:#eee'); }else{ console.log(`%c[Canvas Manager] %cfound the canvas element`, 'color:#f4f94f', 'color:#eee'); }
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this._context = this.canvas.getContext('2d');
        console.log(`%c[Canvas Manager] %csetting the context to 2d`, 'color:#f4f94f', 'color:#eee');

        this._time = null;
        this._blocks = [];

        this.init();
    }

    /**
     * Called when the `CanvasManager` is constructed.
     */
    private init():void{
        this.spawnBlocks();
        
        this._time = performance.now();
        requestAnimationFrame(this.loop);
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

        for(let i = 0; i < this._blocks.length; i++){
            this._context.fillStyle = this._blocks[i].color;
            this._context.fillRect(this._blocks[i].position.x, this._blocks[i].position.y, this._blocks[i].size.width, this._blocks[i].size.height);
        }
    }

    private update(deltaTime:number):void{
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
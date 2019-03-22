import getRandomInt from '../utils/getRandomInt';
import Bubble from './Bubble';
import checkCollision from '../utils/circleCollision';
import rotate from '../utils/rotate';

export default class CanvasManager{
    
    // Canvas
    public canvas:      HTMLCanvasElement;
    private _context:   CanvasRenderingContext2D;

    // Timing
    private _time:  number;
    private _countdown: number;

    // Mouse tracking
    private _mouse:     IMouse;
    
    // Bubbles
    private _bubbles:   Array<Bubble>;
    private _id:        number;

    private _paused:    boolean;

    constructor(){
        this.canvas = document.body.querySelector('.js-canvas');
        if(this.canvas === null){ console.log(`%c[Canvas Manager] %ccouldn't find the canvas element`, 'color:#f4f94f', 'color:#eee'); }else{ console.log(`%c[Canvas Manager] %cfound the canvas element`, 'color:#f4f94f', 'color:#eee'); }
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this._context = this.canvas.getContext('2d');
        console.log(`%c[Canvas Manager] %csetting the context to 2d`, 'color:#f4f94f', 'color:#eee');

        this._time      = null;
        this._countdown = 2;
        this._mouse     = { x:0, y:0, prevX:0, prevY:0, isActive: false };
        this._bubbles   = [];
        this._id        = 0;
        this._paused    = false;

        this.init();
    }

    /**
     * Called when the `CanvasManager` is constructed.
     */
    private init():void{
        this.spawnBubbles();

        document.body.addEventListener('mousedown', this.handleMouseDown);
        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        document.body.addEventListener('mouseup', this.handleMouseUp);

        window.addEventListener('keydown', this.pause);
        
        this._time = performance.now();
        requestAnimationFrame(this.loop);
    }

    private pause:EventListener = (e:KeyboardEvent)=>{
        if(e.key === ' ' && !this._paused){
            this._paused = true;
        }
        else if(e.key === ' ' && this._paused){
            this._paused = false;
        }
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
        this._countdown         = getRandomInt(1, 4);

        this.checkForPop();
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

    private checkForPop():void{
        const mousePosition:IPosition = {
            x: this._mouse.x,
            y: this._mouse.y
        }
        // Check if a bubble is under the events apex
        for(let i = 0; i < this._bubbles.length; i++){
            if(checkCollision(this._bubbles[i].position, mousePosition, this._bubbles[i].radius, 0)){
                if(this._bubbles[i].radius >= 16){
                    const newBubbleRadius = this._bubbles[i].radius / 2;
                    this._bubbles[i].pop();

                    const numberOfBubbles = getRandomInt(2, 4);
                    for(let i = 0; i <= numberOfBubbles; i++){
                        const randomPosition:IPosition ={
                            x: mousePosition.x,
                            y: mousePosition.y
                        }
                        const newBubble = new Bubble(this.canvas, this._id, randomPosition, newBubbleRadius);
                        this._bubbles.push(newBubble);
                        this._id++;
                    }
                }

                return;
            }
        }
    }

    private spawnBubbles():void{
        const numberOfBubbles = getRandomInt(4, 8);

        // Huge bubbles
        for(let i = 0; i <= numberOfBubbles; i++){
            const randomPosition:IPosition ={
                x: getRandomInt(64, (this.canvas.width - 64)) - 4,
                y: getRandomInt(64, (this.canvas.height - 64))
            }
            const newBubble = new Bubble(this.canvas, this._id, randomPosition);
            this._bubbles.push(newBubble);
            this._id++;
        }

        // Large bubbles
        for(let i = 0; i <= numberOfBubbles; i++){
            const randomPosition:IPosition ={
                x: getRandomInt(64, (this.canvas.width - 64)),
                y: getRandomInt(64, (this.canvas.height - 64))
            }
            const newBubble = new Bubble(this.canvas, this._id, randomPosition, 32);
            this._bubbles.push(newBubble);
            this._id++;
        }

        // Medium bubbles
        for(let i = 0; i <= numberOfBubbles; i++){
            const randomPosition:IPosition ={
                x: getRandomInt(64, (this.canvas.width - 64)),
                y: getRandomInt(64, (this.canvas.height - 64))
            }
            const newBubble = new Bubble(this.canvas, this._id, randomPosition, 16);
            this._bubbles.push(newBubble);
            this._id++;
        }

        // Small bubbles
        for(let i = 0; i <= numberOfBubbles; i++){
            const randomPosition:IPosition ={
                x: getRandomInt(64, (this.canvas.width - 64)),
                y: getRandomInt(64, (this.canvas.height - 64))
            }
            const newBubble = new Bubble(this.canvas, this._id, randomPosition, 8);
            this._bubbles.push(newBubble);
            this._id++;
        }
    }

    private resolveCollision(bubble1:Bubble, bubble2:Bubble):void{
        const xVelocityDiff = bubble1.velocity.deltaX - bubble2.velocity.deltaX;
        const yVelocityDiff = bubble1.velocity.deltaY - bubble2.velocity.deltaY;

        const xDist = bubble2.position.x - bubble1.position.x;
        const yDist = bubble2.position.y - bubble1.position.y;

        // Prevent accidental overlap of particles
        if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

            // Grab angle between the two colliding particles
            const angle = -Math.atan2(bubble2.position.y - bubble1.position.y, bubble2.position.x - bubble1.position.x);

            // Store mass in var for better readability in collision equation
            const m1 = bubble1.mass;
            const m2 = bubble2.mass;

            // Velocity before equation
            const u1 = rotate(bubble1.velocity, angle);
            const u2 = rotate(bubble2.velocity, angle);

            // Velocity after 1d collision equation
            const v1:IVelocity = { deltaX: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), deltaY: u1.y };
            const v2:IVelocity = { deltaX: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), deltaY: u2.y };

            // Final velocity after rotating axis back to original location
            const vFinal1 = rotate(v1, -angle);
            const vFinal2 = rotate(v2, -angle);

            // Swap particle velocities for realistic bounce effect
            bubble1.velocity.deltaX = vFinal1.x;
            bubble1.velocity.deltaY = vFinal1.y;

            bubble2.velocity.deltaX = vFinal2.x;
            bubble2.velocity.deltaY = vFinal2.y;
        }
    }

    private draw():void{
        // Clear the canvas at the beginning of each frame
        this._context.clearRect(0,0,this.canvas.width, this.canvas.height);

        // Draw bubbles
        for(let i = 0; i < this._bubbles.length; i++){
            this._context.beginPath();

            if(this._bubbles[i].radius >= 32){
                this._context.shadowColor = `hsla(${ this._bubbles[i].color }, 0.3)`;
                this._context.shadowBlur = this._bubbles[i].radius;
            }
            
            this._context.arc(this._bubbles[i].position.x, this._bubbles[i].position.y, this._bubbles[i].radius, 0, (2 * Math.PI));
            this._context.fillStyle = `hsla(${ this._bubbles[i].color }, 0.87)`;
            this._context.fill();
            this._context.closePath();
        }
    }

    private update(deltaTime:number):void{
        // Update countdown
        this._countdown -= deltaTime;

        if(this._countdown <= 0){
            this._countdown = getRandomInt(1, 4);
        }

        for(let i = 0; i < this._bubbles.length; i++){
            this._bubbles[i].update(deltaTime);

            // Check for collision
            for(let k = 0; k < this._bubbles.length; k++){
                if(this._bubbles[i].id !== this._bubbles[k].id){
                    if(checkCollision(this._bubbles[i].position, this._bubbles[k].position, this._bubbles[i].radius, this._bubbles[k].radius)){
                        this.resolveCollision(this._bubbles[i], this._bubbles[k]);
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

        if(!this._paused){
            this.update(deltaTime);
        }
        this.draw();

        requestAnimationFrame(this.loop);
    }
}
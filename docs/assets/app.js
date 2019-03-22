/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const CanvasManager_1 = __webpack_require__(1);
const CanvasManager_2 = __webpack_require__(8);
const CanvasManager_3 = __webpack_require__(12);
const CanvasManager_4 = __webpack_require__(14);
class App {
    constructor() {
        this.init();
    }
    init() {
        const canvas = document.body.querySelector('.js-canvas');
        const demo = parseInt(canvas.getAttribute('data-demo'));
        switch (demo) {
            case 1:
                new CanvasManager_1.default();
                break;
            case 2:
                new CanvasManager_2.default();
                break;
            case 3:
                new CanvasManager_3.default();
                break;
            case 4:
                new CanvasManager_4.default();
                break;
        }
    }
}
exports.default = App;
/**
 * IIFE for starting the app
 */
(() => {
    new App();
})();
//# sourceMappingURL=App.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Block_1 = __webpack_require__(2);
const aabb_1 = __webpack_require__(5);
const collisionResonse_1 = __webpack_require__(6);
const Circle_1 = __webpack_require__(7);
const getRandomInt_1 = __webpack_require__(4);
class CanvasManager {
    constructor() {
        /**
         * Called when the user presses down the mouse button.
         */
        this.handleMouseDown = (e) => {
            const scrollOffset = window.scrollY;
            this._mouse.isActive = true;
            this._mouse.prevX = this._mouse.x;
            this._mouse.prevY = this._mouse.y;
            this._mouse.x = e.x;
            this._mouse.y = (e.y + scrollOffset);
            this._countdown = getRandomInt_1.default(0, 2);
            this.spawnCircles();
        };
        /**
         * Called whenever the mouse is moving over the canvas.
         */
        this.handleMouseMove = (e) => {
            const scrollOffset = window.scrollY;
            this._mouse.prevX = this._mouse.x;
            this._mouse.prevY = this._mouse.y;
            this._mouse.x = e.x;
            this._mouse.y = (e.y + scrollOffset);
        };
        /**
         * Called when the user releases the mouse button.
         */
        this.handleMouseUp = (e) => {
            const scrollOffset = window.scrollY;
            this._mouse.isActive = false;
            this._mouse.prevX = this._mouse.x;
            this._mouse.prevY = this._mouse.y;
            this._mouse.x = e.x;
            this._mouse.y = (e.y + scrollOffset);
        };
        /**
         * Called on the DOMs reapaint using `requestAnimationFrame`.
         */
        this.loop = () => {
            const newTime = performance.now();
            const deltaTime = (newTime - this._time) / 1000;
            this._time = newTime;
            this.update(deltaTime);
            this.draw();
            requestAnimationFrame(this.loop);
        };
        this.canvas = document.body.querySelector('.js-canvas');
        if (this.canvas === null) {
            console.log(`%c[Canvas Manager] %ccouldn't find the canvas element`, 'color:#f4f94f', 'color:#eee');
        }
        else {
            console.log(`%c[Canvas Manager] %cfound the canvas element`, 'color:#f4f94f', 'color:#eee');
        }
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this._context = this.canvas.getContext('2d');
        console.log(`%c[Canvas Manager] %csetting the context to 2d`, 'color:#f4f94f', 'color:#eee');
        this._time = null;
        this._countdown = 2;
        this._blocks = [];
        this._bubbles = [];
        this._mouse = { x: this.canvas.width / 2, y: this.canvas.height / 2, prevX: this.canvas.width / 2, prevY: this.canvas.height / 2, isActive: false };
        this.init();
    }
    /**
     * Called when the `CanvasManager` is constructed.
     */
    init() {
        // this.spawnBlocks();
        document.body.addEventListener('mousedown', this.handleMouseDown);
        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        document.body.addEventListener('mouseup', this.handleMouseUp);
        this._time = performance.now();
        requestAnimationFrame(this.loop);
    }
    /**
     * Called when the user presses down the mouse button.
     * Used to spawn `Cicle` objects.
     */
    spawnCircles() {
        const circleCount = getRandomInt_1.default(12, 24);
        for (let i = 0; i < circleCount; i++) {
            const position = { x: this._mouse.x, y: this._mouse.y };
            const newBubble = new Circle_1.default(this.canvas, this._bubbles.length, position);
            this._bubbles.push(newBubble);
        }
    }
    /**
     * Used to spawn a grid of 9 `Block` objects.
     */
    spawnBlocks() {
        let id = 0;
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                const blockPosition = {
                    x: (x * 48 + (x * 8)),
                    y: (y * 48 + (y * 8))
                };
                const newBlock = new Block_1.default(this.canvas, id, blockPosition);
                this._blocks.push(newBlock);
                id++;
            }
        }
    }
    draw() {
        // Clear the canvas at the beginning of each frame
        this._context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw blocks
        for (let i = 0; i < this._blocks.length; i++) {
            this._context.fillStyle = this._blocks[i].color;
            this._context.fillRect(this._blocks[i].position.x, this._blocks[i].position.y, this._blocks[i].size.width, this._blocks[i].size.height);
        }
        // Draw bubbles
        for (let i = 0; i < this._bubbles.length; i++) {
            this._context.beginPath();
            this._context.arc(this._bubbles[i].position.x, this._bubbles[i].position.y, this._bubbles[i].radius, 0, (2 * Math.PI));
            this._context.fillStyle = this._bubbles[i].color;
            this._context.fill();
            this._context.closePath();
        }
    }
    update(deltaTime) {
        // Update countdown
        this._countdown -= deltaTime;
        if (this._countdown <= 0) {
            this._countdown = getRandomInt_1.default(0, 2);
            this.spawnCircles();
        }
        // Update objects position
        for (let i = this._blocks.length - 1; i >= 0; i--) {
            this._blocks[i].update(deltaTime);
            // Check for collisions
            for (let k = 0; k < this._blocks.length; k++) {
                if (this._blocks[i].id !== this._blocks[k].id) {
                    if (aabb_1.default(this._blocks[i], this._blocks[k])) {
                        // Handle collision
                        const collisionReponse = collisionResonse_1.default(this._blocks[i], this._blocks[k]);
                        if (collisionReponse.x !== 0) {
                            this._blocks[i].position.x = collisionReponse.x;
                        }
                        else {
                            this._blocks[i].position.y = collisionReponse.y;
                            this._blocks[i].velocity.deltaY = 1;
                        }
                    }
                }
            }
        }
        const deadBubbles = [];
        for (let i = 0; i < this._bubbles.length; i++) {
            this._bubbles[i].update(deltaTime);
            if (this._bubbles[i].isDead) {
                deadBubbles.push(this._bubbles[i]);
            }
        }
        // If bubbles are marked for death, destroy them
        if (deadBubbles.length > 0) {
            for (let i = 0; i < deadBubbles.length; i++) {
                const index = this._bubbles.indexOf(deadBubbles[i]);
                this._bubbles.splice(index, 1);
            }
        }
    }
}
exports.default = CanvasManager;
//# sourceMappingURL=CanvasManager.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InteractiveObject_1 = __webpack_require__(3);
class Block extends InteractiveObject_1.default {
    constructor(canvas, id, position) {
        super(canvas, id, position, { width: 48, height: 48 });
    }
    /**
     * Called by the `InteractiveObject` class when the `Block` is constructed.
     */
    init() {
    }
    /**
     * Called on `requestAnimationFrame` from the `CanvasManager`
     * @param { number } deltaTime
     */
    update(deltaTime) {
        // Apply friction to the object
        this.velocity.deltaY *= InteractiveObject_1.default.FRICTION;
        // Increase gravity velocity
        this.velocity.deltaY += (deltaTime * InteractiveObject_1.default.GRAVITY_SPEED) + InteractiveObject_1.default.GRAVITY;
        // Update objects position
        this.position.y += this.velocity.deltaY;
        // Limit object to the screen
        if (this.position.y >= (this.canvas.height - this.size.height)) {
            this.velocity.deltaY = 0;
            this.position.y = this.canvas.height - this.size.height;
        }
    }
}
exports.default = Block;
//# sourceMappingURL=Block.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const getRandomInt_1 = __webpack_require__(4);
class InteractiveObject {
    constructor(canvas, id, pos, size, rot = 0) {
        this.position = pos;
        this.rotation = rot;
        this.size = size;
        this.id = id;
        this.isDead = false;
        this.color = `hsla(${getRandomInt_1.default(0, 355)},${getRandomInt_1.default(92, 96)}%,${getRandomInt_1.default(70, 80)}%,0.87)`;
        this.velocity = { deltaX: 0, deltaY: 0 };
        this.canvas = canvas;
        this.init();
    }
    /**
     * Called when the `InteractiveBlock` is constructed.
     */
    init() { }
    update(deltaTime) { }
}
InteractiveObject.GRAVITY = 1;
InteractiveObject.GRAVITY_SPEED = 64;
InteractiveObject.FRICTION = 0.97;
exports.default = InteractiveObject;
//# sourceMappingURL=InteractiveObject.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Gets a random int between the two provided numbers.
 * @returns { number } `number`
 */
exports.default = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
//# sourceMappingURL=getRandomInt.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (object1, object2) => {
    let isColliding = false;
    if (object1.position.x <= object2.position.x + object2.size.width && object1.position.x + object1.size.width >= object2.position.x && object1.position.y <= object2.position.y + object2.size.height && object1.position.y + object1.size.height >= object2.position.y) {
        isColliding = true;
    }
    return isColliding;
};
//# sourceMappingURL=aabb.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Calculates the overlap between two AABB objects.
 * @returns { ICollisionResponse } `object`
 */
exports.default = (object1, object2) => {
    let collisionResponse = {
        x: 0,
        y: 0
    };
    const distanceX = (object1.position.x + (object1.size.width / 2)) - (object2.position.x + (object2.size.width / 2));
    const distanceY = (object1.position.y + (object1.size.height / 2)) - (object2.position.y + (object2.size.height / 2));
    // Check for Y or X collision
    if (distanceY * distanceY > distanceX * distanceX) {
        if (distanceY > 0) {
            // Resolve bottom
            collisionResponse.y = (object2.position.y + object2.size.height);
        }
        else {
            // Resolve up
            collisionResponse.y = (object2.position.y - object1.size.height);
        }
    }
    else {
        if (distanceX > 0) {
            // Resolve right
            collisionResponse.x = (object2.position.x + object2.size.width);
        }
        else {
            // Resolve left
            collisionResponse.x = (object2.position.x - object1.size.width);
        }
    }
    return collisionResponse;
};
//# sourceMappingURL=collisionResonse.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InteractiveObject_1 = __webpack_require__(3);
const getRandomInt_1 = __webpack_require__(4);
class Circle extends InteractiveObject_1.default {
    constructor(canvas, id, position) {
        super(canvas, id, position, { width: 48, height: 48 });
        this.radius = 0;
        this._maxRadiusSize = getRandomInt_1.default(4, 32);
        this.velocity.deltaX = getRandomInt_1.default(1, 12);
        this.velocity.deltaY = getRandomInt_1.default(1, 12);
        // Allow negative values
        if (getRandomInt_1.default(0, 1) === 0) {
            this.velocity.deltaX *= -1;
        }
        if (getRandomInt_1.default(0, 1) === 0) {
            this.velocity.deltaY *= -1;
        }
    }
    /**
     * Called by the `InteractiveObject` class when the `Block` is constructed.
     */
    init() {
    }
    /**
     * Called on `requestAnimationFrame` from the `CanvasManager`
     * @param { number } deltaTime
     */
    update(deltaTime) {
        // Adjust size until max size
        if (this.radius < this._maxRadiusSize) {
            this.radius += (deltaTime * 512);
        }
        else {
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
        if (centerXPosition >= this.canvas.width || centerXPosition <= 0 || centerYPosition >= this.canvas.height || centerYPosition <= 0) {
            this.isDead = true;
        }
    }
}
exports.default = Circle;
//# sourceMappingURL=Circle.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const getRandomInt_1 = __webpack_require__(4);
const Bubble_1 = __webpack_require__(9);
const circleCollision_1 = __webpack_require__(10);
const rotate_1 = __webpack_require__(11);
class CanvasManager {
    constructor() {
        this.pause = (e) => {
            if (e.key === ' ' && !this._paused) {
                this._paused = true;
            }
            else if (e.key === ' ' && this._paused) {
                this._paused = false;
            }
        };
        /**
         * Called when the user presses down the mouse button.
         */
        this.handleMouseDown = (e) => {
            const scrollOffset = window.scrollY;
            this._mouse.isActive = true;
            this._mouse.prevX = this._mouse.x;
            this._mouse.prevY = this._mouse.y;
            this._mouse.x = e.x;
            this._mouse.y = (e.y + scrollOffset);
            this._countdown = getRandomInt_1.default(1, 4);
            this.checkForPop();
        };
        /**
         * Called whenever the mouse is moving over the canvas.
         */
        this.handleMouseMove = (e) => {
            const scrollOffset = window.scrollY;
            this._mouse.prevX = this._mouse.x;
            this._mouse.prevY = this._mouse.y;
            this._mouse.x = e.x;
            this._mouse.y = (e.y + scrollOffset);
        };
        /**
         * Called when the user releases the mouse button.
         */
        this.handleMouseUp = (e) => {
            const scrollOffset = window.scrollY;
            this._mouse.isActive = false;
            this._mouse.prevX = this._mouse.x;
            this._mouse.prevY = this._mouse.y;
            this._mouse.x = e.x;
            this._mouse.y = (e.y + scrollOffset);
        };
        /**
         * Called on the DOMs reapaint using `requestAnimationFrame`.
         */
        this.loop = () => {
            const newTime = performance.now();
            const deltaTime = (newTime - this._time) / 1000;
            this._time = newTime;
            if (!this._paused) {
                this.update(deltaTime);
            }
            this.draw();
            requestAnimationFrame(this.loop);
        };
        this.canvas = document.body.querySelector('.js-canvas');
        if (this.canvas === null) {
            console.log(`%c[Canvas Manager] %ccouldn't find the canvas element`, 'color:#f4f94f', 'color:#eee');
        }
        else {
            console.log(`%c[Canvas Manager] %cfound the canvas element`, 'color:#f4f94f', 'color:#eee');
        }
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this._context = this.canvas.getContext('2d');
        console.log(`%c[Canvas Manager] %csetting the context to 2d`, 'color:#f4f94f', 'color:#eee');
        this._time = null;
        this._countdown = 2;
        this._mouse = { x: 0, y: 0, prevX: 0, prevY: 0, isActive: false };
        this._bubbles = [];
        this._id = 0;
        this._paused = false;
        this.init();
    }
    /**
     * Called when the `CanvasManager` is constructed.
     */
    init() {
        this.spawnBubbles();
        document.body.addEventListener('mousedown', this.handleMouseDown);
        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        document.body.addEventListener('mouseup', this.handleMouseUp);
        window.addEventListener('keydown', this.pause);
        this._time = performance.now();
        requestAnimationFrame(this.loop);
    }
    checkForPop() {
        const mousePosition = {
            x: this._mouse.x,
            y: this._mouse.y
        };
        // Check if a bubble is under the events apex
        for (let i = 0; i < this._bubbles.length; i++) {
            if (circleCollision_1.default(this._bubbles[i].position, mousePosition, this._bubbles[i].radius, 0)) {
                if (this._bubbles[i].radius >= 16) {
                    const newBubbleRadius = this._bubbles[i].radius / 2;
                    this._bubbles[i].pop();
                    const numberOfBubbles = getRandomInt_1.default(2, 4);
                    for (let i = 0; i <= numberOfBubbles; i++) {
                        const randomPosition = {
                            x: mousePosition.x,
                            y: mousePosition.y
                        };
                        const newBubble = new Bubble_1.default(this.canvas, this._id, randomPosition, newBubbleRadius);
                        this._bubbles.push(newBubble);
                        this._id++;
                    }
                }
                return;
            }
        }
    }
    spawnBubbles() {
        const numberOfBubbles = getRandomInt_1.default(4, 8);
        // Huge bubbles
        for (let i = 0; i <= numberOfBubbles; i++) {
            const randomPosition = {
                x: getRandomInt_1.default(64, (this.canvas.width - 64)) - 4,
                y: getRandomInt_1.default(64, (this.canvas.height - 64))
            };
            const newBubble = new Bubble_1.default(this.canvas, this._id, randomPosition);
            this._bubbles.push(newBubble);
            this._id++;
        }
        // Large bubbles
        for (let i = 0; i <= numberOfBubbles; i++) {
            const randomPosition = {
                x: getRandomInt_1.default(64, (this.canvas.width - 64)),
                y: getRandomInt_1.default(64, (this.canvas.height - 64))
            };
            const newBubble = new Bubble_1.default(this.canvas, this._id, randomPosition, 32);
            this._bubbles.push(newBubble);
            this._id++;
        }
        // Medium bubbles
        for (let i = 0; i <= numberOfBubbles; i++) {
            const randomPosition = {
                x: getRandomInt_1.default(64, (this.canvas.width - 64)),
                y: getRandomInt_1.default(64, (this.canvas.height - 64))
            };
            const newBubble = new Bubble_1.default(this.canvas, this._id, randomPosition, 16);
            this._bubbles.push(newBubble);
            this._id++;
        }
        // Small bubbles
        for (let i = 0; i <= numberOfBubbles; i++) {
            const randomPosition = {
                x: getRandomInt_1.default(64, (this.canvas.width - 64)),
                y: getRandomInt_1.default(64, (this.canvas.height - 64))
            };
            const newBubble = new Bubble_1.default(this.canvas, this._id, randomPosition, 8);
            this._bubbles.push(newBubble);
            this._id++;
        }
    }
    resolveCollision(bubble1, bubble2) {
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
            const u1 = rotate_1.default(bubble1.velocity, angle);
            const u2 = rotate_1.default(bubble2.velocity, angle);
            // Velocity after 1d collision equation
            const v1 = { deltaX: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), deltaY: u1.y };
            const v2 = { deltaX: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), deltaY: u2.y };
            // Final velocity after rotating axis back to original location
            const vFinal1 = rotate_1.default(v1, -angle);
            const vFinal2 = rotate_1.default(v2, -angle);
            // Swap particle velocities for realistic bounce effect
            bubble1.velocity.deltaX = vFinal1.x;
            bubble1.velocity.deltaY = vFinal1.y;
            bubble2.velocity.deltaX = vFinal2.x;
            bubble2.velocity.deltaY = vFinal2.y;
        }
    }
    draw() {
        // Clear the canvas at the beginning of each frame
        this._context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw bubbles
        for (let i = 0; i < this._bubbles.length; i++) {
            this._context.beginPath();
            if (this._bubbles[i].radius >= 32) {
                this._context.shadowColor = `hsla(${this._bubbles[i].color}, 0.3)`;
                this._context.shadowBlur = this._bubbles[i].radius;
            }
            this._context.arc(this._bubbles[i].position.x, this._bubbles[i].position.y, this._bubbles[i].radius, 0, (2 * Math.PI));
            this._context.fillStyle = `hsla(${this._bubbles[i].color}, 0.87)`;
            this._context.fill();
            this._context.closePath();
        }
    }
    update(deltaTime) {
        // Update countdown
        this._countdown -= deltaTime;
        if (this._countdown <= 0) {
            this._countdown = getRandomInt_1.default(1, 4);
        }
        for (let i = 0; i < this._bubbles.length; i++) {
            this._bubbles[i].update(deltaTime);
            // Check for collision
            for (let k = 0; k < this._bubbles.length; k++) {
                if (this._bubbles[i].id !== this._bubbles[k].id) {
                    if (circleCollision_1.default(this._bubbles[i].position, this._bubbles[k].position, this._bubbles[i].radius, this._bubbles[k].radius)) {
                        this.resolveCollision(this._bubbles[i], this._bubbles[k]);
                    }
                }
            }
        }
    }
}
exports.default = CanvasManager;
//# sourceMappingURL=CanvasManager.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const getRandomInt_1 = __webpack_require__(4);
class Bubble {
    constructor(canvas, id, pos, size = 64, rot = 0) {
        this.position = pos;
        this.rotation = rot;
        this.radius = size;
        this.id = id;
        this.isDead = false;
        this.color = `${getRandomInt_1.default(0, 355)},${getRandomInt_1.default(96, 99)}%,${getRandomInt_1.default(65, 70)}%`;
        this.mass = 1;
        this.velocity = {
            deltaX: getRandomInt_1.default(2, 8),
            deltaY: getRandomInt_1.default(2, 8)
        };
        if (getRandomInt_1.default(0, 1) === 0) {
            this.velocity.deltaX *= -1;
        }
        if (getRandomInt_1.default(0, 1) === 0) {
            this.velocity.deltaY *= -1;
        }
        this.canvas = canvas;
        this.init();
    }
    /**
     * Called when the `Bubble` is constructed.
     */
    init() { }
    pop() {
        if (this.radius >= 16) {
            this.radius = this.radius / 2;
        }
    }
    update(deltaTime) {
        // Apply friction
        // if(this.velocity.deltaX >= 1){
        //     this.velocity.deltaX *= 0.99;
        // }
        // if(this.velocity.deltaY >= 1){
        //     this.velocity.deltaY *= 0.99;
        // }
        // Update position
        this.position.x += this.velocity.deltaX;
        this.position.y += this.velocity.deltaY;
        // Check for out of bounds
        const right = this.position.x + (this.radius / 2);
        const bottom = this.position.y + (this.radius / 2);
        const left = this.position.x - (this.radius / 2);
        const top = this.position.y - (this.radius / 2);
        if (left < 0) {
            // Hit screen left
            this.position.x = this.radius / 2;
            this.velocity.deltaX *= -1;
        }
        if (top < 0) {
            // Hit screen top
            this.position.y = this.radius / 2;
            this.velocity.deltaY *= -1;
        }
        if (right > this.canvas.width) {
            // Hit screen right
            this.position.x = (this.canvas.width - (this.radius / 2));
            this.velocity.deltaX *= -1;
        }
        if (bottom > this.canvas.height) {
            // Hit screen bottom
            this.position.y = (this.canvas.height - (this.radius / 2));
            this.velocity.deltaY *= -1;
        }
    }
}
exports.default = Bubble;
//# sourceMappingURL=Bubble.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Gets the distance between two points.
 * @returns `distance`
 */
exports.default = (pos1, pos2, radius1, radius2) => {
    let isColliding = false;
    const xDistance = (pos1.x - pos2.x);
    const yDistance = (pos1.y - pos2.y);
    const distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    if (distance < (radius1 + radius2)) {
        isColliding = true;
    }
    return isColliding;
};
//# sourceMappingURL=circleCollision.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (velocity, angle) => {
    const rotatedVelocities = {
        x: velocity.deltaX * Math.cos(angle) - velocity.deltaY * Math.sin(angle),
        y: velocity.deltaX * Math.sin(angle) + velocity.deltaY * Math.cos(angle)
    };
    return rotatedVelocities;
};
//# sourceMappingURL=rotate.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const getRandomInt_1 = __webpack_require__(4);
const Bubble_1 = __webpack_require__(13);
const circleCollision_1 = __webpack_require__(10);
const rotate_1 = __webpack_require__(11);
class CanvasManager {
    constructor() {
        this.pause = (e) => {
            if (e.key === ' ' && !this._paused) {
                this._paused = true;
            }
            else if (e.key === ' ' && this._paused) {
                this._paused = false;
            }
        };
        /**
         * Called when the user presses down the mouse button.
         */
        this.handleMouseDown = (e) => {
            const scrollOffset = window.scrollY;
            this._mouse.isActive = true;
            this._mouse.prevX = this._mouse.x;
            this._mouse.prevY = this._mouse.y;
            this._mouse.x = e.x;
            this._mouse.y = (e.y + scrollOffset);
            this._countdown = getRandomInt_1.default(1, 4);
            this.bubbleBomb();
        };
        /**
         * Called whenever the mouse is moving over the canvas.
         */
        this.handleMouseMove = (e) => {
            const scrollOffset = window.scrollY;
            this._mouse.prevX = this._mouse.x;
            this._mouse.prevY = this._mouse.y;
            this._mouse.x = e.x;
            this._mouse.y = (e.y + scrollOffset);
        };
        /**
         * Called when the user releases the mouse button.
         */
        this.handleMouseUp = (e) => {
            const scrollOffset = window.scrollY;
            this._mouse.isActive = false;
            this._mouse.prevX = this._mouse.x;
            this._mouse.prevY = this._mouse.y;
            this._mouse.x = e.x;
            this._mouse.y = (e.y + scrollOffset);
        };
        /**
         * Called on the DOMs reapaint using `requestAnimationFrame`.
         */
        this.loop = () => {
            const newTime = performance.now();
            const deltaTime = (newTime - this._time) / 1000;
            this._time = newTime;
            if (!this._paused) {
                this.update(deltaTime);
            }
            this.draw();
            requestAnimationFrame(this.loop);
        };
        this.canvas = document.body.querySelector('.js-canvas');
        if (this.canvas === null) {
            console.log(`%c[Canvas Manager] %ccouldn't find the canvas element`, 'color:#f4f94f', 'color:#eee');
        }
        else {
            console.log(`%c[Canvas Manager] %cfound the canvas element`, 'color:#f4f94f', 'color:#eee');
        }
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this._context = this.canvas.getContext('2d');
        console.log(`%c[Canvas Manager] %csetting the context to 2d`, 'color:#f4f94f', 'color:#eee');
        this._time = null;
        this._countdown = 2;
        this._mouse = { x: 0, y: 0, prevX: 0, prevY: 0, isActive: false };
        this._bubbles = [];
        this._id = 0;
        this._paused = false;
        this.init();
    }
    /**
     * Called when the `CanvasManager` is constructed.
     */
    init() {
        this.spawnBubbles();
        document.body.addEventListener('mousedown', this.handleMouseDown);
        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        document.body.addEventListener('mouseup', this.handleMouseUp);
        window.addEventListener('keydown', this.pause);
        this._time = performance.now();
        requestAnimationFrame(this.loop);
    }
    bubbleBomb() {
        const numberOfBubbles = getRandomInt_1.default(4, 16);
        for (let i = 0; i <= numberOfBubbles; i++) {
            const mousePosition = {
                x: this._mouse.x,
                y: this._mouse.y
            };
            const newBubble = new Bubble_1.default(this.canvas, this._id, mousePosition, 8);
            this._bubbles.push(newBubble);
            this._id++;
        }
    }
    spawnBubbles() {
        const numberOfBubbles = getRandomInt_1.default(32, 64);
        for (let i = 0; i <= numberOfBubbles; i++) {
            const randomPosition = {
                x: getRandomInt_1.default(16, (this.canvas.width - 16)),
                y: getRandomInt_1.default(16, (this.canvas.height - 16))
            };
            const newBubble = new Bubble_1.default(this.canvas, this._id, randomPosition, 8);
            this._bubbles.push(newBubble);
            this._id++;
        }
    }
    resolveCollision(bubble1, bubble2) {
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
            const u1 = rotate_1.default(bubble1.velocity, angle);
            const u2 = rotate_1.default(bubble2.velocity, angle);
            // Velocity after 1d collision equation
            const v1 = { deltaX: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), deltaY: u1.y };
            const v2 = { deltaX: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), deltaY: u2.y };
            // Final velocity after rotating axis back to original location
            const vFinal1 = rotate_1.default(v1, -angle);
            const vFinal2 = rotate_1.default(v2, -angle);
            // Swap particle velocities for realistic bounce effect
            bubble1.velocity.deltaX = vFinal1.x;
            bubble1.velocity.deltaY = vFinal1.y;
            bubble2.velocity.deltaX = vFinal2.x;
            bubble2.velocity.deltaY = vFinal2.y;
        }
    }
    draw() {
        // Clear the canvas at the beginning of each frame
        this._context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw bubbles
        for (let i = 0; i < this._bubbles.length; i++) {
            this._context.beginPath();
            // this._context.shadowColor = `hsla(${ this._bubbles[i].color }, 0.15)`;
            // this._context.shadowBlur = this._bubbles[i].radius;
            this._context.arc(this._bubbles[i].position.x, this._bubbles[i].position.y, this._bubbles[i].radius, 0, (2 * Math.PI));
            this._context.fillStyle = `hsla(${this._bubbles[i].color}, 0.87)`;
            this._context.fill();
            this._context.closePath();
        }
    }
    update(deltaTime) {
        if (this._bubbles.length >= 256) {
            const overLimitAmount = this._bubbles.length - 256;
            for (let i = 0; i < overLimitAmount; i++) {
                this._bubbles[i].markedForDeath = true;
            }
        }
        const deadBubbles = [];
        for (let i = 0; i < this._bubbles.length; i++) {
            // Mark bubbles for death
            if (this._bubbles[i].isDead) {
                deadBubbles.push(this._bubbles[i]);
            }
            this._bubbles[i].update(deltaTime);
            // Check for collision
            for (let k = 0; k < this._bubbles.length; k++) {
                if (this._bubbles[i].id !== this._bubbles[k].id) {
                    if (circleCollision_1.default(this._bubbles[i].position, this._bubbles[k].position, this._bubbles[i].radius, this._bubbles[k].radius)) {
                        this.resolveCollision(this._bubbles[i], this._bubbles[k]);
                    }
                }
            }
        }
        // Remove dead bubbles
        if (deadBubbles.length) {
            for (let i = 0; i < deadBubbles.length; i++) {
                const index = this._bubbles.indexOf(deadBubbles[i]);
                this._bubbles.splice(index, 1);
            }
        }
    }
}
exports.default = CanvasManager;
//# sourceMappingURL=CanvasManager.js.map

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const getRandomInt_1 = __webpack_require__(4);
class Bubble {
    constructor(canvas, id, pos, size = 64, rot = 0) {
        this.position = pos;
        this.rotation = rot;
        this.radius = size;
        this.id = id;
        this.isDead = false;
        this.color = `${getRandomInt_1.default(0, 355)},${getRandomInt_1.default(96, 99)}%,${getRandomInt_1.default(65, 70)}%`;
        this.mass = 1;
        this.velocity = {
            deltaX: getRandomInt_1.default(1, 6),
            deltaY: getRandomInt_1.default(1, 6)
        };
        if (getRandomInt_1.default(0, 1) === 0) {
            this.velocity.deltaX *= -1;
        }
        if (getRandomInt_1.default(0, 1) === 0) {
            this.velocity.deltaY *= -1;
        }
        this.canvas = canvas;
        this.init();
    }
    /**
     * Called when the `Bubble` is constructed.
     */
    init() { }
    pop() {
        if (this.radius >= 16) {
            this.radius = this.radius / 2;
        }
    }
    update(deltaTime) {
        if (this.markedForDeath) {
            this.radius *= 0.92;
            if (this.radius <= 1) {
                this.isDead = true;
            }
        }
        // Update position
        this.position.x += this.velocity.deltaX;
        this.position.y += this.velocity.deltaY;
        // Check for out of bounds
        const right = this.position.x + (this.radius / 2);
        const bottom = this.position.y + (this.radius / 2);
        const left = this.position.x - (this.radius / 2);
        const top = this.position.y - (this.radius / 2);
        if (left < 0) {
            // Hit screen left
            this.position.x = this.radius / 2;
            this.velocity.deltaX *= -1;
        }
        if (top < 0) {
            // Hit screen top
            this.position.y = this.radius / 2;
            this.velocity.deltaY *= -1;
        }
        if (right > this.canvas.width) {
            // Hit screen right
            this.position.x = (this.canvas.width - (this.radius / 2));
            this.velocity.deltaX *= -1;
        }
        if (bottom > this.canvas.height) {
            // Hit screen bottom
            this.position.y = (this.canvas.height - (this.radius / 2));
            this.velocity.deltaY *= -1;
        }
    }
}
exports.default = Bubble;
//# sourceMappingURL=Bubble.js.map

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const getRandomInt_1 = __webpack_require__(4);
const Bubble_1 = __webpack_require__(15);
const circleCollision_1 = __webpack_require__(10);
const rotate_1 = __webpack_require__(11);
class CanvasManager {
    constructor() {
        this.pause = (e) => {
            if (e.key === ' ' && !this._paused) {
                this._paused = true;
            }
            else if (e.key === ' ' && this._paused) {
                this._paused = false;
            }
        };
        /**
         * Called when the user presses down the mouse button.
         */
        this.handleMouseDown = (e) => {
            const scrollOffset = window.scrollY;
            this._mouse.isActive = true;
            this._mouse.prevX = this._mouse.x;
            this._mouse.prevY = this._mouse.y;
            this._mouse.x = e.x;
            this._mouse.y = (e.y + scrollOffset);
        };
        /**
         * Called whenever the mouse is moving over the canvas.
         */
        this.handleMouseMove = (e) => {
            const scrollOffset = window.scrollY;
            this._mouse.prevX = this._mouse.x;
            this._mouse.prevY = this._mouse.y;
            this._mouse.x = e.x;
            this._mouse.y = (e.y + scrollOffset);
        };
        /**
         * Called when the user releases the mouse button.
         */
        this.handleMouseUp = (e) => {
            const scrollOffset = window.scrollY;
            this._mouse.isActive = false;
            this._mouse.prevX = this._mouse.x;
            this._mouse.prevY = this._mouse.y;
            this._mouse.x = e.x;
            this._mouse.y = (e.y + scrollOffset);
        };
        /**
         * Called on the DOMs reapaint using `requestAnimationFrame`.
         */
        this.loop = () => {
            const newTime = performance.now();
            const deltaTime = (newTime - this._time) / 1000;
            this._time = newTime;
            if (!this._paused) {
                this.update(deltaTime);
            }
            this.draw();
            requestAnimationFrame(this.loop);
        };
        this.canvas = document.body.querySelector('.js-canvas');
        if (this.canvas === null) {
            console.log(`%c[Canvas Manager] %ccouldn't find the canvas element`, 'color:#f4f94f', 'color:#eee');
        }
        else {
            console.log(`%c[Canvas Manager] %cfound the canvas element`, 'color:#f4f94f', 'color:#eee');
        }
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this._context = this.canvas.getContext('2d');
        console.log(`%c[Canvas Manager] %csetting the context to 2d`, 'color:#f4f94f', 'color:#eee');
        this._time = null;
        this._countdown = 2;
        this._mouse = { x: 0, y: 0, prevX: 0, prevY: 0, isActive: false };
        this._bubbles = [];
        this._id = 0;
        this._paused = false;
        this.init();
    }
    /**
     * Called when the `CanvasManager` is constructed.
     */
    init() {
        this.spawnBubbles();
        document.body.addEventListener('mousedown', this.handleMouseDown);
        this.canvas.addEventListener('mousemove', this.handleMouseMove);
        document.body.addEventListener('mouseup', this.handleMouseUp);
        window.addEventListener('keydown', this.pause);
        this._time = performance.now();
        requestAnimationFrame(this.loop);
    }
    spawnBubbles() {
        const numberOfBubbles = getRandomInt_1.default(150, 200);
        for (let i = 0; i <= numberOfBubbles; i++) {
            const randomPosition = {
                x: getRandomInt_1.default(16, (this.canvas.width - 16)),
                y: getRandomInt_1.default(16, (this.canvas.height - 16))
            };
            const newBubble = new Bubble_1.default(this.canvas, this._id, randomPosition, 32);
            this._bubbles.push(newBubble);
            this._id++;
        }
    }
    resolveCollision(bubble1, bubble2) {
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
            const u1 = rotate_1.default(bubble1.velocity, angle);
            const u2 = rotate_1.default(bubble2.velocity, angle);
            // Velocity after 1d collision equation
            const v1 = { deltaX: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), deltaY: u1.y };
            const v2 = { deltaX: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), deltaY: u2.y };
            // Final velocity after rotating axis back to original location
            const vFinal1 = rotate_1.default(v1, -angle);
            const vFinal2 = rotate_1.default(v2, -angle);
            // Swap particle velocities for realistic bounce effect
            bubble1.velocity.deltaX = vFinal1.x;
            bubble1.velocity.deltaY = vFinal1.y;
            bubble2.velocity.deltaX = vFinal2.x;
            bubble2.velocity.deltaY = vFinal2.y;
        }
    }
    draw() {
        // Clear the canvas at the beginning of each frame
        this._context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw bubbles
        for (let i = 0; i < this._bubbles.length; i++) {
            this._context.beginPath();
            this._context.arc(this._bubbles[i].position.x, this._bubbles[i].position.y, this._bubbles[i].radius, 0, (2 * Math.PI));
            this._context.lineWidth = 2;
            this._context.fillStyle = `hsla(${this._bubbles[i].color}, ${this._bubbles[i].opacity})`;
            this._context.strokeStyle = `hsla(${this._bubbles[i].color}, 0.87)`;
            this._context.stroke();
            this._context.fill();
            this._context.closePath();
        }
    }
    update(deltaTime) {
        const mousePosition = {
            x: this._mouse.x,
            y: this._mouse.y
        };
        for (let i = 0; i < this._bubbles.length; i++) {
            this._bubbles[i].update(deltaTime);
            // Check for collision
            for (let k = 0; k < this._bubbles.length; k++) {
                if (this._bubbles[i].id !== this._bubbles[k].id) {
                    if (circleCollision_1.default(this._bubbles[i].position, this._bubbles[k].position, this._bubbles[i].radius, this._bubbles[k].radius)) {
                        this.resolveCollision(this._bubbles[i], this._bubbles[k]);
                    }
                }
                if (circleCollision_1.default(this._bubbles[i].position, mousePosition, 256, 0)) {
                    this._bubbles[i].updateOpacity(deltaTime, 1);
                }
                else {
                    this._bubbles[i].updateOpacity(deltaTime, -1);
                }
            }
        }
    }
}
exports.default = CanvasManager;
//# sourceMappingURL=CanvasManager.js.map

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const getRandomInt_1 = __webpack_require__(4);
class Bubble {
    constructor(canvas, id, pos, size = 64, rot = 0) {
        this.position = pos;
        this.rotation = rot;
        this.radius = size;
        this.id = id;
        this.isDead = false;
        this.color = this.getColor();
        this.opacity = 0.05;
        this.mass = 1;
        this.velocity = {
            deltaX: getRandomInt_1.default(1, 2),
            deltaY: getRandomInt_1.default(1, 2)
        };
        if (getRandomInt_1.default(0, 1) === 0) {
            this.velocity.deltaX *= -1;
        }
        if (getRandomInt_1.default(0, 1) === 0) {
            this.velocity.deltaY *= -1;
        }
        this.canvas = canvas;
        this.init();
    }
    /**
     * Called when the `Bubble` is constructed.
     */
    init() { }
    getColor() {
        const colorID = getRandomInt_1.default(1, 5);
        switch (colorID) {
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
    updateOpacity(deltaTime, direction) {
        this.opacity += ((deltaTime * direction) * 0.0099);
        if (this.opacity >= 0.3) {
            this.opacity = 0.3;
        }
        else if (this.opacity <= 0.05) {
            this.opacity = 0.05;
        }
    }
    update(deltaTime) {
        // Update position
        this.position.x += this.velocity.deltaX;
        this.position.y += this.velocity.deltaY;
        // Check for out of bounds
        const right = this.position.x + (this.radius / 2);
        const bottom = this.position.y + (this.radius / 2);
        const left = this.position.x - (this.radius / 2);
        const top = this.position.y - (this.radius / 2);
        if (left < 0) {
            // Hit screen left
            this.position.x = this.radius / 2;
            this.velocity.deltaX *= -1;
        }
        if (top < 0) {
            // Hit screen top
            this.position.y = this.radius / 2;
            this.velocity.deltaY *= -1;
        }
        if (right > this.canvas.width) {
            // Hit screen right
            this.position.x = (this.canvas.width - (this.radius / 2));
            this.velocity.deltaX *= -1;
        }
        if (bottom > this.canvas.height) {
            // Hit screen bottom
            this.position.y = (this.canvas.height - (this.radius / 2));
            this.velocity.deltaY *= -1;
        }
    }
}
exports.default = Bubble;
//# sourceMappingURL=Bubble.js.map

/***/ })
/******/ ]);
declare module 'animejs';

interface IPosition{
    x:  number;
    y:  number;
}

interface ISize{
    width:  number;
    height: number;
}

interface IVelocity{
    deltaX:  number;
    deltaY:  number;
}

interface ICollisionResponse{
    x:  number;
    y:  number;
}

interface IMouse{
    x:  number;
    y:  number;
    prevX:  number;
    prevY:  number;
    isActive:   boolean;
}
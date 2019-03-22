export default (velocity:IVelocity, angle:number)=>{
    const rotatedVelocities:IPosition = {
        x: velocity.deltaX * Math.cos(angle) - velocity.deltaY * Math.sin(angle),
        y: velocity.deltaX * Math.sin(angle) + velocity.deltaY * Math.cos(angle)
    };

    return rotatedVelocities;
}
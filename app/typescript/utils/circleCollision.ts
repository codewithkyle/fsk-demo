/**
 * Gets the distance between two points.
 * @returns `distance`
 */
export default (pos1:IPosition, pos2:IPosition, radius1:number, radius2:number)=>{
    let isColliding:boolean = false;

    const xDistance = (pos1.x - pos2.x);
    const yDistance = (pos1.y - pos2.y);

    const distance = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

    if(distance < (radius1 + radius2)){
        isColliding = true;
    }

    return isColliding;
}
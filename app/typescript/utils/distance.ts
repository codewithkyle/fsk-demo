/**
 * Gets the distance between two points.
 * @returns `distance`
 */
export default (pos1:IPosition, pos2:IPosition)=>{
    const xDistance = (pos1.x - pos2.x);
    const yDistance = (pos1.y - pos2.y);

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
/**
 * Gets the distance between two points.
 * @returns `distance`
 */
export default (x1:number, y1:number, x2:number, y2:number)=>{
    const xDistance = (x2 - x1);
    const yDistance = (y2 - y1);

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
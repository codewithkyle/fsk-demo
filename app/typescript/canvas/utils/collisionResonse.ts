import InteractiveObject from "../InteractiveObject";

/**
 * Calculates the overlap between two AABB objects.
 * @returns { ICollisionResponse } `object`
 */
export default (object1:InteractiveObject, object2:InteractiveObject)=>{
    let collisionResponse:ICollisionResponse = {
        x: 0,
        y: 0
    };

    const distanceX:number  = (object1.position.x + (object1.size.width / 2)) - (object2.position.x + (object2.size.width / 2));
    const distanceY:number  = (object1.position.y + (object1.size.height / 2)) - (object2.position.y + (object2.size.height / 2));

    // Check for Y or X collision
    if(distanceY * distanceY > distanceX * distanceX){
        if(distanceY > 0){
            // Resolve bottom
            collisionResponse.y = (object2.position.y + object2.size.height);
        }else{
            // Resolve up
            collisionResponse.y = (object2.position.y - object1.size.height);
        }
    }else{
        if(distanceX > 0){
            // Resolve right
            collisionResponse.x = (object2.position.x + object2.size.width);
        }else{
            // Resolve left
            collisionResponse.x = (object2.position.x - object1.size.width);
        }
    }

    return collisionResponse;
}
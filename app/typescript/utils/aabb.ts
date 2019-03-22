import InteractiveObject from "../demo1/InteractiveObject";

export default (object1:InteractiveObject, object2:InteractiveObject)=>{
    let isColliding:boolean = false;

    if(object1.position.x <= object2.position.x + object2.size.width && object1.position.x + object1.size.width >= object2.position.x && object1.position.y <= object2.position.y + object2.size.height && object1.position.y + object1.size.height >= object2.position.y){
        isColliding = true;
    }

    return isColliding;
}
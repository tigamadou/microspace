import Entity from './Entity'
export default class PlayerLaser extends Entity {
    constructor(scene, x, y,fire) {
      super(scene, x, y, "sprLaserPlayer");
      this.velocity = {x: 0,y: -200}
      this.body.velocity.y = this.velocity.y;
      this.setScale(2)
      
      this.fire=fire
    }
  }
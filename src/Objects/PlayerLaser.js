import Entity from './Entity'
export default class PlayerLaser extends Entity {
    constructor(scene, x, y) {
      super(scene, x, y, "sprLaserPlayer");
      this.velocity = {x: 0,y: -800}
      this.body.velocity.y = this.velocity.y;
      this.setScale(2)
      
      this.fire=25
    }
  }
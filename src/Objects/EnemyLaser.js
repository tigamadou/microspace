
import Entity from './Entity'
export default class EnemyLaser extends Entity {
    constructor(scene, x, y) {
      super(scene, x, y, "sprLaserEnemy0");
      this.velocity = {x: 0,y: 200}
      this.body.velocity.y = this.velocity.y;
      
    }
  }
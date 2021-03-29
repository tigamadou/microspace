import Entity from './Entity'
import EnemyLaser from './EnemyLaser'
export default class GunShip extends Entity {
  constructor(scene, x, y,params) {
    super(scene, x, y, "sprEnemy0", "GunShip");
    this.play("sprEnemy0");
    this.velocity = { x: 0, y: params.speed }
    this.body.velocity.y = this.velocity.y;

    this.shootTimer = this.scene.time.addEvent({
      delay: params.shootTimer,
      callback: function () {
        var laser = new EnemyLaser(
          this.scene,
          this.x,
          this.y,
          params.weapon
        );
        laser.setScale(this.scaleX);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true
    });
    this.life = params.life
    this.score = params.score
    this.setScale((params.rank/100)+2)
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }

  update() {
    this.body.velocity.x = this.velocity.x
    this.body.velocity.y = this.velocity.y
  }

  
}
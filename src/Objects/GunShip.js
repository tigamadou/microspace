import Entity from './Entity'
import EnemyLaser from './EnemyLaser'
export default class GunShip extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "sprEnemy0", "GunShip");
        this.play("sprEnemy0");
        this.velocity = {x:0,y:Phaser.Math.Between(50, 100)}
        this.body.velocity.y = this.velocity.y;

        this.shootTimer = this.scene.time.addEvent({
            delay: 5000,
            callback: function() {
              var laser = new EnemyLaser(
                this.scene,
                this.x,
                this.y
              );
              laser.setScale(this.scaleX);
              this.scene.enemyLasers.add(laser);
            },
            callbackScope: this,
            loop: true
          });
        this.score=100
        this.life=10

    }

    onDestroy(){
        if (this.shootTimer !== undefined) {
            if (this.shootTimer) {
              this.shootTimer.remove(false);
            }
          }
    }

    update(){
      this.body.velocity.x= this.velocity.x
      this.body.velocity.y=this.velocity.y
    }
}
// eslint-disable-next-line import/no-unresolved
import Phaser from 'phaser';
import Entity from './Entity';
import EnemyLaser from './EnemyLaser';
export default class CarrierShip extends Entity {
  constructor(scene, x, y, params) {
    super(scene, x, y, 'sprEnemy2', 'CarrierShip');
    this.play('sprEnemy2');
    this.velocity = { x: 0, y: Phaser.Math.Between(50, 100) };
    this.body.velocity.y = this.velocity.y;

    this.life = params.life;
    this.score = params.score;
    this.setScale((params.rank / 100) + 2);
    this.shootTimer = this.scene.time.addEvent({
      delay: params.shootTimer,
      callback() {
        const laser = new EnemyLaser(
          this.scene,
          this.x,
          this.y,
          params.weapon,
        );
        laser.setScale(this.scaleX);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true,
    });
  }
  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
  update() {
    this.body.velocity.x = this.velocity.x;
    this.body.velocity.y = this.velocity.y;
  }
}
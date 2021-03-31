// eslint-disable-next-line import/no-unresolved
import Phaser from 'phaser';
import Entity from './Entity';
import EnemyLaser from './EnemyLaser';

export default class GunShip extends Entity {
  constructor(scene, x, y, params) {
    super(scene, x, y, 'sprEnemy0', 'GunShip');
    this.play('sprEnemy0');
    this.velocity = { x: 0, y: Phaser.Math.Between(params.speed - 50, params.speed) };
    this.body.velocity.y = this.velocity.y;
    params.weapon.speed = params.speed * 2;
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
    this.life = params.life;
    this.score = params.score;
    this.setScale((params.rank / 100) + 2);
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}
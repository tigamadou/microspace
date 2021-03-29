import Entity from './Entity';

export default class CarrierShip extends Entity {
  constructor(scene, x, y, key, type, name, life, shootTimer, speed) {
    super(scene, x, y, 'sprEnemy2', name);
    this.play('sprEnemy2');
    this.velocity = { x: 0, y: speed };
    this.body.velocity = this.velocity;
    this.shootTimer = shootTimer;
    this.life = life;
    this.score = this.life / 2;

    this.shootTimer = this.scene.time.addEvent({
      delay: shootTimer,
      callback() {
        const laser = new EnemyLaser(
          this.scene,
          this.x,
          this.y,
        );
        laser.setScale(this.scaleX);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    this.body.velocity.x = this.velocity.x;
    this.body.velocity.y = this.velocity.y;
  }
}
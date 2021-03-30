import Phaser from 'phaser';
import Entity from './Entity';

export default class CarrierShip extends Entity {
  constructor(scene, x, y, params) {
    super(scene, x, y, 'sprEnemy2', 'CarrierShip');
    this.play('sprEnemy2');
    this.velocity = { x: 0, y: Phaser.Math.Between(50, 100) };
    this.body.velocity.y = this.velocity.y;

    this.life = params.life;
    this.score = params.score;
    this.setScale((params.rank / 100) + 2);
  }

  update() {
    this.body.velocity.x = this.velocity.x;
    this.body.velocity.y = this.velocity.y;
  }
}
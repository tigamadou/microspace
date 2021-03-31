import Entity from './Entity';

export default class EnemyLaser extends Entity {
  constructor(scene, x, y, params) {
    super(scene, x, y, 'sprLaserEnemy0');
    this.velocity = { x: 0, y: params.speed };
    this.body.velocity.y = this.velocity.y;
  }
}
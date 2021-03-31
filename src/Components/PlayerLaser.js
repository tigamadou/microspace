// eslint-disable-next-line import/no-unresolved
import Entity from './Entity';

export default class PlayerLaser extends Entity {
  constructor(scene, x, y, params) {
    super(scene, x, y, 'sprLaserPlayer');
    this.velocity = { x: 0, y: params.speed };
    this.body.velocity.y = this.velocity.y;
    this.setScale(2);

    this.fire = params.fire;
  }
}
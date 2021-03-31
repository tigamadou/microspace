import Phaser from 'phaser';

export default class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);

    this.setData('type', type);
    this.setData('isDead', false);
    this.setData('score', 0);
    this.setData('life', 0);
    this.states = {
      MOVE_DOWN: 'MOVE_DOWN',
      CHASE: 'CHASE',
    };
  }

  explode(canDestroy) {
    if (!this.getData('isDead')) {
      this.setTexture('sprExplosion');
      this.play('sprExplosion');
      this.scene.globals.sfx.explosions[
        Phaser.Math.Between(0, this.scene.globals.sfx.explosions.length - 1)
      ].play();
      if (this.shootTimer !== undefined) {
        if (this.shootTimer) {
          this.shootTimer.remove(false);
        }
      }
      this.setAngle(0);
      this.body.setVelocity(0, 0);
      this.on('animationcomplete', () => {
        if (canDestroy) {
          this.destroy();
        } else {
          this.setVisible(false);
        }
      }, this);
      this.setData('isDead', true);
    }
  }

  update() {
    if (this.x < -this.displayWidth
            || this.x > this.scene.game.config.width + this.displayWidth
            || this.y < -this.displayHeight * 4
            || this.y > this.scene.game.config.height + this.displayHeight) {
      if (this) {
        if (this.onDestroy !== undefined) {
          this.onDestroy();
        }

        this.destroy();
      }
    }
  }
}
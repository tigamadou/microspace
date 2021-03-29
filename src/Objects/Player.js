import Entity from './Entity';
import PlayerLaser from './PlayerLaser';

export default class Player extends Entity {
  constructor(scene, x, y, key, params) {
    super(scene, x, y, key, 'Player');
    this.setData('speed', 400);
    this.play('sprPlayer');
    this.setData('isShooting', false);
    this.setData('timerShootDelay', params.weapon.timerShootDelay);
    this.setData('timerShootTick', this.getData('timerShootDelay') - 1);
    this.level = params.level;
    this.weapon = params.weapon;
    this.setScale(2);
  }

  moveUp() {
    this.body.velocity.y = -this.getData('speed');
  }

  moveDown() {
    this.body.velocity.y = this.getData('speed');
  }

  moveLeft() {
    this.body.velocity.x = -this.getData('speed');
  }

  moveRight() {
    this.body.velocity.x = this.getData('speed');
  }

  update() {
    this.body.setVelocity(0, 0);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    if (this.getData('isShooting')) {
      if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
        this.setData('timerShootTick', this.getData('timerShootTick') + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
      } else { // when the "manual timer" is triggered:
        this.fireWeapon();
        this.scene.globals.sfx.laser.play(); // play the laser sound effect
        this.setData('timerShootTick', 0);
      }
    }
  }

  fireWeapon() {
    let laser = null;
    if (this.weapon.rank == 1) {
      laser = this.laserOne();
    } else if (this.weapon.rank == 2) {
      laser = this.laserTwo();
    } else if (this.weapon.rank == 3) {
      laser = this.laserTree();
    } else {
      laser = this.laserFour();
    }
  }

  laserOne() {
    const laser = new PlayerLaser(this.scene, (this.x), (this.y - 30), this.weapon);
    this.scene.playerLasers.add(laser);
    return laser;
  }

  laserTwo() {
    const laser = new PlayerLaser(this.scene, (this.x - 16), (this.y - 16), this.weapon);

    const laser2 = new PlayerLaser(this.scene, (this.x + 16), (this.y - 16), this.weapon);
    this.scene.playerLasers.add(laser);
    this.scene.playerLasers.add(laser2);
  }

  laserTree() {
    const laser = new PlayerLaser(this.scene, (this.x - 8), (this.y - 12), this.weapon);
    const laser2 = new PlayerLaser(this.scene, (this.x), (this.y - 30), this.weapon);
    const laser3 = new PlayerLaser(this.scene, (this.x + 8), (this.y - 12), this.weapon);
    const dx = -75;
    const dy = -200;
    const angle = Math.atan2(dy, dx);
    laser.body.setVelocity(
      -Math.cos(angle) * laser.body.velocity.y,
      -Math.sin(angle) * laser.body.velocity.y,
    );
    laser.angle = -20;

    laser3.body.setVelocity(
      Math.cos(angle) * laser3.body.velocity.y,
      -Math.sin(angle) * laser3.body.velocity.y,
    );
    laser3.angle = 20;

    this.scene.playerLasers.add(laser);
    this.scene.playerLasers.add(laser2);
    this.scene.playerLasers.add(laser3);
  }

  laserFour() {
    const velocityY = -800;
    var laser = new PlayerLaser(this.scene, this.x, (this.y - 12), this.weapon);
    this.scene.playerLasers.add(laser);
    // first couple
    var laser = new PlayerLaser(this.scene, (this.x - 26), (this.y - 12), this.weapon);
    var dx = -300;
    var dy = -200;
    var angle = Math.atan2(dy, dx);
    laser.body.setVelocity(
      -Math.cos(Math.atan2(dy, dx)) * laser.body.velocity.y,
      -Math.sin(Math.atan2(dy, dx)) * laser.body.velocity.y,
    );
    laser.angle = -60;
    this.scene.playerLasers.add(laser);

    var laser = new PlayerLaser(this.scene, (this.x + 26), (this.y - 12), this.weapon);
    var dx = 300;
    var dy = -200;
    var angle = Math.atan2(dy, dx);
    laser.body.setVelocity(
      -Math.cos(Math.atan2(dy, dx)) * laser.body.velocity.y,
      -Math.sin(Math.atan2(dy, dx)) * laser.body.velocity.y,
    );
    laser.angle = 60;
    this.scene.playerLasers.add(laser);

    // second couple

    var laser = new PlayerLaser(this.scene, (this.x + 16), (this.y - 12), this.weapon);
    var dx = 150;
    var dy = -200;
    var angle = Math.atan2(dy, dx);
    laser.body.setVelocity(
      -Math.cos(Math.atan2(dy, dx)) * laser.body.velocity.y,
      -Math.sin(Math.atan2(dy, dx)) * laser.body.velocity.y,
    );
    laser.angle = 40;
    this.scene.playerLasers.add(laser);

    var laser = new PlayerLaser(this.scene, (this.x - 16), (this.y - 12), this.weapon);
    var dx = -150;
    var dy = -200;
    var angle = Math.atan2(dy, dx);
    laser.body.setVelocity(
      -Math.cos(Math.atan2(dy, dx)) * laser.body.velocity.y,
      -Math.sin(Math.atan2(dy, dx)) * laser.body.velocity.y,
    );
    laser.angle = -40;
    this.scene.playerLasers.add(laser);

    // third couple

    var laser = new PlayerLaser(this.scene, (this.x + 8), (this.y - 12), this.weapon);
    var dx = 75;
    var dy = -200;
    var angle = Math.atan2(dy, dx);
    laser.body.setVelocity(
      -Math.cos(Math.atan2(dy, dx)) * laser.body.velocity.y,
      -Math.sin(Math.atan2(dy, dx)) * laser.body.velocity.y,
    );
    laser.angle = 20;
    this.scene.playerLasers.add(laser);

    var laser = new PlayerLaser(this.scene, (this.x - 8), (this.y - 12), this.weapon);
    var dx = -75;
    var dy = -200;
    var angle = Math.atan2(dy, dx);
    laser.body.setVelocity(
      -Math.cos(Math.atan2(dy, dx)) * laser.body.velocity.y,
      -Math.sin(Math.atan2(dy, dx)) * laser.body.velocity.y,
    );
    laser.angle = -20;
    this.scene.playerLasers.add(laser);
  }
}
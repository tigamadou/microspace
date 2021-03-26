import Entity from './Entity'
import PlayerLaser from './PlayerLaser'
export default class Player extends Entity {
    constructor(scene, x, y, key) {
        super(scene, x, y, key, "Player");
        this.setData("speed", 400);
        this.play("sprPlayer");
        this.setData("isShooting", false);
        this.setData("timerShootDelay", 10);
        this.setData("timerShootTick", this.getData("timerShootDelay") - 1);

    }

    moveUp() {
        this.body.velocity.y = -this.getData("speed");
    }

    moveDown() {
        this.body.velocity.y = this.getData("speed");
    }

    moveLeft() {
        this.body.velocity.x = -this.getData("speed");
    }

    moveRight() {
        this.body.velocity.x = this.getData("speed");
    }

    update() {
        this.body.setVelocity(0, 0);

        this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
        this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

        if (this.getData("isShooting")) {
            if (this.getData("timerShootTick") < this.getData("timerShootDelay")) {
              this.setData("timerShootTick", this.getData("timerShootTick") + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
            }
            else { // when the "manual timer" is triggered:
              var laser = new PlayerLaser(this.scene, (this.x-16), (this.y-20));
              var laser2 = new PlayerLaser(this.scene, (this.x), (this.y-30));
              var laser3 = new PlayerLaser(this.scene, (this.x+16), (this.y-20));
              var dx = 0 - this.x;
              var dy = 0 - this.y;
              var angle = Math.atan2(dy, dx);
              laser.body.setVelocity(
                -Math.cos(angle) * laser.velocity.y,
                -Math.sin(angle) * laser.velocity.y
              )
              laser.angle = -30

              laser3.body.setVelocity(
                Math.cos(angle) * laser3.velocity.y,
                -Math.sin(angle) * laser3.velocity.y
              )
              laser3.angle = 30
              this.scene.playerLasers.add(laser);
              this.scene.playerLasers.add(laser2);
              this.scene.playerLasers.add(laser3);
            
              this.scene.sfx.laser.play(); // play the laser sound effect
              this.setData("timerShootTick", 0);
            }
          }
    }
}
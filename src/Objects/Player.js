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
        this.level = 1
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
                this.fireWeapon()

                this.scene.sfx.laser.play(); // play the laser sound effect
                this.setData("timerShootTick", 0);
            }
        }
    }

    levelUp(level){
        this.level= level
        console.log("New Level "+ this.level)
    }
    fireWeapon() {
        if (this.level == 1) {
            this.laserOne()
        } else if (this.level == 2) {
            this.laserTwo()
        } else if (this.level == 3) {
            this.laserTree()
        }else{
            this.laserFour()
        }
    }

    laserOne() {
        var laser = new PlayerLaser(this.scene, (this.x), (this.y - 30),10);
        laser.body.velocity.y = -800
        this.scene.playerLasers.add(laser);
    }

    laserTwo() {
        var laser = new PlayerLaser(this.scene, (this.x-30), (this.y - 30),10);
      
        var laser2 = new PlayerLaser(this.scene, (this.x+30), (this.y - 30),10);
        laser.body.velocity.y = -400
        laser2.body.velocity.y = -400
        this.scene.playerLasers.add(laser);
        this.scene.playerLasers.add(laser2);
    }

    laserTree() {
        var laser = new PlayerLaser(this.scene, (this.x - 16), (this.y - 20),15);
        var laser2 = new PlayerLaser(this.scene, (this.x), (this.y - 30),15);
        var laser3 = new PlayerLaser(this.scene, (this.x + 16), (this.y - 20),15);
        var dx = -200;
        var dy = -200;
        var angle = Math.atan2(dy, dx);
        var velocityY = -800
        laser.body.setVelocity(
            -Math.cos(angle) * velocityY,
            -Math.sin(angle) * velocityY
        )
        laser.angle = -20
        laser2.body.velocity.y = velocityY
        laser3.body.setVelocity(
            Math.cos(angle) * velocityY,
            -Math.sin(angle) * velocityY
        )
        laser3.angle = 20
       
        this.scene.playerLasers.add(laser);
        this.scene.playerLasers.add(laser2);
        this.scene.playerLasers.add(laser3);
    }

    laserFour() {
        var velocityY = -800
        var laser = new PlayerLaser(this.scene, this.x, (this.y - 12),20);
        laser.body.velocity.y = velocityY
        this.scene.playerLasers.add(laser);
        // first couple
        var laser = new PlayerLaser(this.scene, (this.x-26), (this.y - 12),20);
        laser.body.velocity.y = velocityY
        var dx = -300;
        var dy = -200;
        var angle = Math.atan2(dy, dx);
        laser.body.setVelocity(
            -Math.cos(Math.atan2(dy,dx)) * velocityY,
            -Math.sin(Math.atan2(dy,dx)) * velocityY
        )
        laser.angle = -60
        this.scene.playerLasers.add(laser);

        var laser = new PlayerLaser(this.scene, (this.x+26), (this.y - 12),20);
        laser.body.velocity.y = velocityY
        var dx = 300;
        var dy = -200;
        var angle = Math.atan2(dy, dx);
        laser.body.setVelocity(
            -Math.cos(Math.atan2(dy,dx)) * velocityY,
            -Math.sin(Math.atan2(dy,dx)) * velocityY
        )
        laser.angle = 60
        this.scene.playerLasers.add(laser);

        // second couple
            
        var laser = new PlayerLaser(this.scene, (this.x+16), (this.y - 12),20);
        laser.body.velocity.y = velocityY
        var dx = 150;
        var dy = -200;
        var angle = Math.atan2(dy, dx);
        laser.body.setVelocity(
            -Math.cos(Math.atan2(dy,dx)) * velocityY,
            -Math.sin(Math.atan2(dy,dx)) * velocityY
        )
        laser.angle = 40
        this.scene.playerLasers.add(laser);
        
        var laser = new PlayerLaser(this.scene, (this.x-16), (this.y - 12),20);
        laser.body.velocity.y = velocityY
        var dx = -150;
        var dy = -200;
        var angle = Math.atan2(dy, dx);
        laser.body.setVelocity(
            -Math.cos(Math.atan2(dy,dx)) * velocityY,
            -Math.sin(Math.atan2(dy,dx)) * velocityY
        )
        laser.angle = -40
        this.scene.playerLasers.add(laser);

        // third couple
            
        var laser = new PlayerLaser(this.scene, (this.x+8), (this.y - 12),20);
        laser.body.velocity.y = velocityY
        var dx = 75;
        var dy = -200;
        var angle = Math.atan2(dy, dx);
        laser.body.setVelocity(
            -Math.cos(Math.atan2(dy,dx)) * velocityY,
            -Math.sin(Math.atan2(dy,dx)) * velocityY
        )
        laser.angle = 20
        this.scene.playerLasers.add(laser);
        
        var laser = new PlayerLaser(this.scene, (this.x-8), (this.y - 12),20);
        laser.body.velocity.y = velocityY
        var dx = -75;
        var dy = -200;
        var angle = Math.atan2(dy, dx);
        laser.body.setVelocity(
            -Math.cos(Math.atan2(dy,dx)) * velocityY,
            -Math.sin(Math.atan2(dy,dx)) * velocityY
        )
        laser.angle = -20
        this.scene.playerLasers.add(laser);

        
    }
}
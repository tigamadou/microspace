import 'phaser';
import Player from '../Objects/Player'
import GunShip from '../Objects/GunShip'
import ChaserShip from '../Objects/ChaserShip'
import CarrierShip from '../Objects/CarrierShip'
import ScrollingBackground from '../Objects/ScrollingBackground'

let score = 0
export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    this.load.image('logo', 'assets/logo.png');
  }

  createStats() {
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '16px',
      fill: '#fff',
    });

  }

  createAnimations() {

    this.anims.create({
      key: "sprEnemy0",
      frames: this.anims.generateFrameNumbers("sprEnemy0"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "sprEnemy2",
      frames: this.anims.generateFrameNumbers("sprEnemy2"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "sprExplosion",
      frames: this.anims.generateFrameNumbers("sprExplosion"),
      frameRate: 20,
      repeat: 0
    });

    this.anims.create({
      key: "sprPlayer",
      frames: this.anims.generateFrameNumbers("sprPlayer"),
      frameRate: 20,
      repeat: -1
    });

    this.sfx = {
      explosions: [
        this.sound.add("sndExplode0"),
        this.sound.add("sndExplode1")
      ],
      laser: this.sound.add("sndLaser", { volume: 0.01 })
    };
  }

  addScore(entity) {
    score += entity.score
  }

  checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
  }
  createColisions(player) {
    let e = this

    this.physics.add.collider(this.playerLasers, this.enemies, function (playerLaser, enemy) {
      if (enemy) {

        console.log(playerLaser.fire)
        playerLaser.destroy();

        enemy.life = enemy.life - playerLaser.fire;

        if (enemy.life <= 0) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.explode(true);

          score += enemy.score

          if (score >= 1000) {
            player.levelUp(2)
          }
          if (score >= 5000) {
            player.levelUp(3)
          }

          if (score >= 10000) {
            player.levelUp(4)
          }
        }
      }
    });

    this.physics.add.overlap(this.player, this.enemies, function (player, enemy) {
      if (!player.getData("isDead") &&
        !enemy.getData("isDead")) {
        player.explode(false);
        enemy.explode(true);
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, function (player, laser) {
      if (!player.getData("isDead") &&
        !laser.getData("isDead")) {
        player.explode(false);
        laser.destroy();
      }
    });
  }

  create() {


    this.backgrounds = [];
    for (var i = 0; i < 5; i++) { // create five scrolling backgrounds
      var bg = new ScrollingBackground(this, "sprBg0", i * 10);
      this.backgrounds.push(bg);
    }

    this.createStats()
    this.createAnimations()
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprPlayer"
    );
    this.player.setScale(2)
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.createEnemies()
    this.createColisions(this.player)
  }
  createEnemies() {
    this.time.addEvent({
      delay: 1000,
      callback: function () {
        var enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        }
        else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType("ChaserShip").length < 5) {

            enemy = new ChaserShip(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0
            );
          }
        }
        else {
          enemy = new CarrierShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        }

        if (enemy !== null) {
          enemy.setScale(2);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true
    });

  }
  update() {
    this.scoreText.setText(`Score: ${score}`);

    for (var i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
    if (!this.player.getData("isDead")) {

      this.player.update();

      if (this.keyW.isDown || this.keyUp.isDown) {
        this.player.moveUp();
      }
      else if (this.keyS.isDown || this.keyDown.isDown) {
        this.player.moveDown();
      }

      if (this.keyA.isDown || this.keyLeft.isDown) {
        this.player.moveLeft();
      }
      else if (this.keyD.isDown || this.keyRight.isDown) {
        this.player.moveRight();
      }

      if (this.keySpace.isDown) {
        this.player.setData("isShooting", true);
      }
      else {
        this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
        this.player.setData("isShooting", false);
      }
    }

    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];

      enemy.update();
      if (enemy.x < -enemy.displayWidth ||
        enemy.x > this.game.config.width + enemy.displayWidth ||
        enemy.y < -enemy.displayHeight * 4 ||
        enemy.y > this.game.config.height + enemy.displayHeight) {

        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }

          enemy.destroy();
        }

      }
    }

    for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
      var laser = this.enemyLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
      var laser = this.playerLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }

  getEnemiesByType(type) {
    var arr = [];
    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];
      if (enemy.getData("type") == type) {
        arr.push(enemy);
      }
    }
    return arr;
  }


};

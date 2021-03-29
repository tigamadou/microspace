import 'phaser';
import Player from '../Objects/Player'
import GunShip from '../Objects/GunShip'
import ChaserShip from '../Objects/ChaserShip'
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
  create() {
    this.globals = this.sys.game.globals;

   
    this.backgrounds = [];
    for (var i = 0; i < 5; i++) { // create five scrolling backgrounds
      var bg = new ScrollingBackground(this, "sprBg0", i * 10);
      this.backgrounds.push(bg);
    }

    this.createStats()
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprPlayer",
      APP.stage.player
    );
    
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
    this.runTimer()
  }
  createStats() {
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '16px',
      fill: '#fff',
    });

  }


  runTimer(){
    this.timeLimit = 0
    this.time.addEvent({
      delay: 1000,
      callback:()=>{
        this.timeLimit++
        if(APP.canLevelUp(this.timeLimit) && !this.player.getData('isDead')){

          this.scene.start('Stage');
          return
        }
        
      },
      callbackScope: this,
        loop: true
    })
  }



  createColisions(player) {
    let e = this

    this.physics.add.overlap(this.playerLasers, this.enemies, function (playerLaser, enemy) {
      if (enemy && !enemy.getData('isDead')) {

        playerLaser.destroy();

        enemy.life = enemy.life - playerLaser.fire;

        if (enemy.life <= 0) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.explode(true);


          APP.score(enemy.score)
          
          
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


  createEnemies() {
    APP.stage.enemies.forEach(stageEnemy => {
      stageEnemy = APP.getEnemies(stageEnemy)
    
      this.time.addEvent({
        delay: stageEnemy.createDelay,
        callback: function () {
          var enemy = null;
          if(stageEnemy.name=="GunShip"){
            if (this.getEnemiesByType("GunShip").length < stageEnemy.maxNumber){
  
              enemy = new GunShip(
                this,
                Phaser.Math.Between(0, this.game.config.width),
                0,
                stageEnemy
              );

              
            }
          }
  
          else if (stageEnemy.name=="ChaserShip") {
              if (this.getEnemiesByType("ChaserShip").length < stageEnemy.maxNumber) {
    
                enemy = new ChaserShip(
                  this,
                  Phaser.Math.Between(0, this.game.config.width),
                  0,
                  stageEnemy
                );
              }
            }
            else if (stageEnemy.name=="CarrierShip") {
              if (this.getEnemiesByType("CarrierShip").length < stageEnemy.maxNumber) {
    
                enemy = new CarrierShip(
                  this,
                  Phaser.Math.Between(0, this.game.config.width),
                  0,
                  stageEnemy
                );
              }
            }
    
  
          if (enemy !== null) {
            // enemy.setScale(2);
            this.enemies.add(enemy);
          }
        },
        callbackScope: this,
        loop: true
      });
    });
    

  }

  createEnemy(stageEnemy){
    

  }
  update() {
    this.scoreText.setText(`Score: ${APP.model.score}`);

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
    } else {
      this.gameOver()
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

  gameOver() {
    if (!APP.model.gameOver) {
      APP.model.gameOver = true
      setTimeout(() => {
        this.scene.start('GameOver');
      }, 3000)
    }
  }

  

};

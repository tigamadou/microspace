import 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    // add logo image
    this.add.image(250, 300, 'logo');

    // display progress bar
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x333333, 0.8);
    progressBox.fillRect(0, 590, 800, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: (width / 2) - ((width / 2) / 1.25),
      y: 615,
      text: 'Loading...',
      style: {
        font: '12px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: 615,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#fff'
      }
    });
    percentText.setOrigin(0.5, 0.5);

    var assetText = this.make.text({
      x: (width / 2) + ((width / 2) / 1.25),
      y: 615,
      text: '',
      style: {
        font: '12px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(0, 590, 800 * value, 50);
    });

    // update file progress text
    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });

    // remove progress bar when complete
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    }.bind(this));

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load ui
    this.load.image('blueButton1', 'assets/ui/blue_button02.png');
    this.load.image('blueButton2', 'assets/ui/blue_button03.png');
    this.load.image('phaserLogo', 'assets/logo.png');
    this.load.image('box', 'assets/ui/grey_box.png');
    this.load.image('checkedBox', 'assets/ui/blue_boxCheckmark.png');
    this.load.image('bgImg', ['assets/background.jpg']);
    this.load.image('gameoverImg', ['assets/gameover.jpg']);
    this.load.image('sprBtnRestart', 'assets/sprBtnRestart');
    // load game sprites
    this.load.image("sprBg0", "assets/sprBg0.png");
    this.load.image("sprBg1", "assets/sprBg1.png");
    this.load.spritesheet("sprExplosion", "assets/explode2.png", {
      frameWidth: 16,
      frameHeight: 13
    });
    this.load.spritesheet("sprEnemy0", "assets/sprEnemy0.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.image("sprEnemy1", "assets/sprEnemy1.png");
    this.load.spritesheet("sprEnemy2", "assets/sprEnemy2.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.image("sprLaserEnemy0", "assets/sprLaserEnemy0.png");
    this.load.image("sprLaserPlayer", "assets/sprLaserPlayer.png");
    this.load.spritesheet("sprPlayer", "assets/sprPlayer.png", {
      frameWidth: 16,
      frameHeight: 16
    });
    //load audios
    this.load.audio('battleMusic', ['assets/battleThemeA.mp3']);
    this.load.audio('GameMusic', ['assets/war.mp3']);
    this.load.audio('gameOver', ['assets/gameOver.mp3']);
    this.load.audio("sndExplode0", "assets/sndExplode0.wav");
    this.load.audio("sndExplode1", "assets/sndExplode1.wav");
    this.load.audio("sndLaser", "assets/sndLaser.wav");
    this.load.audio("sndBtnOver",  "assets/sndBtnOver.wav");
    this.load.audio("sndBtnDown",  "assets/sndBtnDown.wav");

    
  }

  create(){
  
    this.sys.game.globals.sfx = {
      explosions: [
        this.sound.add("sndExplode0",{ volume: 0.1 }),
        this.sound.add("sndExplode1",{ volume: 0.1 })
      ],
      laser: this.sound.add("sndLaser", { volume: 0.1}),
      music:{
        title: this.sound.add('battleMusic', { volume: 0.9, loop: true }),
        gameMusic: this.sound.add('GameMusic', { volume: 0.5, loop: true }),
        gameOver: this.sound.add('gameOver', { volume: 0.5, loop: true })
      }
    };

    this.createAnimations()
    
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
      frameRate: 13,
      repeat: 0
    });

    this.anims.create({
      key: "sprPlayer",
      frames: this.anims.generateFrameNumbers("sprPlayer"),
      frameRate: 20,
      repeat: -1
    });

   
  }
  ready() {
    // this.scene.start('Title');
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
};

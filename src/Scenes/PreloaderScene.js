import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    // add logo 
    
    this.add.image(250, 300, 'space');

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x333333, 0.8);
    progressBox.fillRect(0, 590, 800, 50);

    const { width } = this.cameras.main;

    const loadingText = this.make.text({
      x: (width / 2) - ((width / 2) / 1.25),
      y: 615,
      text: 'Loading...',
      style: {
        font: '12px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: 615,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#fff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: (width / 2) + ((width / 2) / 1.25),
      y: 615,
      text: '',
      style: {
        font: '12px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(0, 590, 800 * value, 50);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load ui
    this.load.image('blueButton1', 'assets/ui/blue_button02.png');
    this.load.image('blueButton2', 'assets/ui/blue_button03.png');
    this.load.image('phaserLogo', 'assets/ui/space.png');
    this.load.image('box', 'assets/ui/grey_box.png');
    this.load.image('checkedBox', 'assets/ui/blue_boxCheckmark.png');
    this.load.image('bgImg', ['assets/ui/background.jpg']);
    
    
    this.load.image('sprBg0', 'assets/sprites/sprBg0.png');
    this.load.image('sprBg1', 'assets/sprites/sprBg1.png');
    this.load.spritesheet('sprExplosion', 'assets/sprites/explode2.png', {
      frameWidth: 16,
      frameHeight: 13,
    });
    this.load.spritesheet('sprEnemy0', 'assets/sprites/sprEnemy0.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('sprEnemy1', 'assets/sprites/sprEnemy1.png');
    this.load.spritesheet('sprEnemy2', 'assets/sprites/sprEnemy2.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('sprLaserEnemy0', 'assets/sprites/sprLaserEnemy0.png');
    this.load.image('sprLaserPlayer', 'assets/sprites/sprLaserPlayer.png');
    this.load.spritesheet('sprPlayer', 'assets/sprites/sprPlayer.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    // load audios
    this.load.audio('battleMusic', ['assets/sfx/battleThemeA.mp3']);
    this.load.audio('GameMusic', ['assets/sfx/war.mp3']);
    this.load.audio('gameOver', ['assets/sfx/gameOver.mp3']);
    this.load.audio('sndExplode0', 'assets/sfx/sndExplode0.wav');
    this.load.audio('sndExplode1', 'assets/sfx/sndExplode1.wav');
    this.load.audio('sndLaser', 'assets/sfx/sndLaser.wav');
    this.load.audio('sndBtnOver', 'assets/sfx/sndBtnOver.wav');
    this.load.audio('sndBtnDown', 'assets/sfx/sndBtnDown.wav');
  }

  create() {
    this.sys.game.globals.sfx = {
      explosions: [
        this.sound.add('sndExplode0', { volume: 0.4 }),
        this.sound.add('sndExplode1', { volume: 0.4 }),
      ],
      laser: this.sound.add('sndLaser', { volume: 0.2 }),
      music: {
        title: this.sound.add('battleMusic', { volume: 0.3, loop: true }),
        gameMusic: this.sound.add('GameMusic', { volume: 0.3, loop: true }),
        gameOver: this.sound.add('gameOver', { volume: 0.3, loop: true }),
      },
    };

    this.createAnimations();
  }

  createAnimations() {
    this.anims.create({
      key: 'sprEnemy0',
      frames: this.anims.generateFrameNumbers('sprEnemy0'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprEnemy2',
      frames: this.anims.generateFrameNumbers('sprEnemy2'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprExplosion',
      frames: this.anims.generateFrameNumbers('sprExplosion'),
      frameRate: 13,
      repeat: 0,
    });

    this.anims.create({
      key: 'sprPlayer',
      frames: this.anims.generateFrameNumbers('sprPlayer'),
      frameRate: 20,
      repeat: -1,
    });
  }

  ready() {
    // this.scene.start('Title');
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}

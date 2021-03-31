// eslint-disable-next-line import/no-unresolved
import Phaser from 'phaser';
import blueButton1 from '../assets/ui/blue_button02.png';
import blueButton2 from '../assets/ui/blue_button03.png';
import phaserLogo from '../assets/ui/space.png';
import box from '../assets/ui/grey_box.png';
import checkedBox from '../assets/ui/blue_boxCheckmark.png';
import bgImg from '../assets/ui/background.jpg';

import sprBg0 from '../assets/sprites/sprBg0.png';
import sprBg1 from '../assets/sprites/sprBg1.png';
import sprExplosion from '../assets/sprites/explode.png';
import sprEnemy0 from '../assets/sprites/sprEnemy0.png';
import sprEnemy1 from '../assets/sprites/sprEnemy1.png';
import sprEnemy2 from '../assets/sprites/sprEnemy2.png';
import sprLaserEnemy0 from '../assets/sprites/sprLaserEnemy0.png';
import sprLaserPlayer from '../assets/sprites/sprLaserPlayer.png';
import sprPlayer from '../assets/sprites/sprPlayer.png';

import battleMusic from '../assets/sfx/battleMusic.mp3';
import GameMusic from '../assets/sfx/GameMusic.mp3';
import gameOver from '../assets/sfx/gameOver.mp3';
import sndExplode0 from '../assets/sfx/sndExplode0.wav';
import sndExplode1 from '../assets/sfx/sndExplode1.wav';
import sndLaser from '../assets/sfx/sndLaser.wav';

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
    this.load.image('blueButton1', blueButton1);
    this.load.image('blueButton2', blueButton2);
    this.load.image('phaserLogo', phaserLogo);
    this.load.image('box', box);
    this.load.image('checkedBox', checkedBox);
    this.load.image('bgImg', [bgImg]);
    // sprites
    this.load.image('sprBg0', sprBg0);
    this.load.image('sprBg1', sprBg1);
    this.load.spritesheet('sprExplosion', sprExplosion, {
      frameWidth: 16,
      frameHeight: 13,
    });
    this.load.spritesheet('sprEnemy0', sprEnemy0, {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('sprEnemy1', sprEnemy1);
    this.load.spritesheet('sprEnemy2', sprEnemy2, {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('sprLaserEnemy0', sprLaserEnemy0);
    this.load.image('sprLaserPlayer', sprLaserPlayer);
    this.load.spritesheet('sprPlayer', sprPlayer, {
      frameWidth: 16,
      frameHeight: 16,
    });
    // load audios
    this.load.audio('battleMusic', [battleMusic]);
    this.load.audio('GameMusic', [GameMusic]);
    this.load.audio('gameOver', [gameOver]);
    this.load.audio('sndExplode0', sndExplode0);
    this.load.audio('sndExplode1', sndExplode1);
    this.load.audio('sndLaser', sndLaser);
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

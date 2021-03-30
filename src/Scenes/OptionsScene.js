import Phaser from 'phaser';
import Button from '../Objects/Button';

export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super('Options');
  }

  preload() {
    this.APP = this.game.APP;
  }

  create() {
    this.add.image(400, 300, 'bgImg');

    this.text = this.add.text(80, 100, 'Options', { fontSize: 40 });
    this.musicButton = this.add.image(80, 200, 'checkedBox');
    this.musicText = this.add.text(150, 190, 'Music Enabled', { fontSize: 24 });

    this.soundButton = this.add.image(80, 300, 'checkedBox');
    this.soundText = this.add.text(150, 290, 'Sound Enabled', { fontSize: 24 });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on('pointerdown', () => {
      this.APP.model.musicOn = !this.APP.model.musicOn;
      this.updateAudio();
    });

    this.soundButton.on('pointerdown', () => {
      this.APP.model.soundOn = !this.APP.model.soundOn;
      this.updateAudio();
    });

    this.menuButton = new Button(this, this.game.config.width * 0.5, this.game.config.height - 80, 'blueButton1', 'blueButton2', 'Menu', 'Title');

    this.updateAudio();
  }

  updateAudio() {
    if (this.APP.model.musicOn === false) {
      this.musicButton.setTexture('box');
      this.sys.game.globals.bgMusic.stop();
      this.APP.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkedBox');
      if (this.APP.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.APP.model.bgMusicPlaying = true;
      }
    }

    if (this.APP.model.soundOn === false) {
      this.game.sound.mute = true;
      this.soundButton.setTexture('box');
    } else {
      this.game.sound.mute = false;
      this.soundButton.setTexture('checkedBox');
    }
  }
}

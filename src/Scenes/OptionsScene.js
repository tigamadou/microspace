import 'phaser';
import Button from '../Objects/Button';
export default class OptionsScene extends Phaser.Scene {
  constructor () {
    super('Options');
  }

  create () {
    this.add.image(400, 300, 'bgImg');

    this.text = this.add.text(80, 100, 'Options', { fontSize: 40 });
    this.musicButton = this.add.image(80, 200, 'checkedBox');
    this.musicText = this.add.text(150, 190, 'Music Enabled', { fontSize: 24 });

    this.soundButton = this.add.image(80, 300, 'checkedBox');
    this.soundText = this.add.text(150, 290, 'Sound Enabled', { fontSize: 24 });

    this.musicButton.setInteractive();
    this.soundButton.setInteractive();

    this.musicButton.on('pointerdown', function () {
      APP.model.musicOn = !APP.model.musicOn;
      this.updateAudio();
    }.bind(this));

    this.soundButton.on('pointerdown', function () {
      APP.model.soundOn = !APP.model.soundOn;
      this.updateAudio();
    }.bind(this));

    this.menuButton = new Button(this,  this.game.config.width*0.5, this.game.config.height-80, 'blueButton1', 'blueButton2', 'Menu', 'Title');
    
    this.updateAudio();
  }

  updateAudio() {
    if (APP.model.musicOn === false) {
      this.musicButton.setTexture('box');
      this.sys.game.globals.bgMusic.stop();
      APP.model.bgMusicPlaying = false;
    } else {
      this.musicButton.setTexture('checkedBox');
      if (APP.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        APP.model.bgMusicPlaying = true;
      }
    }

    if (APP.model.soundOn === false) {
      APP.game.sound.mute = true;
      this.soundButton.setTexture('box');
    } else {
      APP.game.sound.mute = false;
      this.soundButton.setTexture('checkedBox');
    }
  }
};

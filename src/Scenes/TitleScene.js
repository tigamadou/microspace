import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title');
  }

  create () {
    this.add.image(400, 300, 'bgImg');
    this.game.sound.stopAll();
    this.globals = this.sys.game.globals;
    // Game
    this.gameButton = new Button(this, config.width-120, config.height-400, 'blueButton1', 'blueButton2', 'START', 'Intro');

    // Options
    this.optionsButton = new Button(this,  config.width-120, config.height-340, 'blueButton1', 'blueButton2', 'Options', 'Options');

    // // Leaderboard
    this.leaderBoardButton = new Button(this,  config.width-120, config.height-280, 'blueButton1', 'blueButton2', 'LeaderBoard', 'LeaderBoard');

    // // Credits
    this.creditsButton = new Button(this,  config.width-120, config.height-220, 'blueButton1', 'blueButton2', 'Credits', 'Credits');
    

    if (APP.model.musicOn === true) {
      this.globals.bgMusic = this.globals.sfx.music.title;
      this.globals.bgMusic.play();
      APP.model.bgMusicPlaying = true;
    }
  }

  centerButton (gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width/2, config.height/2 - offset * 100, config.width, config.height)
    );
  }

  centerButtonText (gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton
    );
  }
};

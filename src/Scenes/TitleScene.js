import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class TitleScene extends Phaser.Scene {
  constructor () {
    super('Title');
  }

  create () {
    this.add.image(400, 300, 'bgImg');
  
    // Game
    this.gameButton = new Button(this, config.width-120, config.height-400, 'blueButton1', 'blueButton2', 'Play', 'Game');

    // Options
    this.optionsButton = new Button(this,  config.width-120, config.height-340, 'blueButton1', 'blueButton2', 'Options', 'Options');

    // // Credits
    this.creditsButton = new Button(this,  config.width-120, config.height-280, 'blueButton1', 'blueButton2', 'Credits', 'Credits');
    
    // // Leaderboard
    this.leaderBoardButton = new Button(this,  config.width-120, config.height-220, 'blueButton1', 'blueButton2', 'LeaderBoard', 'LeaderBoard');

    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.1, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
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
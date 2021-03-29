import Phaser from 'phaser';
import Button from '../Objects/Button';
import Player from '../Objects/Player';
import ScrollingBackground from '../Objects/ScrollingBackground';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    // this.add.image(400, 300, 'bgImg');

    this.game.sound.stopAll();
    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) { // create five scrolling backgrounds
      const bg = new ScrollingBackground(this, 'sprBg0', i * 10);
      this.backgrounds.push(bg);
    }
    this.globals = this.sys.game.globals;
    this.text = this.add.text(80, 100, 'MicroShooter', { fontSize: 40 });
    // Game
    this.gameButton = new Button(this, this.game.config.width * 0.5, this.game.config.height - 150, 'blueButton1', 'blueButton2', 'START', 'Registration');

    // Options
    this.optionsButton = new Button(this, this.game.config.width * 0.5 - 160, this.game.config.height - 80, 'blueButton1', 'blueButton2', 'Options', 'Options');

    // // Leaderboard
    this.leaderBoardButton = new Button(this, this.game.config.width * 0.5, this.game.config.height - 80, 'blueButton1', 'blueButton2', 'LeaderBoard', 'LeaderBoard');

    // // Credits
    this.creditsButton = new Button(this, this.game.config.width * 0.5 + 160, this.game.config.height - 80, 'blueButton1', 'blueButton2', 'Credits', 'Credits');

    if (APP.model.musicOn === true) {
      this.globals.bgMusic = this.globals.sfx.music.title;
      this.globals.bgMusic.play();
      APP.model.bgMusicPlaying = true;
    }
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprPlayer',
      APP.player,
    );
  }
}

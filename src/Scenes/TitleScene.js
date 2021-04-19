// eslint-disable-next-line import/no-unresolved
import Phaser from 'phaser';
import Button from '../Components/Button';
import Player from '../Components/Player';
import ScrollingBackground from '../Components/ScrollingBackground';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  preload() {
    this.APP = this.game.APP;
  }

  create() {
    this.game.sound.stopAll();
    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) { // create five scrolling backgrounds
      const bg = new ScrollingBackground(this, 'sprBg0', i * 10);
      this.backgrounds.push(bg);
    }
    this.globals = this.sys.game.globals;
    this.text = this.add.text(this.game.config.width * 0.5, 100, this.APP.NAME, { fontSize: 40, fontWeight: 'bold' });
    this.text.setOrigin(0.5);
    // Game
    this.gameButton = new Button(this, this.game.config.width * 0.5, this.game.config.height - 150, 'blueButton1', 'blueButton2', 'START', 'Registration');

    // Options
    this.optionsButton = new Button(this, this.game.config.width * 0.5 - 160, this.game.config.height - 80, 'blueButton1', 'blueButton2', 'Options', 'Options');

    // // Leaderboard
    this.leaderBoardButton = new Button(this, this.game.config.width * 0.5, this.game.config.height - 80, 'blueButton1', 'blueButton2', 'LeaderBoard', 'LeaderBoard');

    // // Credits
    this.creditsButton = new Button(this, this.game.config.width * 0.5 + 160, this.game.config.height - 80, 'blueButton1', 'blueButton2', 'Credits', 'Credits');

    if (this.APP.model.musicOn === true) {
      this.globals.bgMusic = this.globals.sfx.music.title;
      this.globals.bgMusic.play();
      this.APP.model.bgMusicPlaying = true;
    }
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprPlayer',
      this.APP.player,
    );
  }
}

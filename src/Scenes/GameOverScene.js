import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import ScrollingBackground from '../Objects/ScrollingBackground';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }
  preload(){
    this.APP = this.game.APP
  }
  create() {
    this.game.sound.stopAll();
    // this.add.image(400, 300, 'bgImg');
    this.globals = this.sys.game.globals;
    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) { // create five scrolling backgrounds
      const bg = new ScrollingBackground(this, 'sprBg0', i * 10);
      this.backgrounds.push(bg);
    }

    if (this.APP.model.musicOn === true) {
      this.globals.sfx.music.gameOver.play();
      this.APP.model.bgMusicPlaying = true;
    }
    this.APP.model.gameOver = false;
    this.title = this.add.text(this.game.config.width * 0.5, 120, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.stage = this.add.text(this.game.config.width * 0.5, 180, `${this.APP.stage.name}`, {
      fontFamily: 'monospace',
      fontSize: 30,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.score = this.add.text(this.game.config.width * 0.5, 240, `Score: ${this.APP.model.score}`, {
      fontFamily: 'monospace',
      fontSize: 30,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);
    this.stage.setOrigin(0.5);
    this.score.setOrigin(0.5);

    this.APP.gameOver();
    this.btnRestart = new Button(this, this.game.config.width * 0.5, config.height - 220, 'blueButton1', 'blueButton2', 'Restart', 'Stage');
    this.btnMenu = new Button(this, this.game.config.width * 0.5, config.height - 150, 'blueButton1', 'blueButton2', 'Quit', 'Title', () => { this.game.sound.stopAll(); });
  }

  saveScore() {

  }
}

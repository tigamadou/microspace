import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class GameOverScene extends Phaser.Scene {
  constructor () {
    super('GameOver');
  }

  create () {
    this.add.image(400, 300, 'bgImg');
    this.model = this.sys.game.globals.model;
    this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.score = this.add.text(this.game.config.width * 0.5, 170, `Score: ${this.model.score}`, {
      fontFamily: 'monospace',
      fontSize: 30,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.title.setOrigin(0.5);
    this.score.setOrigin(0.5);

    this.model.score = 0
    this.btnRestart = new Button(this,  this.game.config.width * 0.5, config.height-220, 'blueButton1', 'blueButton2', 'Restart', 'Game');
    this.btnMenu = new Button(this,  this.game.config.width * 0.5, config.height-150, 'blueButton1', 'blueButton2', 'Quit', 'Title');

   
    

    
  }

 
};

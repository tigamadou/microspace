import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class StageScene extends Phaser.Scene {
  constructor () {
    super('Stage');
  }

  create () {
    this.add.image(400, 300, 'bgImg');
    this.game.sound.stopAll();
    this.globals = this.sys.game.globals;
    APP.loadStage()
    this.title = this.add.text(this.game.config.width * 0.5, 128, `${APP.stage.name}`, {
        fontFamily: 'monospace',
        fontSize: 48,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center'
      });
    this.creditsButton = new Button(this,  config.width-120, config.height-220, 'blueButton1', 'blueButton2', 'CONTINUE', 'Game');
    

    
  }

 
};

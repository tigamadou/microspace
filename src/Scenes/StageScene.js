import 'phaser';
import Button from '../Objects/Button';
import ScrollingBackground from '../Objects/ScrollingBackground'
import Player from '../Objects/Player'
export default class StageScene extends Phaser.Scene {
  constructor () {
    super('Stage');
  }

  create () {
    
    this.game.sound.stopAll();
    this.globals = this.sys.game.globals;
    this.backgrounds = [];
    for (var i = 0; i < 5; i++) { // create five scrolling backgrounds
      var bg = new ScrollingBackground(this, "sprBg0", i * 10);
      this.backgrounds.push(bg);
    }
    
    if(!APP.loadStage()){
      APP.gameOver()
      this.scene.start('Credits')
    }
    
    this.title = this.add.text(this.game.config.width * 0.5, 100, `${APP.stage.name}`, {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.title.setOrigin(0.5);
    this.creditsButton = new Button(this,  this.game.config.width*0.5, this.game.config.height-100, 'blueButton1', 'blueButton2', 'CONTINUE', 'Game');
    
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprPlayer",
      APP.stage.player
    );
    
  }

 
};

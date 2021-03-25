import 'phaser';
import {Player} from '../Objects/Entities'
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
    
  }

  preload () {
    // load images
    this.load.image('logo', 'assets/logo.png');
  }

  create () {
    

    this.add.image(400, 300, 'bgImg');
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprPlayer"
    ); 
  }
};

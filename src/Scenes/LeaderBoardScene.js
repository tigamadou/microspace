import 'phaser';
import Button from '../Objects/Button';
import ScrollingBackground from '../Objects/ScrollingBackground'
export default class LeaderBoardScene extends Phaser.Scene{

    constructor(){
        super('LeaderBoard');
    }

    create(){
        this.backgrounds = [];
        for (var i = 0; i < 5; i++) { // create five scrolling backgrounds
          var bg = new ScrollingBackground(this, "sprBg0", i * 10);
          this.backgrounds.push(bg);
        }
        
        this.menuButton = new Button(this, this.game.config.width*0.5, this.game.config.height-80, 'blueButton1', 'blueButton2', 'Menu', 'Title');
    }
}
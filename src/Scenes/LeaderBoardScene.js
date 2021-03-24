import 'phaser';
import Button from '../Objects/Button';

export default class LeaderBoardScene extends Phaser.Scene{

    constructor(){
        super('LeaderBoard');
    }

    create(){
        this.add.image(400, 300, 'bgImg');
        this.menuButton = new Button(this, 150, 50, 'blueButton1', 'blueButton2', '<', 'Title');
    }
}
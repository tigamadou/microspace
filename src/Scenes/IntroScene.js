import 'phaser';
import Button from '../Objects/Button';
import ScrollingBackground from '../Objects/ScrollingBackground';

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super('Intro');
  }

  create() {
    this.backgrounds = [];
    for (let i = 0; i < 5; i++) { // create five scrolling backgrounds
      const bg = new ScrollingBackground(this, 'sprBg0', i * 10);
      this.backgrounds.push(bg);
    }
    const div = document.createElement('div');
    div.innerHTML = `<p
    style=" color: white;font-size: 15px;text-align:justify;width: 420px;line-height: 1.25rem;font-weight: bold;margin: 15px 0 0px 0;"/>
    Greetings ${APP.player.name},
    <br/><br/>
    Welcome to the BattleField
    <br/>
    <br/>
    The universe is in danger. Billions of life are in danger.
    <br/>
    <br/>
    You are their only hope.
    <br/>
    
   
    <br/>
    I wish you good luck on your mission
    <br/>
    <br/>
    Spock,
    <br/>
    Universe Admiral
    <br/>
    
    <br/>
    Pitch/Yaw: [W] [S] [A] [D] - Laser: [SPACEBAR]
    </p>`;
    this.add.dom(this.game.config.width * 0.3, this.game.config.height * 0, div, 'background-color: transparent; width: 220px; height: 0; font: 48px Arial');

    this.creditsButton = new Button(this, this.game.config.width * 0.5, this.game.config.height - 100, 'blueButton1', 'blueButton2', 'CONTINUE', 'Stage');
  }
}
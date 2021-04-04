// eslint-disable-next-line import/no-unresolved
import Phaser from 'phaser';
import ScrollingBackground from '../Components/ScrollingBackground';

export default class RegistrationScene extends Phaser.Scene {
  constructor() {
    super('Registration');
  }

  preload() {
    this.APP = this.game.APP;
  }

  create() {
    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) { // create five scrolling backgrounds
      const bg = new ScrollingBackground(this, 'sprBg0', i * 10);
      this.backgrounds.push(bg);
    }
    const div = document.createElement('div');
    div.classList.add('registration');
    const pname = this.APP.player.name ? this.APP.player.name : '';
    div.innerHTML = `<p>
    
    First, let's get your name
    <br/>
    <br/>
    <input id="name" type="text" class="input" value="${pname}"/>
    <span  id='button' class="startBtn">Save</span>
    <br/>
    <br/>
    
    <br/>

    </p>`;
    this.add.dom(this.game.config.width * 0.5, this.game.config.height * 0.5, div, 'background-color: transparent; width: 220px; height: 220;');

    const btn = document.getElementById('button');
    const name = document.getElementById('name');

    btn.onclick = () => {
      if (name.value.trim() !== '') {
        this.APP.setPlayerName(name.value.trim());
        this.scene.start('Intro');
      }
    };
  }
}
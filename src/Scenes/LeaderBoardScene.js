import 'phaser';
import Button from '../Objects/Button';
import ScrollingBackground from '../Objects/ScrollingBackground'
export default class LeaderBoardScene extends Phaser.Scene{

    constructor(){
        super('LeaderBoard');
        this.loaded = false
    }

    preload(){
       
        console.log(APP.model.leaders)
    }

    async create(){
        this.add.image(400, 300, 'bgImg');
        
        this.backgrounds = [];
        for (var i = 0; i < 5; i++) { // create five scrolling backgrounds
          var bg = new ScrollingBackground(this, "sprBg0", i * 10);
          this.backgrounds.push(bg);
        }
        const div = document.createElement('div');
              div.classList.add('leaderboard')
        const ul = document.createElement('ul');
              ul.classList.add('leaders')
        
        APP.model.leaders.forEach((leader,index) => {
            let element = document.createElement('li')
            element.classList.add('leader')
            element.innerHTML=`        
                    <span class="rank">${index+1}</span>
                    <span class="name">${leader.user}</span>
                    <span class="score">${leader.score}</span>                
            `
            ul.appendChild(element)
        });
        div.appendChild(ul)
        this.add.dom(this.game.config.width * 0.5, this.game.config.height * 0.5, div, 'background-color: rgba(255,255,255,.1); width: 400px; height: 400px;');
        
        this.menuButton = new Button(this, this.game.config.width*0.5, this.game.config.height-80, 'blueButton1', 'blueButton2', 'Menu', 'Title');
        console.log(APP.model.leaders)
    }
    
}
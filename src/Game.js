import 'phaser';

import GameScene from './Scenes/GameScene';
import GameOverScene from './Scenes/GameOverScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import LeaderBoardScene from './Scenes/LeaderBoardScene';
import IntroScene from './Scenes/IntroScene';

export default class Game extends Phaser.Game {
    constructor (config) {
      super(config);
      this.globals = { music:{},bgMusic: null };
      this.scene.add('Boot', BootScene);
      this.scene.add('Preloader', PreloaderScene);
      this.scene.add('Intro', IntroScene);
      this.scene.add('Title', TitleScene);
      this.scene.add('Options', OptionsScene);
      this.scene.add('Credits', CreditsScene);
      this.scene.add('Game', GameScene);
      this.scene.add('LeaderBoard', LeaderBoardScene);
      this.scene.add('GameOver', GameOverScene);
      
    }
    

    runGame(){
        this.scene.start('Boot');
    }
  }
  
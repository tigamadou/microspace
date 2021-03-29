import 'phaser';

import RegistrationScene from './Scenes/RegistrationScene';
import GameScene from './Scenes/GameScene';
import GameOverScene from './Scenes/GameOverScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
import LeaderBoardScene from './Scenes/LeaderBoardScene';
import IntroScene from './Scenes/IntroScene';
import StageScene from './Scenes/StageScene';

export default class Game extends Phaser.Game {
  constructor(config,app) {
    super(config);
    this.globals = { music: {}, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Registration', RegistrationScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Intro', IntroScene);
    this.scene.add('Stage', StageScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('LeaderBoard', LeaderBoardScene);
    this.scene.add('GameOver', GameOverScene);
    this.APP = app
    this.scene.start('Boot');
    
  }

  
 

  
}

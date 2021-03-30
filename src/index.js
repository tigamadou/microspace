import 'phaser';
import './Styles/style.css';
import config from './Config/config';
import App from './App';
import Game from './Game';

const GameId = 'Mvs2tq5oZt0NUQXM2uaF ';
const APP = new App('MicroSpace', GameId);

const MyGame = new Game(config, APP);
window.MyGame = MyGame;
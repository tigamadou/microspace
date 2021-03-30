import 'phaser';
import './Styles/style.css';
import config from './Config/config';
import App from './App';
import Game from './Game';

const APP = new App();

const MyGame = new Game(config, APP);
window.MyGame = MyGame;
import 'phaser';
import './Styles/style.css';
import config from './Config/config';
import App from './App';
import Game from './Game';

const GameId = '0U8oZVpPjuSkEG0XvjLV';
const APP = new App('MicroSpace', GameId);

const MyGame = new Game(config, APP);
window.MyGame = MyGame;
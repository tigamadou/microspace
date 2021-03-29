export default class Model {
  constructor() {
    this._soundOn = true;
    this._musicOn = true;
    this._bgMusicPlaying = false;
    this._score = 0;
    this._level = 1;
    this._gameOver=false;
    this._leaders = []
  }

  set leaders(value){
    this._leaders = value
  }
  get leaders(){
    return this._leaders
  }
  set score(value){
    this._score = value
  }get score(){
    return this._score
  }

  set level(value){
    this._level = value
  }get level(){
    return this._level
  }

  set gameOver(value){
    this.__gameOver = value
  }
  get gameOver(){
    return this.__gameOver
  }
  set musicOn(value) {
    this._musicOn = value;
  }

  get musicOn() {
    return this._musicOn;
  }

  set soundOn(value) {
    this._soundOn = value;
  }

  get soundOn() {
    return this._soundOn;
  }

  set bgMusicPlaying(value) {
    this._bgMusicPlaying = value;
  }

  get bgMusicPlaying() {
    return this._bgMusicPlaying;
  }
}

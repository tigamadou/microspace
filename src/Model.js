export default class Model {
  constructor() {
    this.data = {
      soundOn: true,
      musicOn: true,
      bgMusicPlaying: false,
      score: 0,
      level: 1,
      gameOver: false,
      leaders: [],
    };
  }

  set leaders(value) {
    this.data.leaders = value;
  }

  get leaders() {
    return this.data.leaders;
  }

  set score(value) {
    this.data.score = value;
  }

  get score() {
    return this.data.score;
  }

  set level(value) {
    this.data.level = value;
  }

  get level() {
    return this.data.level;
  }

  set gameOver(value) {
    this.data.gameOver = value;
  }

  get gameOver() {
    return this.data.gameOver;
  }

  set musicOn(value) {
    this.data.musicOn = value;
  }

  get musicOn() {
    return this.data.musicOn;
  }

  set soundOn(value) {
    this.data.soundOn = value;
  }

  get soundOn() {
    return this.data.soundOn;
  }

  set bgMusicPlaying(value) {
    this.data.bgMusicPlaying = value;
  }

  get bgMusicPlaying() {
    return this.data.bgMusicPlaying;
  }
}

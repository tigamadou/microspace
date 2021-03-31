import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('space', 'assets/ui/space.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}
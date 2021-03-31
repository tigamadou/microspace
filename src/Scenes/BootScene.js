import Phaser from 'phaser';
import Logo from '../assets/ui/space.png';
export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('space', Logo);
  }

  create() {
    this.scene.start('Preloader');
  }
}
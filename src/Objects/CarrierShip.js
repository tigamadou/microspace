import Entity from './Entity'
export default class CarrierShip extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "sprEnemy2", "CarrierShip");
        this.play("sprEnemy2");
        this.velocity = {x:0,y:Phaser.Math.Between(50, 100)}
        this.body.velocity.y = this.velocity.y;
        this.score=100
        this.life=50
    }

    update(){
        this.body.velocity.x= this.velocity.x
        this.body.velocity.y=this.velocity.y
      }
}
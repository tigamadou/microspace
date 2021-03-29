
import Model from './Model';
import config from './Config/config';
import Game from './Game';
export default class App {
    constructor() {
        this.scenesFolder = './Scenes/'
        this.model = new Model();

        this.player = {
            name: this.model.name,
            score: this.model.score,
            level: this.model.level,
            rank: this.model.rank,
            weapon: {
                name: 'Laser',
                fire: 10,
                timerShootDelay: 25
            }
        }
        this.STATES = {
            MOVE_DOWN: "MOVE_DOWN",
            CHASE: "CHASE"
        }
        this.enemies = [
            {
                rank: 1,
                createDelay: 1500,
                life: 10,
                score: null,
                shootTimer: 4000,
                maxNumber: 10,
                state: this.STATES.MOVE_DOWN,
                speed: 100,
                weapon: {
                    speed: 150
                }
            },
            {
                rank: 2,
                createDelay: 1500,
                life: 30,
                score: null,
                shootTimer: 1000,
                maxNumber: 10,

                state: this.STATES.MOVE_DOWN,
                speed: 100,
                weapon: {
                    speed: 300
                }
            },
            {
                rank: 3,
                createDelay: 1000,
                life: 100,
                score: null,
                shootTimer: 500,
                maxNumber: 10,
                state: this.STATES.MOVE_DOWN,
                speed: 125,
                weapon: {
                    speed: 100
                }
            }

        ]

        this.stages = [
            {
                name: "stage 1",
                targetScore: 100,
                enemies: [
                    { name: 'GunShip', rank: 1, maxNumber: 10, createDelay: 1000 },
                ],
                player:this.player
            },
            {
                name: "stage 2",
                targetScore: 200,
                enemies: [
                    { name: 'GunShip', rank: 1, maxNumber: 30, createDelay: 1000 },
                    { name: 'GunShip', rank: 1, maxNumber: 10, createDelay: 1000, speed: 200 }
                ],
                player:this.player
            },
            {
                name: "stage 3",
                targetScore: 300,
                enemies: [
                    { name: 'GunShip', rank: 1, maxNumber: 15 },
                    { name: 'ChaserShip', rank: 1, maxNumber: 2 }
                ],
                player:this.player
            }
        ]


        this.stageNumber = 0;

    }


    runGame() {
        this.game = new Game(config)
        this.game.runGame()

    }
    score(value) {
        this.model.score += value
    }
    getStage() {
        return this.stage
    }

    levelUp() {
        console.log('level up')
        this.model.level += 1
        console.log(this.model)
        // this.updateEnemies()
    }

    canLevelUp() {

        if (this.stage.targetScore <= this.model.score) {
            this.stageNumber += 1
            return true
        }
        return false
    }

    loadStage() {
        if (this.stages[this.stageNumber]) {

            this.stage = this.stages[this.stageNumber]
            return true
        }
        return false
    }

    updateEnemies() {
        this.enemies.forEach(enemy => {
            enemy.createDelay = enemy.createDelay - (enemy.createDelay / 0.01)
        });

        console.log(this.enemies)
    }

    getEnemies(stageEnemy) {

        this.enemies.forEach(enemy => {
            if (stageEnemy.rank === enemy.rank) {
                stageEnemy = { ...enemy, ...stageEnemy }

            }
        });
        return stageEnemy
    }

    gameOver() {
        this.model.score = 0
        this.model.gameOver = false
        this.stageNumber = 0;
    }
    setPlayerName(name){
        this.player.name = name
    }

}
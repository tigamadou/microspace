import Model from './Model';
import config from './Config/config';
import Game from './Game';
import Api from './Api';

export default class App {
  constructor() {
    this.scenesFolder = './Scenes/';
    this.model = new Model();
    this.NAME = 'MicroSpace';
    this.GAMEID = undefined;

    this.STATES = {
      MOVE_DOWN: 'MOVE_DOWN',
      CHASE: 'CHASE',
    };
    this.enemies = [
      {
        rank: 1,
        createDelay: 1500,
        life: 50,
        score: 25,
        shootTimer: 4000,
        maxNumber: 10,
        state: this.STATES.MOVE_DOWN,
        speed: 100,
        weapon: {
          speed: 150,
        },
      },
      {
        rank: 2,
        createDelay: 1500,
        life: 200,
        score: 50,
        shootTimer: 1000,
        maxNumber: 10,

        state: this.STATES.MOVE_DOWN,
        speed: 500,
        weapon: {
          speed: 300,
        },
      },
      {
        rank: 3,
        createDelay: 1000,
        life: 300,
        score: 100,
        shootTimer: 500,
        maxNumber: 10,
        state: this.STATES.MOVE_DOWN,
        speed: 125,
        weapon: {
          speed: 100,
        },
      },

    ];
    this.ranks = 4;
    this.lasers = [];
    this.stages = [];
    for (var rank = 1; rank <= this.ranks; rank++) {
      for (var level = 1; level <= 5; level++) {
        const laser = {
          name: 'Laser',
          rank,
          level,
          fire: 50 * (0.5 * level * rank),
          timerShootDelay: 30 - (5 * level),
          speed: -(200 + (200 * level)),
        };
        this.lasers.push(laser);
      }
    }

    this.player = {
      name: this.model.name,
      score: this.model.score,
      level: this.model.level,
      rank: this.model.rank,
      weapon: this.getLaser(1),
    };
    let nRanks = 0;
    for (var rank = 1; rank <= this.ranks; rank++) {
      for (var level = 1; level <= 5; level++) {
        nRanks++;
        const stage = {
          name: `Stage ${nRanks}`,
          targetScore: 300 + (500 * (1 + (nRanks * 2.5))),
          timeLimit: 1 + (30 * (1 + (nRanks * 0.1))),
          enemies: [
            {
              name: 'GunShip', rank: 1, maxNumber: (20 * (1 + (nRanks * 25 / 100))), createDelay: 500, speed: (75 * (1 + (level * 5 / 100))), life: (20 * (1 + (level * 25 / 100))), shootTimer: Phaser.Math.Between(2000, 5000),
            },
            {
              name: 'GunShip', rank: 2, maxNumber: Math.ceil((nRanks / 2) - (1 * (1 + (level * 0.5)))), createDelay: 1000 - (1000 * 0.04 * nRanks), speed: (200 * (1 + (level * 5 / 100))), life: (20 * (1 + (level * 25 / 100))), shootTimer: Phaser.Math.Between(1500, 2000),
            },
            {
              name: 'ChaserShip', rank: 3, maxNumber: Math.ceil((nRanks / 2.5) - (1 * (1 + (level * 0.5)))), createDelay: 1000 - (1000 * 0.04 * nRanks), speed: (150 * (1 + (level * 5 / 100))), life: (20 * (1 + (level * 25 / 100))),
            },
            {
              name: 'CarrierShip', rank: 4, maxNumber: Math.ceil((nRanks / 4) - (1 * (1 + (level * 0.5)))), createDelay: 1000 - (1000 * 0.06 * nRanks), speed: (100 * (1 + (level * 5 / 100))), life: (20 * (1 + (level * 25 / 100))),
            },
          ],
          player: { ...this.player, weapon: this.getLaser(nRanks) },
        };
        this.stages.push(stage);
      }
    }

    // ]

    this.leaders = null;

    this.stageNumber = 0;
    this.api = new Api(this.NAME);

    this.createGame();
    this.getScores();
  }

  getLaser(level) {
    if (this.lasers && this.lasers[level - 1] !== undefined) {
      return this.lasers[level - 1];
    }
    return {};
  }

  createGame() {
    this.GAME = this.api.createGame(this.NAME);
  }

  runGame() {
    this.game = new Game(config);
    this.game.runGame();
  }

  score(value) {
    this.model.score += value;
  }

  getStage() {
    return this.stage;
  }

  levelUp() {
    this.model.level += 1;
    // this.updateEnemies()
  }

  canLevelUp(time) {
    if (this.stage.timeLimit <= time) {
      this.stageNumber += 1;
      return true;
    }
    return false;
  }

  loadStage() {
    if (this.stages[this.stageNumber]) {
      this.stage = this.stages[this.stageNumber];
      return true;
    }
    return false;
  }

  updateEnemies() {
    this.enemies.forEach((enemy) => {
      enemy.createDelay -= (enemy.createDelay / 0.01);
    });
  }

  getEnemies(stageEnemy) {
    this.enemies.forEach((enemy) => {
      if (stageEnemy.rank === enemy.rank) {
        stageEnemy = { ...enemy, ...stageEnemy };
      }
    });
    return stageEnemy;
  }

  gameOver() {
    this.api.saveScrore(this.GAMEID, this.player.name, this.model.score);
    this.model.score = 0;
    this.model.gameOver = false;
    this.stageNumber = 0;
  }

  setPlayerName(name) {
    this.player.name = name;
  }

  async getScores() {
    this.model.leaders = await this.api.getScores(this.GAMEID);
    this.model.leaders.sort((a, b) => b.score - a.score);
    this.model.leaders = this.model.leaders.slice(0, 10);
    return this.model.leaders;
  }
}
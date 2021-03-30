import App from '../src/App';
import Model from '../src/Model';

const name = 'MicroSpace'
const app = new App(name);

test('Should have a not empty model ', () => {    
    expect(app.model).toBeInstanceOf(Model);
});

test('Should have name', () => {
    expect(app.NAME).toEqual(name);
});



test('Should have STATES ', () => {
    expect(app.STATES).toMatchObject({
        MOVE_DOWN: 'MOVE_DOWN',
        CHASE: 'CHASE',
      });
});

test('Should have 3 Enemies types', () => {
    expect(app.enemies.length).toEqual(3);
});

test('All  Enemies type should have the given properties', () => {
    app.enemies.forEach(enemy => {
        
        expect(enemy).toHaveProperty('rank');
        expect(enemy).toHaveProperty('createDelay');
        expect(enemy).toHaveProperty('life');
        expect(enemy).toHaveProperty('score');
        expect(enemy).toHaveProperty('shootTimer');
        expect(enemy).toHaveProperty('maxNumber');
        expect(enemy).toHaveProperty('state');
        expect(enemy).toHaveProperty('speed');
        expect(enemy).toHaveProperty('weapon');

    });
});

test('Should have 3 Enemies types', () => {
    expect(app.enemies.length).toEqual(3);
});

test('Should have 4 Ranks', () => {
    expect(app.ranks).toEqual(4);
});

test('Stage Number should be 0', () => {
    expect(app.stageNumber).toEqual(0);
});

test('Should create the game', ()=>{
    return app.createGame().then(data => {
        
        expect(data).toBe(undefined);
      });
});

test('Should generate 20 stages ', () => {
    expect(app.generateStages().length).toEqual(20);
});

test('Should generate 20 lasers ', () => {
    expect(app.generateLasers().length).toEqual(20);
});

test('Should retreive laser with level 5 ', () => {
    let lazer = app.getLaser(5)
    expect(lazer.level).toEqual(5);
});

test('Should not retreive laser and return false ', () => {
    
    expect(app.getLaser(50)).toBe(false);
});

test('Should update the score ', () => {
   
    expect(app.score(10)).toEqual(10);
});

test('Should not update the score and be false ', () => {
    expect(app.score('sdsd')).toBe(false);
});

test('Should retreive the current stage', () => {
    let stage =app.stages[app.stageNumber]    
    expect(app.loadStage()).toBe(true);
    expect(app.getStage()).toMatchObject(stage);
});

test('Should Not retreive the stage index greater than 19', () => {
    app.stageNumber = 20
    app.stage = null
    expect(app.loadStage()).toBe(false);
    expect(app.getStage()).toBe(null);
});
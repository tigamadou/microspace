import Model from '../src/Model';

test('Should be an instance of Model', () => {
    const element = new Model();
    expect(element).toBeInstanceOf(Model);
});

test('Should return true after creation of leaders', () => {
    const element = new Model();
    const leaders = ['one', 'two'];
    expect(element.leaders = leaders).toBeTruthy();
    expect(element.leaders).toEqual(leaders);
});

test('Should return false  if no data provided', () => {
    const element = new Model();
    expect( element.leaders = null).toBeFalsy();
});
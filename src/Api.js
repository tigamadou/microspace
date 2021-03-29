export default class Api {
  constructor(name) {
    this.baseProject = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';
    this.baseMe = 'https://60615099ac47190017a70a98.mockapi.io/api/games';
    this.base = this.baseProject;
  }

  async createGame(name) {
    const request = new Request(this.base, {
      method: 'POST', mode: 'cors', body: JSON.stringify({ name }), headers: new Headers(),
    });

    const game = await fetch(request)
      .then((resp) => resp.json())
      .then((data) => data.result)
      .catch((e) => false);
    return game;
  }

  async saveScrore(id, user, score) {
    const data = { user, score };
    const url = `${this.base}/${id}/${user}`;
    const request = new Request(url, { method: 'POST', body: JSON.stringify(data), headers: new Headers() });

    await fetch(request)
      .then((resp) => resp.json())
      .then((data) => true)
      .catch((e) => false);
  }

  async getScores(id) {
    let leaders = [];

    const url = `${this.base}/${id}/scores`;
    const request = new Request(url);

    leaders = await fetch(url)
      .then((resp) => resp.json())
      .then((data) => data.result)
      .catch((e) => false);
    return leaders;
  }
}
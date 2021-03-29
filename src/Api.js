export default class Api {
    constructor(name) {
        
        this.baseProject = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games'
        this.baseMe = 'https://60615099ac47190017a70a98.mockapi.io/api/games'
        this.base = this.baseProject

    }

   
    async createGame(name) {
        
        let request = new Request(this.base, { method: 'POST',mode: 'cors', body: JSON.stringify({name: name}), headers: new Headers() });
       
        let game  = await fetch(request)
            .then((resp) => resp.json())
            .then((data) => {


                return data.result
            })
            .catch((e) => {
                return false
            });
        return game
    }
    async saveScrore(id, user, score) {
        let data = { user, score }
        let url = `${this.base}/${id}/${user}`
        var request = new Request(url, { method: 'POST', body: JSON.stringify(data), headers: new Headers() });
       
        await fetch(request)
            .then((resp) => resp.json())
            .then((data) => {


                return true
            })
            .catch((e) => {
                return false
            });
    }

    async getScores(id) {
        let leaders = []

        let url = `${this.base}/${id}/scores`
        var request = new Request(url);

        leaders = await fetch(url)
            .then((resp) => resp.json())
            .then((data) => {


                return data.result
            })
            .catch((e) => {
                return false
            });
        return leaders

    }

}
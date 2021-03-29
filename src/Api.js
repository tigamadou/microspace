export default class Api {
    constructor(name) {
        this.game = { name }
        this.baseProject = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games'
        this.baseMe = 'https://60615099ac47190017a70a98.mockapi.io/api/games'
        this.base = this.baseProject

    }

    request(url, options = null, success, error) {
        let run = () => {

            fetch(url, options)
                .then((resp) => resp.json())
                .then(success)
                .catch(error);
        }
        run()
    }
    async createGame() {
        let data = {
            name: this.game
        }
        var request = new Request(this.base, { method: 'POST',mode: 'cors', body: JSON.stringify({name: this.game.name}), headers: new Headers() });
       
        this.game = await fetch(request)
            .then((resp) => resp.json())
            .then((data) => {


                return data.result
            })
            .catch((e) => {
                console.log(e)
                return false
            });
    }
    saveScrore(user, score) {
        let data = { user, score }
        console.log(data)
        let url = `${this.base}/${this.game.id}/${user}`
        var request = new Request(url, { method: 'POST', body: JSON.stringify(data), headers: new Headers() });
        this.request(
            request,
            (data) => {
                console.log(this.game)
                return true
            }, (e) => {
                console.log(e)
                return false
            }
        )
    }

    async getScores() {
        let leaders = []

        let url = `${this.base}/${this.game.id}/scores`
        var request = new Request(url);

        leaders = await fetch(url)
            .then((resp) => resp.json())
            .then((data) => {


                return data.result
            })
            .catch((e) => {
                console.log(e)
                return false
            });
        return leaders

    }

}
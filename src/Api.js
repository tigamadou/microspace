export default class Api {
    constructor(name) {
        this.game = {name}
        this.baseProject = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games'
        this.baseMe = 'https://60615099ac47190017a70a98.mockapi.io/api/games'
        this.base = this.baseProject
    }

    request(url, options = null, success, error) {
        fetch(url,options)
            .then((resp) => resp.json())
            .then(success)
            .catch(error);
    }
    createGame() {
        let data = {
            name : this.game
        }
        var request = new Request(this.base,  {method: 'POST',body:  JSON.stringify(data),headers: new Headers()});
        this.request(
            request,
            (data) => {
                this.game = {...this.game,...data}
                console.log(this.game)
            }, (e) => {
                console.log(e)
                return false
            }
        )
    }
    saveScrore(user,score){
        let data = {user,score}
        let url = `${this.base}/${this.game.id}/${user}`
        var request = new Request(url,  {method: 'POST',body:  JSON.stringify(data),headers: new Headers()});
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

    getScores(){
        let leaders = []
        for (let index = 0; index < 10; index++) {
            
            leaders.push({
                user: `User ${index+1}`,
                score: 1500+index*10,
            })
        }

        return leaders
    }
    
}
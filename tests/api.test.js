require('regenerator-runtime/runtime');
import axios from 'axios';
const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';
let id = 'Mvs2tq5oZt0NUQXM2uaF';
const api = {
    getScores: async() => {
        let url = `${baseUrl}/${id}/scores`;
        let arr = await axios.get(url)
            .then(response => response.data).catch(error => error);;
        return arr;
    },
    saveScrore: async(id, user, score)=>{
        let url = `${baseUrl}/${id}/scores`;

        let data = await axios.post(url, { user:user, score:score })
          .then(response => response.data).catch(error => error);
          
        return data.result;
    }
}

jest.mock('axios');
test('should fetch result data with users and scores', async () => {
    const dbData = { data: { result: [{ score: 1580, user: 'Amadou' }, { score: 260, user: 'Tigana' }] } };
    axios.get.mockResolvedValue(dbData);    
    const response = await api.getScores(id);
    expect(response.result.length).toBe(2);
});

test('should save the user score', async () => {
    const returnData = { data: { result: 'You need to provide a valid score for the leaderboard' } };
    axios.post.mockResolvedValue(returnData);    
    const response = await api.saveScrore(id,'amadou',1500);    
    
    expect(response).toBe('You need to provide a valid score for the leaderboard');
});
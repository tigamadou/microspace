// eslint-disable-next-line import/no-unresolved
import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
require('regenerator-runtime/runtime');

const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';
const id = 'Mvs2tq5oZt0NUQXM2uaF';
const api = {
  getScores: async () => {
    const url = `${baseUrl}/${id}/scores`;
    const arr = await axios.get(url)
      .then(response => response.data).catch(error => error);
    return arr;
  },
  saveScrore: async (id, user, score) => {
    const url = `${baseUrl}/${id}/scores`;

    const data = await axios.post(url, { user, score })
      .then(response => response.data).catch(error => error);

    return data.result;
  },
};

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
  const response = await api.saveScrore(id, 'amadou', 1500);

  expect(response).toBe('You need to provide a valid score for the leaderboard');
});
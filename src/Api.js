// eslint-disable-next-line import/no-unresolved
import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
require('regenerator-runtime/runtime');

const Api = () => {
  const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';
  return {

    createGame: async (name) => {
      const response = await axios.post(baseUrl, { name })
        .then(response => response.data)
        .catch(error => error.response.data);

      return response.result;
    },

    saveScrore: async (id, user, score) => {
      const url = `${baseUrl}/${id}/scores`;

      const data = await axios.post(url, { user, score })
        .then(response => response.data).catch(error => error);
      return data.resul;
    },

    getScores: async (id) => {
      let arr = [];
      const url = `${baseUrl}/${id}/scores`;
      arr = await axios.get(url)
        .then(response => response.data).catch(error => error);
      return arr.result;
    },
  };
};

export default Api;
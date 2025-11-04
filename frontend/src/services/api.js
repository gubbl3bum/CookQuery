import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export default {
  getRecipes(params) {
    return axios.get(`${API_URL}/recipes`, { params });
  },
  
  getRecipeById(id) {
    return axios.get(`${API_URL}/recipes/${id}`);
  }
};
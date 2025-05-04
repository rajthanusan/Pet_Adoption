import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/pets';

const getAllPets = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching pets:', error);
    throw error;
  }
};

const getPetsByMood = async (mood) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/filter?mood=${mood}`);
    return response.data;
  } catch (error) {
    console.error('Error filtering pets by mood:', error);
    throw error;
  }
};

const createPet = async (petData) => {
  try {
    const response = await axios.post(API_BASE_URL, petData);
    return response.data;
  } catch (error) {
    console.error('Error creating pet:', error);
    throw error;
  }
};

const updatePet = async (id, petData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, petData);
    return response.data;
  } catch (error) {
    console.error('Error updating pet:', error);
    throw error;
  }
};

const adoptPet = async (id) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${id}/adopt`);
    return response.data;
  } catch (error) {
    console.error('Error adopting pet:', error);
    throw error;
  }
};

const deletePet = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting pet:', error);
    throw error;
  }
};

export {
  getAllPets,
  getPetsByMood,
  createPet,
  updatePet,
  adoptPet,
  deletePet
};
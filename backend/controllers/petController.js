const petService = require('../services/petService');

const createPet = async (req, res, next) => {
  try {
    const pet = await petService.createPet(req.body);
    res.status(201).json(pet);
  } catch (error) {
    next(error);
  }
};

const getAllPets = async (req, res, next) => {
  try {
    const pets = await petService.getAllPets();
    res.status(200).json(pets);
  } catch (error) {
    next(error);
  }
};

const getPetById = async (req, res, next) => {
  try {
    const pet = await petService.getPetById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json(pet);
  } catch (error) {
    next(error);
  }
};

const updatePet = async (req, res, next) => {
  try {
    const pet = await petService.updatePet(req.params.id, req.body);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json(pet);
  } catch (error) {
    next(error);
  }
};

const adoptPet = async (req, res, next) => {
  try {
    const pet = await petService.adoptPet(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json(pet);
  } catch (error) {
    next(error);
  }
};

const deletePet = async (req, res, next) => {
  try {
    const pet = await petService.deletePet(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (error) {
    next(error);
  }
};
const getPetsByMood = async (req, res, next) => {
    try {
      const { mood } = req.query;
      const validMoods = ['Happy', 'Excited', 'Sad'];
      
      if (!mood) {
        return res.status(400).json({ message: 'Mood parameter is required' });
      }
      
      if (!validMoods.includes(mood)) {
        return res.status(400).json({ 
          message: 'Invalid mood filter',
          validMoods: validMoods
        });
      }
      
      const pets = await petService.getPetsByMood(mood);
      res.status(200).json(pets);
    } catch (error) {
      console.error('Error in getPetsByMood:', error);
      next(error);
    }
  };

module.exports = {
  createPet,
  getAllPets,
  getPetById,
  updatePet,
  adoptPet,
  deletePet,
  getPetsByMood
};
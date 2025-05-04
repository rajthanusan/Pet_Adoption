const Pet = require('../models/petModel');
const { calculateMood } = require('../utils/moodLogic');

const createPet = async (petData) => {
  const pet = new Pet(petData);
  await pet.save();
  return pet;
};

const getAllPets = async () => {
  const pets = await Pet.find({});
  return pets.map(pet => ({
    ...pet.toObject(),
    mood: calculateMood(pet.createdAt)
  }));
};

const getPetById = async (id) => {
  const pet = await Pet.findById(id);
  if (!pet) return null;
  return {
    ...pet.toObject(),
    mood: calculateMood(pet.createdAt)
  };
};

const updatePet = async (id, updateData) => {
  const pet = await Pet.findByIdAndUpdate(id, updateData, { new: true });
  if (!pet) return null;
  return {
    ...pet.toObject(),
    mood: calculateMood(pet.createdAt)
  };
};

const adoptPet = async (id) => {
  const pet = await Pet.findByIdAndUpdate(
    id,
    { adopted: true, adoptionDate: new Date() },
    { new: true }
  );
  if (!pet) return null;
  return {
    ...pet.toObject(),
    mood: calculateMood(pet.createdAt)
  };
};

const deletePet = async (id) => {
  const pet = await Pet.findByIdAndDelete(id);
  return pet;
};


const getPetsByMood = async (mood) => {
    try {
      const pets = await Pet.find({});
      return pets
        .map(pet => ({
          ...pet.toObject(),
          mood: calculateMood(pet.createdAt)
        }))
        .filter(pet => pet.mood.toLowerCase() === mood.toLowerCase());
    } catch (error) {
      console.error('Error in service while filtering pets by mood:', error);
      throw error;
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
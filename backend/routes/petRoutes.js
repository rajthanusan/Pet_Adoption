const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

router.get('/filter', petController.getPetsByMood);

router.post('/', petController.createPet);

router.get('/', petController.getAllPets);

router.get('/:id', petController.getPetById);

router.put('/:id', petController.updatePet);

router.patch('/:id/adopt', petController.adoptPet);

router.delete('/:id', petController.deletePet);

module.exports = router;
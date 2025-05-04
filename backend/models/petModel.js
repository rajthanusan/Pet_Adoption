const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  species: {
    type: String,
    required: true,
    enum: ['Dog', 'Cat', 'Rabbit', 'Bird', 'Fish', 'Other'],
    default: 'Dog'
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  personality: {
    type: String,
    required: true,
    trim: true
  },
  mood: {
    type: String,
    enum: ['Happy', 'Excited', 'Sad'],
    default: 'Happy'
  },
  adopted: {
    type: Boolean,
    default: false
  },
  adoptionDate: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
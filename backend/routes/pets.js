const express = require('express');
const { cloudinary, storage } = require('../utils/cloudinary');
const multer = require('multer');
const Pet = require('../models/Pet');
const router = express.Router();
const upload = multer({ storage: storage });

// Add a new pet
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, description } = req.body;
    const imageUrl = req.file.path;

    const newPet = new Pet({ name, description, imageUrl });
    await newPet.save();

    res.status(201).json({ message: 'Pet added successfully', pet: newPet });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading pet' });
  }
});

// Get all pets
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pets' });
  }
});

// Get pet by ID
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pet' });
  }
});

// Update pet details
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description } = req.body;
    const updatedData = { name, description };

    if (req.file) {
      const imageUrl = req.file.path;
      updatedData.imageUrl = imageUrl;
    }

    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updatedPet);
  } catch (error) {
    res.status(500).json({ error: 'Error updating pet' });
  }
});

// Delete pet
router.delete('/:id', async (req, res) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pet deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting pet' });
  }
});

module.exports = router;

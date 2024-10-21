const express = require('express');
const AdoptionRequest = require('../models/AdoptionRequest').default;
const router = express.Router();

// Create adoption request
router.post('/', async (req, res) => {
  const { userId, petId } = req.body;
  
  try {
    const newRequest = new AdoptionRequest({ userId, petId });
    await newRequest.save();
    res.status(201).json({ message: 'Adoption request submitted', request: newRequest });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting adoption request' });
  }
});

// Get all adoption requests
router.get('/', async (req, res) => {
  try {
    const requests = await AdoptionRequest.find().populate('userId petId');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching adoption requests' });
  }
});

// Update request status
router.put('/:id', async (req, res) => {
  const { status } = req.body;
  
  try {
    const updatedRequest = await AdoptionRequest.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ error: 'Error updating request status' });
  }
});

module.exports = router;

const express = require('express');
const Drawing = require('../models/Drawing');
const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, title, imageData } = req.body;
  const newDrawing = new Drawing({ userId, title, imageData });
  try {
    await newDrawing.save();
    res.status(201).json({ success: true, data: newDrawing });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error! Something went wrong.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const drawings = await Drawing.find();
    res.status(200).json({ success: true, data: drawings });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error! Something went wrong.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const drawing = await Drawing.findById(req.params.id);
    if (!drawing) {
      return res.status(404).json({ success: false, message: 'Drawing not found' });
    }
    res.status(200).json({ success: true, data: drawing });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error! Something went wrong.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedDrawing = await Drawing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDrawing) {
      return res.status(404).json({ success: false, message: 'Drawing not found' });
    }
    res.status(200).json({ success: true, data: updatedDrawing });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error! Something went wrong.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedDrawing = await Drawing.findByIdAndDelete(req.params.id);
    if (!deletedDrawing) {
      return res.status(404).json({ success: false, message: 'Drawing not found' });
    }
    res.status(200).json({ success: true, data: deletedDrawing });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error! Something went wrong.' });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const sociasService = require('../services/sociasService');

// GET all socias
router.get('/', async (req, res, next) => {
  try {
    const socias = await sociasService.getAllSocias();
    res.json(socias);
  } catch (err) {
    next(err);
  }
});

// GET socia by ID
router.get('/:id', async (req, res, next) => {
  try {
    const socia = await sociasService.getSociaById(req.params.id);
    if (socia) {
      res.json(socia);
    } else {
      res.status(404).send('Socia not found');
    }
  } catch (err) {
    next(err);
  }
});

// POST a new socia
router.post('/', async (req, res, next) => {
  try {
    const newSocia = await sociasService.createSocia(req.body);
    res.status(201).json(newSocia);
  } catch (err) {
    next(err);
  }
});

// PUT to update a socia
router.put('/:id', async (req, res, next) => {
  try {
    const updatedSocia = await sociasService.updateSocia(req.params.id, req.body);
    if (updatedSocia.length > 0) {
      res.json(updatedSocia[0]);
    } else {
      res.status(404).send('Socia not found');
    }
  } catch (err) {
    next(err);
  }
});

// DELETE a socia
router.delete('/:id', async (req, res, next) => {
  try {
    await sociasService.deleteSocia(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;

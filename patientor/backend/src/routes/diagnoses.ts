import express from 'express';
import diagnosesService from '../services/diagnoses';

const router = express.Router();

// Exercise 9.10
router.get('/', (_req, res) => {
  res.send(diagnosesService.getEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;
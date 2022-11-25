import express from 'express';
import patientsService from '../services/patients';

const router = express.Router();

// Exercise 9.10
router.get('/', (_req, res) => {
  res.send(patientsService.getEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;
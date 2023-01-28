import express from 'express';
import patients from '../../data/patients';
import patientsService from '../services/patients';
import toNewPatientEntry, { toNewEntry } from '../utils';

const router = express.Router();

// Exercise 9.10
router.get('/', (_req, res) => {
  res.send(patientsService.getEntries());
});

// Exercise 9.16
router.get('/:id', (req, res) => { 
  const patient = patientsService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

// Exercise 9.12
router.post('/', (req, res) => {
  //const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientsService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

// Exercise 9.23
router.post('/:id/entries', (req, res) => {
  try {
    const patient = patients.find(d => d.id === req.params.id);
    if (patient) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const newEntry = toNewEntry(req.body);
      //const updatedPatient = patientsService.addNewEntryToPatient(patient, newEntry);
      const updatedPatient = patientsService.addPatientEntry(patient, newEntry);
      res.send(updatedPatient);
    } else {
      res.send(404);
    }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
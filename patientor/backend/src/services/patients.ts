import patients from '../../data/patients';
import { NewPatientEntry, NonSensitivePatientEntry, Patient, PublicPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, name, dateOfBirth, gender, occupation, entries
  }));
};

// Exercise 9.16
const findById = (id: string): PublicPatient | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry;
};

// Exercise 9.12
const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuid(), 
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  findById,
  addPatient
};
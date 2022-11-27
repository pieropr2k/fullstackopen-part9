import patients from '../../data/patients';
import { NewPatientEntry, NonSensitivePatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const findById = (id: string): Patient | undefined => {
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
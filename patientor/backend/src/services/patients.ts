import patients from '../../data/patients';
import { Entry, NewPatientEntry, NonSensitivePatientEntry, Patient, PublicPatient } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id, name, dateOfBirth, gender, occupation, entries
  }));
};

// Exercise 9.16
const findById = (id: string): PublicPatient | undefined => {
  const patient = patients.find(d => d.id === id);
  return patient;
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

// Exercise 9.23
//const addNewEntryToPatient = (patient: Patient, newEntry: Entry): Patient => {
const addPatientEntry = (patient: Patient, newEntry: Entry): Patient => {
  patient.entries = [...patient.entries, newEntry];
  patients.map(el => el.id === patient.id ? patient : el);
  return patient;
};

export default {
  getEntries,
  findById,
  addPatient,
  addPatientEntry,
  //addNewEntryToPatient
};
import patients from '../../data/patients';
import { NonSensitivePatientEntry } from '../types';

const getEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary
};
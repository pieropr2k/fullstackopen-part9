import { BaseEntry, Entry, Gender, HealthCheckRating, NewPatientEntry } from './types';
import { v1 as uuid } from 'uuid';

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return new Date(date).toISOString().split('T')[0];
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (comment: unknown, fieldName: string): string => {
  if (!comment || !isString(comment)) {
    throw new Error(`${fieldName} field is incorrect or missing`);
  }
  return comment;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(gender + ' is not a gender...');
  }
  return gender;
};

type Fields = { 
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown
};

// Exercise 9.13
const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseString(name, 'name'),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseString(occupation, 'occupation'),
    entries: []
  };
  return newEntry;
};

//const isHealthCheckRating = (param: any): param is HealthCheckRating => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): boolean => {
  console.log(Object.values(HealthCheckRating), "jaja");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheck: unknown): HealthCheckRating => {
  //console.log(healthCheck);
  //console.log(isHealthCheckRating(healthCheck));
  if (isHealthCheckRating(healthCheck) === false) {
    throw new Error(healthCheck + ' is not in the range...');
  }
  return healthCheck as HealthCheckRating;
};

// Exercise 9.23
export const toNewEntry = (object: Entry): Entry => {
  const newEntry: BaseEntry = {
    id: uuid(),
    description: parseString(object.description, 'description'),
    date: parseDate(object.date),
    specialist: parseString(object.specialist, 'specialist'),
  };
  switch (object.type) {
    case 'Hospital':
      return {
        ...newEntry,
        diagnosisCodes: object.diagnosisCodes,
        type: 'Hospital',
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseString(object.discharge.criteria, 'dischargeCriteria')
        }
      };
    case 'OccupationalHealthcare':
      const sickLeave = object.sickLeave ? {
        startDate: parseDate(object.sickLeave.startDate),
        endDate: parseDate(object.sickLeave.endDate)
      } : undefined;
      return {
        ...newEntry,
        type: 'OccupationalHealthcare',
        diagnosisCodes: object.diagnosisCodes,
        employerName: parseString(object.employerName, 'employerName'),
        sickLeave
      };
    case 'HealthCheck':
      return {
        ...newEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
    default:
      throw new Error(`Incorrect entry type`);
  }
};

export default toNewPatientEntry;
import { Gender, NewPatientEntry } from './types';

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
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
    occupation: parseString(occupation, 'occupation')
  };
  return newEntry;
};

export default toNewPatientEntry;
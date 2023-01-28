export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
}

// Exercise 9.19
export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface SickLeaveInfo {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeaveInfo
}

interface DischargeInfo {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: DischargeInfo;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

// Exercise 9.16
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;

export type NewPatientEntry = Omit<Patient, 'id'>;
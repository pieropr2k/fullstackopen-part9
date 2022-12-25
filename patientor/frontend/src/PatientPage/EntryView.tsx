import { Entry, HealthCheckEntry, HealthCheckRating, OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box } from "@mui/material";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const OccupationalHealthCareData: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  //console.log(entry);
  const {date, description, specialist, employerName} = entry;
  return <Box sx={{ border: 1, my: 1 }}>
    <div>
      {date}
      <MedicalInformationIcon />
      {employerName}
    </div>
    <p>{description}</p>
    <p>{`diagnose by ${specialist}`}</p> 
  </Box>;
};

const getHeartColor = (color: HealthCheckRating) => {
  switch (color) {
    case HealthCheckRating.CriticalRisk:
      return "error";
    case HealthCheckRating.HighRisk:
      return "secondary";
    case HealthCheckRating.LowRisk:
      return "primary";
    case HealthCheckRating.Healthy:
      return "success";
    default:
      return undefined;
  }
};

const HealthCheckData: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  //console.log(entry);
  const {date, description, specialist, healthCheckRating} = entry;
  return <Box sx={{ border: 1, my: 1 }}>
    <div>
      {date}
      <WorkIcon />
    </div>
    <p>{description}</p>
    <FavoriteIcon color={getHeartColor(healthCheckRating)}/>
    <p>{`diagnose by ${specialist}`}</p> 
  </Box>;
};

// Exercise 9.21
const HospitalEntryData: React.FC<{ entry: Entry }> = ({ entry }) => {
  //console.log(entry);
  const [{ diagnoses },] = useStateValue();
  const {date, description, diagnosisCodes} = entry;
  // Exercise 9.20
  return <Box sx={{ border: 1, my: 1 }}>
    <div>
      {date}
      <LocalHospitalIcon />
    </div>
    <p>{description}</p>
    {
      diagnosisCodes
      ? <ul>
        {diagnosisCodes ? diagnosisCodes.map(el =><li key={el}>{el} {diagnoses[el] ? diagnoses[el].name : null}</li>) : null}
      </ul>
      : null
    }
  </Box>;
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`); 
};

// Exercise 9.22
const EntryView: React.FC<{entry: Entry}> = ({ entry }) => {
  //console.log(entry);
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryData entry={entry}/>;
    case "HealthCheck":
      return <HealthCheckData entry={entry}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthCareData entry={entry}/>;
    default:
      return assertNever(entry);
  }
};

export default EntryView;
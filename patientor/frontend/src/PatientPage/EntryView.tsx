import { PatientDetails } from "../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

interface GenderProps {
  gender: string;
}

const GenderComponent = ({gender}: GenderProps) => gender === 'male' ? <MaleIcon/> : <FemaleIcon/>;

interface PatientProps {
  patient: PatientDetails
}

// Exercise 9.17
const EntryView = ({ patient }: PatientProps) => {
  return patient ? (
    <div>
      <h2>{`${patient.name} `}<GenderComponent gender={patient.gender} /></h2>
      <p>
        {`ssh: ${patient.ssn}`}
      </p>
      <p>{`occupation: ${patient.occupation}`}</p>
    </div>
  )
  : <h2>Wait...</h2>;
};

export default EntryView;
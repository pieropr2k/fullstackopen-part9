import React from "react";
import axios from "axios";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { PatientDetails } from "../types";
import EntryView from "./EntryView";

interface GenderProps {
  gender: string;
}
const GenderComponent = ({gender}: GenderProps) => gender === 'male' ? <MaleIcon/> : <FemaleIcon/>;

// Exercise 9.17
const PatientPage = () => {
  const [patient, setPatient] = React.useState<PatientDetails | undefined>();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    if (!id) return;
    const getPatient = async () => {
      try {
        const { data: thePatient } = await axios.get<PatientDetails>(`${apiBaseUrl}/patients/${id}`);
        setPatient(thePatient);
      } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if(axios.isAxiosError(error) && error.response) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          errorMessage = `${errorMessage} Error: ${error.response.data.message}`;
        }
        console.error(errorMessage);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getPatient();
  }, []);

  return patient ? (
    <div>
      <h2>{`${patient.name} `}<GenderComponent gender={patient.gender}/></h2>
      <p>
        {`ssh: ${patient.ssn}`}
      </p>
      <p>{`occupation: ${patient.occupation}`}</p>
      <h3>entries</h3>
      {patient.entries.map(entry =><EntryView key={entry.id} entry={entry}/>)}
    </div>
  )
  : <h2>Wait...</h2>;
};

export default PatientPage;
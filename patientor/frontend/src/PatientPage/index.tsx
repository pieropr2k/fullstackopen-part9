import React from "react";
import axios from "axios";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient, PatientDetails } from "../types";
import EntryView from "./EntryView";
import { Button} from "@material-ui/core";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { useStateValue } from "../state";

interface GenderProps {
  gender: string;
}
const GenderComponent = ({gender}: GenderProps) => gender === 'male' ? <MaleIcon/> : <FemaleIcon/>;

// Exercise 9.17
const PatientPage = () => {
  const [patient, setPatient] = React.useState<PatientDetails | undefined>();
  const { id } = useParams<{ id: string }>();

  const [, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    //console.log(values);
    try {
      const { data: updatedPatientWithNewEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id ? id : ''}/entries`,
        values
      );
      setPatient(updatedPatientWithNewEntry as PatientDetails);
      dispatch({ type: "ADD_ENTRY_TO_PATIENT", payload: updatedPatientWithNewEntry });
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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

  return (
    <div>
      {
        patient ? (<>
          <h2>{`${patient.name} `}<GenderComponent gender={patient.gender}/></h2>
          <p>
            {`ssh: ${patient.ssn}`}
          </p>
          <p>{`occupation: ${patient.occupation}`}</p>
          <h3>entries</h3>
          {patient.entries.map(entry =><EntryView key={entry.id} entry={entry}/>)}
        </>) 
        : <h2>Wait...</h2>
      }
      <AddEntryModal
        modalOpen={modalOpen}
        error={error}
        onSubmit={submitNewEntry}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Patient
      </Button>
    </div>
  );
};

export default PatientPage;
import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { PatientDetails } from "../types";
import EntryView from "./EntryView";

// Exercise 9.17
const PatientPage = () => {
  const [patient, setPatient] = React.useState<PatientDetails | undefined>();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    if (!id) return;
    const getPatient = async () => {
      try {
        const { data: thePatient } = await axios.get<PatientDetails>(`${apiBaseUrl}/patients/${id}`);
        console.log(thePatient);
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

  return <EntryView patient={patient}/>;
};

export default PatientPage;
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { TextField, SelectField, DiagnosisSelection, EntryTypeOption, HealthCheckRatingOption } from "../components/FormField";
import { useStateValue } from "../state";
import { Diagnosis, Entry, EntryType, HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry, UnionOmit } from "../types";

// Exercise 9.23
export type EntryFormValues = UnionOmit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: "HealthCheck" },
  { value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare" },
  { value: EntryType.Hospital, label: "Hospital" },
];

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "LowRisk" },
  { value: HealthCheckRating.HighRisk, label: "HighRisk" },
  { value: HealthCheckRating.CriticalRisk, label: "LowRisk" },
];

interface FormFieldsProps {
  setFieldTouched: (field: string, isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => void;
  setFieldValue: (field: string, value: unknown, shouldValidate?: boolean | undefined) => void;
  diagnoses: { [code: string]: Diagnosis };
}

// Exercise 9.26-27
interface HealthCheckFormFieldsProps {
  healthCheckRatingOptions: { value: number, label: string }[];
}

export const HospitalFormFields = ({ setFieldValue, setFieldTouched, diagnoses }: FormFieldsProps) => {
  return (<>
    <DiagnosisSelection
      setFieldValue={setFieldValue}
      setFieldTouched={setFieldTouched}
      diagnoses={Object.values(diagnoses)}
    />
    <div>Discharge:</div>
    <Field
      label="Discharge Date"
      placeholder="Discharge Date"
      name="discharge.date"
      component={TextField}
    />
    <Field
      label="Discharge Criteria"
      placeholder="Discharge Criteria"
      name="discharge.criteria"
      component={TextField}
    />
  </>);
};

export const OccupationalHealthcareFormFields = ({ setFieldValue, setFieldTouched, diagnoses }: FormFieldsProps) => {
  return (<>
    <DiagnosisSelection
      setFieldValue={setFieldValue}
      setFieldTouched={setFieldTouched}
      diagnoses={Object.values(diagnoses)}
    />
    <Field
      label="Employer Name"
      placeholder="Employer Name"
      name="employerName"
      component={TextField}
    />
    <div>SickLeave:</div>
    <Field
      label="SickLeave Start Date"
      placeholder="SickLeave Start Date"
      name="sickLeave.startDate"
      component={TextField}
    />
    <Field
      label="SickLeave End Date"
      placeholder="SickLeave End Date"
      name="sickLeave.endDate"
      component={TextField}
    />
  </>);
};

export const HealthCheckFormFields = ({ healthCheckRatingOptions }: HealthCheckFormFieldsProps) => {
  return (<>
    <SelectField label="Health Check Rating Options" name="healthCheckRating" options={healthCheckRatingOptions} />
  </>);
};

// Exercise 9.24
export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        date: new Date().toISOString().split("T")[0],
        specialist: "",
        description: "",
        type: "Hospital",
        diagnosisCodes: [],
        // type Hospital:
        discharge: {
          date: new Date().toISOString().split("T")[0],
          criteria: ""
        },
        // type OccupationalHealthCare:
        employerName: "",
        sickLeave: {
          startDate: new Date().toISOString().split("T")[0],
          endDate: new Date().toISOString().split("T")[0]
        },
        // type HealthCheck:
        healthCheckRating: 0
      } as EntryFormValues}
      onSubmit={onSubmit}
      // Exercise 9.25
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (values.type === "Hospital"){
          values as HospitalEntry;
          if (!values.discharge.date) {
            errors.discharge = requiredError;
          }
          if (!values.discharge.criteria) {
            errors.discharge = requiredError;
          }
        }
        if (values.type === "OccupationalHealthcare"){
          values as OccupationalHealthcareEntry;
          if (!values.employerName) {
            errors.employerName = requiredError;
          }
        }
        if (values.type === "HealthCheck"){
          values as HealthCheckEntry;
          if (!values.healthCheckRating) {
            errors.healthCheckRating = requiredError;
          }
        }
        return errors;
      }}
    >
      {({ values, isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <SelectField label="Type" name="type" options={entryTypeOptions} />
            {
              values.type === 'Hospital'
                ? <HospitalFormFields setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} diagnoses={diagnoses} />
                : null
            }
            {
              values.type === 'HealthCheck'
                ? <HealthCheckFormFields healthCheckRatingOptions={healthCheckRatingOptions} />
                : null
            }
            {
              values.type === 'OccupationalHealthcare'
                ? <OccupationalHealthcareFormFields setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} diagnoses={diagnoses} />
                : null
            }
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
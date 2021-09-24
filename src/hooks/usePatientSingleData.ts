import axios from "axios";
import {useEffect} from "react";
import { apiBaseUrl } from "../constants";
import { updatePatient, useStateValue } from "../state";
import { Patient } from "../types";

type PatientSingleDataProps = {
    id : string
};

const usePatientSingleData = ({id}:PatientSingleDataProps) : Patient => {
    const [{patients},dispatch]= useStateValue();
    const patient = patients[id]; //get the patient data of the state
    useEffect(()=>{

        const fetchPatienData = async () => {
            //fetch the patient to backend
            const { data : patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            //update patient data in the store
            dispatch(updatePatient(patient));
            //dispatch({ type: "UPDATE_PATIENT", payload: patient });
        };

        //get local data to check if patient was visited prev
        const localData : string | null = window.localStorage.getItem('patientsFeched'); 

        if(typeof localData === 'string'){
            const patientsFeched = JSON.parse(localData) as Array<string> | null;
            // check if local patient data has not the current patient id
            if(!patientsFeched?.includes(id)){
                patientsFeched?.push(id);
                window.localStorage.setItem('patientsFeched',`${JSON.stringify(patientsFeched)}`); 
                //fetch patient data on backend
                void fetchPatienData();    
            }

        }else{
            //create local patients data
            const newPatientsFeched = [id]; 
            window.localStorage.setItem('patientsFeched',`${JSON.stringify(newPatientsFeched)}`);
            void fetchPatienData();
        }

    },[]);

    return patient;
};

export default usePatientSingleData;
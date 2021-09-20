import axios from "axios";
import {useEffect} from "react";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";

type PatientSingleDataProps = {
    id : string
};

const usePatientSingleData = ({id}:PatientSingleDataProps) : Patient => {
    const [{patients},dispatch]= useStateValue();
    const patient = patients[id];
    useEffect(()=>{

        const fetchPatienData = async () => {
            const { data : patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            dispatch({ type: "UPDATE_PATIENT", payload: patient });
        };

        const localData : string | null = window.localStorage.getItem('patientsFeched'); 

        if(typeof localData === 'string'){
            const patientsFeched = JSON.parse(localData) as Array<string> | null;

            if(!patientsFeched?.includes(id)){
                patientsFeched?.push(id);
                window.localStorage.setItem('patientsFeched',`${JSON.stringify(patientsFeched)}`); 
                
                void fetchPatienData();    
            }

        }else{
            const newPatientsFeched = [id]; 
            window.localStorage.setItem('patientsFeched',`${JSON.stringify(newPatientsFeched)}`);
            void fetchPatienData();
        }

    },[]);

    return patient;
};

export default usePatientSingleData;
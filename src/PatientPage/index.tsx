import React from "react";
import { useParams } from "react-router";
import { Header, Icon } from "semantic-ui-react";
import usePatientSingleData from "../hooks/usePatientSingleData";

const PatientPage = () => {
    const {id} = useParams<{id:string}>();
    const patient = usePatientSingleData({id});
    const gender = patient.gender === 'male' ? 'man' : patient.gender === 'female' ? 'woman' : "other gender";
    return (
        <div>
            <Header as="h3">{patient.name} <Icon name = {gender}></Icon></Header>
            <Header as="h5">ssn: {patient?.ssn}</Header>
            <Header as="h5">occupation: {patient.occupation}</Header>
        </div>
    );
};

export default PatientPage;
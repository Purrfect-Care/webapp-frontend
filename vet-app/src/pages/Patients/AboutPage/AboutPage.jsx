import React, { useState, useEffect } from "react";
import { patientRequest } from "../../../api/patientsRequests.js";
import { useNavigate, useParams } from "react-router-dom";
import "./AboutPage.css";

const AboutPage = () => {
  const [patientData, setPatientData] = useState(null);
  const navigate = useNavigate();
  const { id: patientId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await patientRequest(patientId);
        setPatientData(data);
      } catch (error) {
        console.error('Error fetching patient data:', error.message);
      }
    };

    fetchData();
  }, [patientId]);

  if (!patientData) {
    return <p className="aboutPage">Loading...</p>; 
  }

  return (
      <>
        <div className="aboutPage">
          {patientData ? (
            <div className="patient-info">
              <div>
                <span className="patient-label">Płeć: </span>
                <span className="patient-value">{patientData.patient_gender}</span>
              </div>
              <div>
                <span className="patient-label">Data urodzenia: </span>
                <span className="patient-value">{patientData.patient_date_of_birth}</span>
              </div>
              <div>
                <span className="patient-label">Gatunek: </span>
                <span className="patient-value">{patientData.patients_species.species_name}</span>
              </div>
              <div>
                <span className="patient-label">Rasa: </span>
                <span className="patient-value">{patientData.patients_breed.breed_name}</span>
              </div>
            </div>
            ) : (
            <p className="aboutPage">Ładowanie...</p>
          )}
        </div>
    </>
    );
    };
export default AboutPage;

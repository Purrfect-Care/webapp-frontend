const API_ENDPOINT = "http://localhost:8000/api/prescriptions";

export async function prescriptionsRequest(id) {
  const response = await fetch(API_ENDPOINT);

  if (response.ok) {
    const data = await response.json();
    const filteredPrescriptions = data.filter(
      (prescription) => prescription.prescriptions_patient_id === id
    );
    return filteredPrescriptions;
  }

  throw new Error(
    `Response ${response.status}: ${
      response.statusText
    } - ${await response.text()}`
  );
}

export const deletePrescriptionRequest = async (prescriptionId) => {
  const url = `${API_ENDPOINT}/${prescriptionId}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting prescription: ${response.statusText}`);
    }

    
  } catch (error) {
    throw new Error(`Error deleting prescription: ${error.message}`);
  }
};

export const addPrescriptionRequest = async (prescriptionData) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prescriptionData),
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to add prescription");
    }
  } catch (error) {
    
    throw new Error(`Error: ${error.message}`);
  }
};

export const addPrescribedMedicationRequest = async (prescriptionmedData) => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/prescribedmed/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prescriptionmedData),
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to add prescription's medication");
    }
  } catch (error) {
    
    throw new Error(`Error: ${error.message}`);
  }
};

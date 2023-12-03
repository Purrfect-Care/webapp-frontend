const API_ENDPOINT = "http://localhost:8000/api/prescriptions";

export async function prescriptionsByPatientIdRequest(patient_id) {
  const response = await fetch(`http://localhost:8000/api/prescriptions/?patient_id=${patient_id}`);

  if (response.ok) {
    const data = await response.json();
    return data;
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

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

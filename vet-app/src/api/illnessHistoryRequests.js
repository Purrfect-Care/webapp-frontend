export async function illnessHistoryByPatientIdRequest(patientId) {
  const endpoint = `http://localhost:8000/api/illness_history/?patient_id=${patientId}`;

  try {
    const response = await fetch(endpoint);

    if (response.ok) {
      const data = await response.json();
      return data;
    }

    throw new Error(`Response ${response.status}: ${response.statusText}`);
  } catch (error) {
    throw new Error(`Error in illnessHistoryRequest: ${error.message}`);
  }
}

export async function deleteIllnessHistoryRequest(id) {
  const endpoint = `http://localhost:8000/api/illness_history/${id}/`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error(`Response ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting illness history item:", error);
    throw error;
  }
}

export async function createIllnessHistoryRequest(data) {
  const endpoint = `http://localhost:8000/api/illness_history/`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const updatedData = await response.json();
      return updatedData;
    } else {
      throw new Error(`Response ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error updating illness history item:", error);
    throw error;
  }
}

export async function illnessesRequest() {
  const endpoint = "http://127.0.0.1:8000/api/illnesses/";

  const response = await fetch(endpoint, {
    method: "GET",
  });

  if (response.ok) {
    const json = await response.json();
    return json;
  }

  throw new Error(
    "Response ${response.status}: ${response.statusText} - ${await response.text()}"
  );
}

const BASE_URL = "http://localhost:8000/api";

export const addIllnessRequest = async (illness) => {
  try {
    const response = await fetch(`${BASE_URL}/illnesses/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(illness),
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to add illness");
    }
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

export const updateIllnessRequest = async (illnessId, illness) => {
  try {
    const response = await fetch(`${BASE_URL}/illnesses/${illnessId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(illness),
    });

    if (response.ok) {
    } else {
      throw new Error("Failed to update illness");
    }
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

export const deleteIllnessRequest = async (illnessId) => {
  try {
    const response = await fetch(`${BASE_URL}/illnesses/${illnessId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const jsonData = await response.text();
      return jsonData ? JSON.parse(jsonData) : null;
    } else {
      throw new Error("Failed to delete illness");
    }
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

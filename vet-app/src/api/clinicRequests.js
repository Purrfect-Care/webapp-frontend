const BASE_URL = "http://localhost:8000/api";

export const addClinic = async (clinicData) => {
  try {
    const response = await fetch(`${BASE_URL}/clinics/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clinicData),
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to add clinic");
    }
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

export async function getClinicsRequest() {
  const response = await fetch(`${BASE_URL}/clinics/`, {
    method: "GET",
  });

  if (response.ok) {
    const json = await response.json();
    return json;
  }

  throw new Error(
    `Response ${response.status}: ${
      response.statusText
    } - ${await response.text()}`
  );
}

export async function getClinicByIdRequest(id) {
  const response = await fetch(`${BASE_URL}/clinics/${id}`, {
    method: "GET",
  });
  if (response.ok) {
    const json = await response.json();
    return json;
  }

  throw new Error(
    `Response ${response.status}: ${
      response.statusText
    } - ${await response.text()}`
  );
}

export async function deleteClinicById(clinicId) {
  const endpoint = `http://localhost:8000/api/clinics/${clinicId}/`;

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
    console.error("Error deleting clinic:", error);
    throw error;
  }
}

export async function updateClinicRequest(clinicId, formData) {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/clinics/${clinicId}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update clinic data: ${await response.text()}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error updating clinic data:", error.message);
    throw error;
  }
}

export async function visitsByPatientIdRequest(patientId) {
  const endpoint = `http://localhost:8000/api/visit_list/?patient_id=${patientId}`;

  try {
    const response = await fetch(endpoint);

    if (response.ok) {
      const data = await response.json();
      return data;
    }

    throw new Error(`Response ${response.status}: ${response.statusText}`);
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

export async function visitRequest(visitId) {
  const endpoint = `http://localhost:8000/api/visits/${visitId}/`;

  try {
    const response = await fetch(endpoint);

    if (response.ok) {
      const data = await response.json();
      return data;
    }

    throw new Error(`Response ${response.status}: ${response.statusText}`);
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

export async function updateVisitRequest(id, data) {
  const endpoint = `http://localhost:8000/api/visits/${id}/`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const updatedData = await response.json();
      return updatedData;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error("Error updating visit:", error);
    throw error;
  }
}

export async function deleteVisitRequest(id) {
  const endpoint = `http://localhost:8000/api/visits/${id}/`;

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
    console.error("Error deleting visit:", error);
    throw error;
  }
}

export async function createVisitRequest(data) {
  const endpoint = `http://localhost:8000/api/visits/`;

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
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    console.error("Error updating visit:", error);
    throw error;
  }
}

export async function visitsByEmployeeIdRequest(employeeId) {
  const url = `http://localhost:8000/api/visit_list/?employee_id=${employeeId}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching visits: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error in visitsRequest: ${error.message}`);
  }
}

export async function visitsByEmployeeClinicIdRequest(clinicId) {
  const url = `http://localhost:8000/api/visit_list/?clinic_id=${clinicId}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching visits: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error in visitsRequest: ${error.message}`);
  }
}

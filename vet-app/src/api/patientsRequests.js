export async function patientRequest(patientId) {
  const endpoint = `http://localhost:8000/api/patients/${patientId}/`;

  const response = await fetch(endpoint);
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
  }

  throw new Error(
    `Response ${response.status}: ${
      response.statusText
    } - ${await response.text()}`
  );
}

export async function patientsSideBarRequest() {
  const endpoint = `http://localhost:8000/api/patients_sidebar_list/`;

  const response = await fetch(endpoint, {
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

export async function allPatientsRequest(){
  const endpoint = "http://127.0.0.1:8000/api/patients/"

  const response = await fetch(endpoint, { 
      method: "GET"
  });

  if (response.ok) {
      const json = await response.json();
      return json;
  }

  throw new Error('Response ${response.status}: ${response.statusText} - ${await response.text()}');
}

export async function createPatientRequest(formData) {
  const endpoint = `http://127.0.0.1:8000/api/patients/`;
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,  // Pass the FormData directly as the body
    });
    if (response.ok) {
      const updatedData = await response.json();
      console.log(updatedData);
      return updatedData;
    } else {
      throw new Error(`Response ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error creating patient:', error);
    throw error;
  }
}

export async function deletePatientById(patientId) {
  const endpoint = `http://localhost:8000/api/patients/${patientId}/`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Patient deleted successfully");
      return true;
    } else {
      throw new Error(`Response ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting patient:", error);
    throw error;
  }
}

export async function allPatientsByClinicIdRequest(clinicId){
  const endpoint = `http://127.0.0.1:8000/api/patients/?clinic_id=${clinicId}`

  const response = await fetch(endpoint, { 
      method: "GET"
  });

  if (response.ok) {
      const json = await response.json();
      return json;
  }

  throw new Error('Response ${response.status}: ${response.statusText} - ${await response.text()}');
}


export async function updatePatientPhotoRequest(patientId, formData) {
  const endpoint = `http://localhost:8000/api/patients/${patientId}/`;
  try{
  const response = await fetch(endpoint, {
    method: 'PUT',
    body: formData,
  });
  if (response.ok) {
    const updatedData = await response.json();
    return updatedData;
  } else {
    throw new Error(`Response ${response.status}: ${response.statusText}`);
  }
} catch (error) {
  console.error('Error updating patient:', error);
  throw error;
}

}

export async function deleteOldPhotoRequest(photoFileName) {
  const endpoint = `http://localhost:8000/delete_old_photo/${photoFileName}/`;
  try {
    const response = await fetch(endpoint, {
      method: 'DELETE',
    });

    if (!response.ok) {
      console.error('Failed to delete old photo:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error deleting old photo:', error);
  }
}



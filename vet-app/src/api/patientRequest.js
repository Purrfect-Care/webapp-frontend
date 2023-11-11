export async function patientRequest(patientId) {
  const endpoint = `http://localhost:8000/api/patients_section/${patientId}`;

  const response = await fetch(endpoint);
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

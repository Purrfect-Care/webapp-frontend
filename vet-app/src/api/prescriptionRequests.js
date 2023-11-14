export async function prescriptionsRequest( id ) {
  const endpoint = `http://localhost:8000/api/prescriptions`;

  const response = await fetch(endpoint);

  if (response.ok) {
    const data = await response.json();
    const filteredPrescriptions = data.filter(prescription => prescription.prescriptions_patient_id === id)
    return filteredPrescriptions;
  }

  throw new Error(
    `Response ${response.status}: ${
      response.statusText
    } - ${await response.text()}`
  );
}

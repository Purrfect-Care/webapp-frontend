export async function patientRequest(patientId) {
  const endpoint = `http://localhost:8000/api/patients/${patientId}`;

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

export async function patientsSideBarRequest() {
  const endpoint = "http://localhost:8000/api/patients_sidebar_list/";

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
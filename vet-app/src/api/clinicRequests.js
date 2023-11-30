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
    console.log(clinicData);

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
    console.log(json);
    return json;
  }

  throw new Error(
    `Response ${response.status}: ${
      response.statusText
    } - ${await response.text()}`
  );
}
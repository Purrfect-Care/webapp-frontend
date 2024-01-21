const BASE_URL = "http://localhost:8000/api";

export const addMedicationsRequest = async (med_name) => {
  try {
    const response = await fetch(`${BASE_URL}/medications/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(med_name),
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to add medication");
    }
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

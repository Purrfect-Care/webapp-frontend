export async function allSpeciesRequest() {
  const endpoint = "http://127.0.0.1:8000/api/species/";

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

export const addSpeciesRequest = async (species) => {
  try {
    const response = await fetch(`${BASE_URL}/species/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(species),
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to add species");
    }
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

export const deleteSpecieRequest = async (specieId) => {
  try {
    const response = await fetch(`${BASE_URL}/species/${specieId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const jsonData = await response.text();
      return jsonData ? JSON.parse(jsonData) : null;
    } else {
      throw new Error("Failed to delete specie");
    }
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

export const updateSpecieRequest = async (specieId, specie) => {
  try {
    const response = await fetch(`${BASE_URL}/species/${specieId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(specie),
    });

    if (response.ok) {
    } else {
      throw new Error("Failed to update specie");
    }
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

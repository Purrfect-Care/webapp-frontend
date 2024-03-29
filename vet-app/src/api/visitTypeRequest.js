export async function visitTypeRequest() {
  const endpoint = "http://localhost:8000/api/visit_types/";

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

export async function typeIdRequest(id) {
  const endpoint = `http://localhost:8000/api/visit_types/${id}`;

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

export const addVisitTypeRequest = async (visit_type_name) => {
  try {
    const response = await fetch("http://localhost:8000/api/visit_types/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(visit_type_name),
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to add visit type");
    }
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

const BASE_URL = "http://localhost:8000/api";

export const deleteVisitTypeRequest = async (visit_typeId) => {
  try {
    const response = await fetch(`${BASE_URL}/visit_types/${visit_typeId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const jsonData = await response.text();
      return jsonData ? JSON.parse(jsonData) : null;
    } else {
      throw new Error("Failed to delete visit_type");
    }
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

export const updateVisitTypeRequest = async (visit_typeId, visit_type) => {
  try {
    const response = await fetch(`${BASE_URL}/visit_types/${visit_typeId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(visit_type),
    });

    if (response.ok) {
    } else {
      throw new Error("Failed to update visit_type");
    }
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

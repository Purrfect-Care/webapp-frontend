export async function visitSubtypeRequest(){
    const endpoint = "http://localhost:8000/api/visit_subtypes/"

    const response = await fetch(endpoint, { 
        method: "GET"
    });

    if (response.ok) {
        const json = await response.json();
        return json;
    }

    throw new Error('Response ${response.status}: ${response.statusText} - ${await response.text()}');
}

export async function subtypeIdRequest(id) {
    const endpoint = `http://localhost:8000/api/visit_subtypes/${id}`;
  
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

  export const addVisitSubtypeRequest = async (visit_subtype_name) => {
    try {
      const response = await fetch("http://localhost:8000/api/visit_subtypes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(visit_subtype_name),
      });
      console.log(visit_subtype_name);
  
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to add visit subtype");
      }
    } catch (error) {
      
      throw new Error(`Error: ${error.message}`);
    }
  };

  const BASE_URL = "http://localhost:8000/api";

  export const deleteVisitSubtypeRequest = async (visit_subtypeId) => {
    try {
      const response = await fetch(`${BASE_URL}/visit_subtypes/${visit_subtypeId}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        // Check if there is JSON data in the response before parsing
        const jsonData = await response.text();
        return jsonData ? JSON.parse(jsonData) : null;
      } else {
        throw new Error("Failed to delete visit_subtype");
      }
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  };
  
  export const updateVisitSubtypeRequest = async (visit_subtypeId, visit_subtype) => {
    try {
      const response = await fetch(`${BASE_URL}/visit_subtypes/${visit_subtypeId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(visit_subtype),
      });
      console.log(visit_subtype);
  
      if (response.ok) {
        console.log("VisitSubtype deleted successfully");
      } else {
        throw new Error("Failed to update visit_subtype");
      }
    } catch (error) {
      
      throw new Error(`Error: ${error.message}`);
    }
  };
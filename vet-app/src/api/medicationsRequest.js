export async function allMedicationsRequest(){
    const endpoint = "http://127.0.0.1:8000/api/medications/"
  
    const response = await fetch(endpoint, { 
        method: "GET"
    });
  
    if (response.ok) {
        const json = await response.json();
        return json;
    }
  
    throw new Error('Response ${response.status}: ${response.statusText} - ${await response.text()}');
  }

  const BASE_URL = "http://localhost:8000/api";

  export const deleteMedicationRequest = async (medicationId) => {
    try {
      const response = await fetch(`${BASE_URL}/medications/${medicationId}/`, {
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
        throw new Error("Failed to delete medication");
      }
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  };
  
  export const updateMedicationRequest = async (medicationId, medication) => {
    try {
      const response = await fetch(`${BASE_URL}/medications/${medicationId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medication),
      });
      console.log(medication);
  
      if (response.ok) {
        console.log("Medication deleted successfully");
      } else {
        throw new Error("Failed to update medication");
      }
    } catch (error) {
      
      throw new Error(`Error: ${error.message}`);
    }
  };
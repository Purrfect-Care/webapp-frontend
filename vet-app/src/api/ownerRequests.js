export async function ownerByIdRequest(ownerId) {
    const endpoint = `http://localhost:8000/api/owners/${ownerId}`;
  
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

export async function allOwnersRequest() {
    const endpoint = "http://127.0.0.1:8000/api/owners/";
  
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

  export async function createOwnerRequest(formData) {
    const endpoint = `http://127.0.0.1:8000/api/owners/`;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,  // Pass the FormData directly as the body
      });
      if (response.ok) {
        const updatedData = await response.json();
        return updatedData;
      } else {
        throw new Error(`Response ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error creating owner:', error);
      throw error;
    }
  }
  
  export async function deleteOwnerById(ownerId) {
    const endpoint = `http://localhost:8000/api/owners/${ownerId}/`;
  
    try {
      const response = await fetch(endpoint, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
  
      if (response.ok) {
        console.log("Owner deleted successfully");
        return true;
      } else {
        throw new Error(`Response ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error deleting owner:", error);
      throw error;
    }
  }


  export async function editOwnerRequest(ownerId, formData) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/owners/${ownerId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update owner data: ${await response.text()}`);
      }
  
      console.log('Owner data updated successfully');
      return response.json(); // Assuming the response contains updated owner data
    } catch (error) {
      console.error('Error updating owner data:', error.message);
      throw error; // Re-throw the error for the caller to handle
    }
  }
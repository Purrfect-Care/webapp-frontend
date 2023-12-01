export async function createIllnessRequest(data) {
    const endpoint = `http://localhost:8000/api/illnesses/`;
  
    try {
      const response = await fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const updatedData = await response.json();
        return updatedData;
      } else {
        throw new Error(`Response ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating illness:', error);
      throw error;
    }
  }

  export async function illnessesRequest(){
    const endpoint = "http://127.0.0.1:8000/api/illnesses/"
  
    const response = await fetch(endpoint, { 
        method: "GET"
    });
  
    if (response.ok) {
        const json = await response.json();
        return json;
    }
  
    throw new Error('Response ${response.status}: ${response.statusText} - ${await response.text()}');
  }
export async function illnessHistoryRequest(patientId) {
    const endpoint = `http://localhost:8000/api/illness_history/`;
  
    const response = await fetch(endpoint);
    if (response.ok) {
        const data = await response.json();
        const filteredIllnessHistory = data.filter(illnessHistory => illnessHistory.illness_history_patient.id === patientId);
        return filteredIllnessHistory;
    }
  
    throw new Error(
        `Response ${response.status}: ${
            response.statusText
        } - ${await response.text()}`
    );
}
export async function deleteIllnessHistoryRequest(id) {
    const endpoint = `http://localhost:8000/api/illness_history/${id}/`;
  
    try {
      const response = await fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('Illness history item deleted successfully');
        return true;
      } else {
        throw new Error(`Response ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting illness history item:', error);
      throw error;
    }
  }


export async function createIllnessHistoryRequest(data) {
    const endpoint = `http://localhost:8000/api/illness_history/`;
  
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
      console.error('Error updating illness history item:', error);
      throw error;
    }
  }

  // export async function illnessesRequest(){
  //   const endpoint = "http://127.0.0.1:8000/api/illnesses/"
  
  //   const response = await fetch(endpoint, { 
  //       method: "GET"
  //   });
  
  //   if (response.ok) {
  //       const json = await response.json();
  //       return json;
  //   }
  
  //   throw new Error('Response ${response.status}: ${response.statusText} - ${await response.text()}');
  // }
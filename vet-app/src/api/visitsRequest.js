export async function visitsRequest(patientId) {
    const endpoint = `http://localhost:8000/api/visits`;
  
    const response = await fetch(endpoint);
    if (response.ok) {
        const data = await response.json();
        // Filter visits based on the patientId
        const filteredVisits = data.filter(visit => visit.visits_patient.id === patientId);
        return filteredVisits;
    }
  
    throw new Error(
        `Response ${response.status}: ${
            response.statusText
        } - ${await response.text()}`
    );
}
export async function updateVisitRequest(id, data) {
    const endpoint = `http://localhost:8000/api/visits/${id}/`;
  
    try {
      const response = await fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const updatedData = await response.json();
        return updatedData;
      } else {
        throw new Error(`Response ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating visit:', error);
      throw error;
    }
  }
  
  export async function deleteVisitRequest(id) {
    const endpoint = `http://localhost:8000/api/visits/${id}/`;
  
    try {
      const response = await fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      });
  
      if (response.ok) {
        console.log('Visit deleted successfully');
        return true;
      } else {
        throw new Error(`Response ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting visit:', error);
      throw error;
    }
  }


export async function createVisitRequest(data) {
    const endpoint = `http://localhost:8000/api/visits/`;
  
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
      console.error('Error updating visit:', error);
      throw error;
    }
  }
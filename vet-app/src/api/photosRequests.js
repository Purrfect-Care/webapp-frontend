export async function createPhotoRequest(formData) {
    const endpoint = `http://127.0.0.1:8000/api/photos/`;
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const updatedData = await response.json();
        console.log(updatedData);
        return updatedData;
      } else {
        throw new Error(`Response ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error creating patient:', error);
      throw error;
    }
  }

  export async function getPhotosByVisitId(visitId){
    const endpoint = `http://127.0.0.1:8000/api/photos/?visit_id=${visitId}`;
  
    const response = await fetch(endpoint, { 
        method: "GET"
    });
  
    if (response.ok) {
        const json = await response.json();
        return json;
    }
  
    throw new Error('Response ${response.status}: ${response.statusText} - ${await response.text()}');
  }
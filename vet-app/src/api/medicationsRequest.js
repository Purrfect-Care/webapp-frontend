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
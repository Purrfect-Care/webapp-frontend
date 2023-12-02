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
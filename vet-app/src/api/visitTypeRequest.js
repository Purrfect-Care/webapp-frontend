export async function visitTypeRequest(){
    const endpoint = "http://localhost:8000/api/visit_types/"

    const response = await fetch(endpoint, { 
        method: "GET"
    });

    if (response.ok) {
        const json = await response.json();
        return json;
    }

    throw new Error('Response ${response.status}: ${response.statusText} - ${await response.text()}');
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
  
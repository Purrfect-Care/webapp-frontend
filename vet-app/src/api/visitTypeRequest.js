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
  
export const addVisitTypeRequest = async (visit_type_name) => {
  try {
    const response = await fetch("http://localhost:8000/api/visit_types/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(visit_type_name),
    });
    console.log(visit_type_name);

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to add visit type");
    }
  } catch (error) {
    
    throw new Error(`Error: ${error.message}`);
  }
};
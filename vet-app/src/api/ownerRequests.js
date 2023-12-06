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
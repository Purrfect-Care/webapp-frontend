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
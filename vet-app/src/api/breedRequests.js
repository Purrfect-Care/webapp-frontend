export async function allBreedsRequest() {
    const endpoint = "http://127.0.0.1:8000/api/breeds/";
  
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
  
  export const addBreedRequest = async (breed) => {
    try {
      const response = await fetch("http://localhost:8000/api/breeds/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(breed),
      });
      console.log(breed);
  
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to add breed");
      }
    } catch (error) {
      
      throw new Error(`Error: ${error.message}`);
    }
  };
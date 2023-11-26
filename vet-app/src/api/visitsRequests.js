export async function visitTypesRequest() {
  const response = await fetch("http://localhost:8000/api/visit_types/");
  if (!response.ok) {
    throw new Error(`Error fetching visits: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}


export async function filteredVisitSubtypesRequest(typeId) {
  const response = await fetch(`http://localhost:8000/api/filtered_visit_subtypes/${typeId}`);
  if (!response.ok) {
    throw new Error(`Error fetching visits: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}


export async function visitsRequest() {
    const response = await fetch("http://localhost:8000/api/visits/");
    if (!response.ok) {
      throw new Error(`Error fetching visits: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  }


export async function addVisitRequest(calendarEvent) {
    const endpoint = "http://localhost:8000/api/visits/";
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include any authentication headers if required
        },
        body: JSON.stringify(calendarEvent),
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      }
  
      throw new Error(`Response ${response.status}: ${response.statusText} - ${await response.text()}`);
    } catch (error) {
      console.error("Error adding event:", error);
      throw error;
    }
  }
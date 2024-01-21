export async function visitTypesRequest() {
  const response = await fetch("http://localhost:8000/api/visit_types/");
  if (!response.ok) {
    throw new Error(`Error fetching visits: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

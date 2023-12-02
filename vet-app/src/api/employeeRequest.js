export async function employeeRequest(id) {
  const endpoint = `http://127.0.0.1:8000/api/employees/${id}/`;

  const response = await fetch(endpoint, {
    method: "GET",
  });

  if (response.ok) {
    const json = await response.json();
    console.log("Employee data:", json); // Add this line for debugging
    return json;
  }

  throw new Error(
    `Response ${response.status}: ${response.statusText} - ${await response.text()}`
  );
}

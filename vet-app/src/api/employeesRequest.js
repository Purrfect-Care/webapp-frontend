export async function employeesRequest() {
    const endpoint = `http://localhost:8000/api/employees/`;
  
    const response = await fetch(endpoint);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
}
  
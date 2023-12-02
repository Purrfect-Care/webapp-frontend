const BASE_URL = "http://localhost:8000/api";

export const addEmployeeRequest = async (employeeData) => {
  try {
    const response = await fetch(`${BASE_URL}/employees/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    });
    console.log(employeeData);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to add clinic");
    }
  } catch (error) {
    
    throw new Error(`Error: ${error.message}`);
  }
};
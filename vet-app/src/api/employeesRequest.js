export async function employeesRequest() {
    const endpoint = `http://localhost:8000/api/employees/`;
  
    const response = await fetch(endpoint);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
}

export async function deleteEmployeeById(employeeId) {
  const endpoint = `http://localhost:8000/api/employees/${employeeId}`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Employee deleted successfully");
      return true;
    } else {
      throw new Error(`Response ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
}
  

export async function editEmployeeRequest(employeeId, formData) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/employees/${employeeId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update employee data: ${await response.text()}`);
    }

    console.log('Employee data updated successfully');
    return response.json(); // Assuming the response contains updated owner data
  } catch (error) {
    console.error('Error updating employee data:', error.message);
    throw error; // Re-throw the error for the caller to handle
  }
}
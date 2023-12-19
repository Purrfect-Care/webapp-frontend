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
      throw new Error("Failed to add an employee");
    }
  } catch (error) {
    
    throw new Error(`Error: ${error.message}`);
  }
};

export async function employeeRequest(id) {
  const endpoint = `http://127.0.0.1:8000/api/employees/${id}/`;

  const response = await fetch(endpoint, {
    method: "GET",
  });

  if (response.ok) {
    const json = await response.json();
    console.log("Employee data:", json);
    return json;
  }

  throw new Error(
    `Response ${response.status}: ${response.statusText} - ${await response.text()}`
  );
}

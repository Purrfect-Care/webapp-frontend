import React, { useEffect, useState } from "react";
import DynamicTable from "../DynamicTable";
import {
  employeesByClinic,
  deleteEmployeeById,
} from "../../../api/employeesRequest";
import PatientForm from "../../AddPage/PatientForm/PatientForm";
import SignIn from "../../AddPage/SignIn/SignIn";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { jwtDecode } from "jwt-decode";

const ShowEmployeeComponent = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [openTable, setOpenTable] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const employeeData = jwtDecode(authToken);
        const data = await employeesByClinic(employeeData?.employees_clinic_id);
        setEmployeeData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const openSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleDelete = async (employeeId) => {
    try {
      await deleteEmployeeById(employeeId);

      const authToken = localStorage.getItem("authToken");
      const employeeData = jwtDecode(authToken);
      const data = await employeesByClinic(employeeData?.employees_clinic_id);
      setEmployeeData(data);
      openSnackbar("success", "Pracownik usunięty pomyślnie!");
    } catch (error) {
      console.error("Error deleting employee:", error);
      openSnackbar("error", "Błąd podczas usuwania pracownika.");
    }
  };

  const editEmployee = (employee) => {
    setSelectedEmployee(employee);
    setOpenEditForm(true);
    setOpenTable(false);
  };

  const closeForm = async () => {
    setOpenEditForm(false);
    setSelectedEmployee(null);
    const authToken = localStorage.getItem("authToken");
    const employeeData = jwtDecode(authToken);
    const data = await employeesByClinic(employeeData?.employees_clinic_id);
    setEmployeeData(data);
    setOpenTable(true);
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "employee_first_name", label: "Imię pracownika" },
    { key: "employee_last_name", label: "Nazwisko pracownika" },
    { key: "employee_role", label: "Rola pracownika" },
  ];

  return (
    <>
      <div>
        {openTable && (
          <DynamicTable
            columns={columns}
            data={employeeData}
            onDelete={handleDelete}
            onEdit={editEmployee}
            title={"Pracownicy"}
          />
        )}
        {openEditForm && (
          <SignIn
            initialValues={selectedEmployee}
            onClose={closeForm}
            snackbar={openSnackbar}
          />
        )}
      </div>
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default ShowEmployeeComponent;

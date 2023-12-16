import React, { useEffect, useState } from 'react';
import DynamicTable from '../DynamicTable';
import { employeesRequest, deleteEmployeeById } from '../../../api/employeesRequest';
import PatientForm from '../../AddPage/PatientForm/PatientForm';
import SignIn from '../../AddPage/SignIn/SignIn';

const ShowEmployeeComponent = () => {
    const [employeeData, setEmployeeData] = useState([]);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState([]);

    useEffect(() => {
        // Fetch patient data and set it to the state
        // Replace this with your actual data fetching logic
        const fetchData = async () => {
            try {
                const data = await employeesRequest();
                setEmployeeData(data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
            // Example data fetching
        };

        fetchData();
    }, []);

    const handleDelete = async (employeeId) => {
        try {
            // Call the delete function from the provided onDelete prop
            await deleteEmployeeById(employeeId);
            console.log('Employee deleted successfully');
            const data = await employeesRequest();
            setEmployeeData(data);
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const editEmployee = (employee) => {
        setSelectedEmployee(employee);
        setOpenEditForm(true);
      };


      const closeForm = () => {
        setOpenEditForm(false);
        setSelectedEmployee(null);
      };




    const columns = [{ key: 'id', label: 'ID' },
    { key: 'employee_first_name', label: 'Imię pracownika' },
    { key: 'employee_last_name', label: 'Nazwisko pracownika' },];


    return (
        <div>
            <h2>Pracownicy</h2>
            <DynamicTable columns={columns} data={employeeData} onDelete={handleDelete} onEdit={editEmployee} />
            {openEditForm && (<SignIn initialValues={selectedEmployee} onClose={closeForm}/>)}

        </div>
    );
};

export default ShowEmployeeComponent;

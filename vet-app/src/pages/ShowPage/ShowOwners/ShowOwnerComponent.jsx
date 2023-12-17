import React, { useEffect, useState } from 'react';
import DynamicTable from '../DynamicTable';
import { allOwnersRequest, deleteOwnerById, editOwnerRequest } from '../../../api/ownerRequests';
import AddOwner from '../../AddPage/AddOwner/AddOwner';

const ShowOwnerComponent = () => {
    const [ownerData, setOwnerData] = useState([]);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [selectedOwner, setSelectedOwner] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await allOwnersRequest();
                setOwnerData(data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
            // Example data fetching
        };

        fetchData();
    }, []);

    const handleDelete = async (ownerId) => {
        try {
            // Call the delete function from the provided onDelete prop
            await deleteOwnerById(ownerId);
            console.log('Owner deleted successfully');
            const data = await allOwnersRequest();
            setOwnerData(data);
        } catch (error) {
            console.error('Error deleting owner:', error);
        }
    };

    const editOwner = (owner) => {
        setSelectedOwner(owner);
        setOpenEditForm(true);
      };


      const closeForm = async () => {
        setOpenEditForm(false);
        setSelectedOwner(null);
        const data = await allOwnersRequest();
        setOwnerData(data);
      };




    const columns = [{ key: 'id', label: 'ID' },
    { key: 'owner_first_name', label: 'Imię właściciela' },
    { key: 'owner_last_name', label: 'Nazwisko właściciela' },];


    return (
        <div>
            <DynamicTable columns={columns} data={ownerData} onDelete={handleDelete} onEdit={editOwner} title={"Właściciele"} />
            {openEditForm && (<AddOwner initialValues={selectedOwner} onClose={closeForm} />)}

        </div>
    );
};

export default ShowOwnerComponent;

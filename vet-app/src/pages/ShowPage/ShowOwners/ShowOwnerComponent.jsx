import React, { useEffect, useState } from 'react';
import DynamicTable from '../DynamicTable';
import { allOwnersRequest, deleteOwnerById, editOwnerRequest } from '../../../api/ownerRequests';
import EditOwnerForm from '../../EditOwnerForm/EditOwnerForm';

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


      const closeForm = () => {
        setOpenEditForm(false);
        setSelectedOwner(null);
      };

      const submitEditOwnerForm = async (ownerId, ownerData) => {
        try {
          console.log("Owner Data:", ownerData);
          const ownerId = ownerData.id;
          await editOwnerRequest(ownerId, ownerData);
          const updatedData = await allOwnersRequest(ownerId);
          setOwnerData(updatedData);
        } catch (error) {
          console.error("Error submitting form:", error);
        }
        closeForm();
      };




    const columns = [{ key: 'id', label: 'ID' },
    { key: 'owner_first_name', label: 'Imię właściciela' },
    { key: 'owner_last_name', label: 'Nazwisko właściciela' },];


    return (
        <div>
            <h2>Właściciele</h2>
            <DynamicTable columns={columns} data={ownerData} onDelete={handleDelete} onEdit={editOwner} />
            {openEditForm && (<EditOwnerForm isOpen={openEditForm} ownerId={ownerData?.id}  existingData={selectedOwner} onClose={closeForm} onSubmit={submitEditOwnerForm}/>)}

        </div>
    );
};

export default ShowOwnerComponent;

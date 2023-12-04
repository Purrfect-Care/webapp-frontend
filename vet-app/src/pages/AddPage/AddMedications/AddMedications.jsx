import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { addMedicationsRequest } from "../../../api/medicationRequests";

const AddMedications = () => {
  const [medication, setMedication] = useState({ medication_name: "" });

  const handleAddMedication = async (e) => {
    e.preventDefault();

    try {
      const response = await addMedicationsRequest(medication);

      console.log("Medication added successfully", response);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="mainPart">
        <div className="flex items-start justify-center h-full">
          <div className="flex flex-col items-center mt-20">
            <h3 className="text-3xl font-semibold mb-10 text-emerald-800">
              Formularz dodawania nowego leku
            </h3>
            <input
              className="rounded h-12 w-96 border-none mb-4"
              type="text"
              placeholder="Nazwa leku"
              name="medication_name"
              value={medication.medication_name}
              onChange={(e) =>
                setMedication({ ...medication, medication_name: e.target.value })
              }
            />
            <button
              type="submit"
              onClick={handleAddMedication}
              className="bg-emerald-800 hover:bg-emerald-600 px-10 py-2 rounded text-white hover:shadow-md"
            >
              Dodaj
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMedications;

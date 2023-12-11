import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { addIllnessRequest } from "../../api/illnessHistoryRequests";

const AddIllness = () => {
  const [illness, setIllness] = useState({ illness_name: "" });

  const handleAddIllness = async (e) => {
    e.preventDefault();

    try {
      const response = await addIllnessRequest(illness);

      console.log("Illness added successfully", response);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      //confirmation popup
      setIllness({ illness_name: "" });
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="mainPart">
        <div className="flex items-start justify-center h-full">
          <div className="flex flex-col items-center mt-20">
            <h3 className="text-3xl font-semibold mb-10 text-emerald-600">
              Formularz dodawania nowej choroby
            </h3>
            <input
              className="rounded h-12 w-96 border-none mb-4"
              type="text"
              placeholder="Nazwa choroby"
              name="illness_name"
              value={illness.illness_name}
              onChange={(e) =>
                setIllness({
                  ...illness,
                  illness_name: e.target.value,
                })
              }
            />
            <button
              type="submit"
              onClick={handleAddIllness}
              className="bg-emerald-600 hover:bg-emerald-800 px-10 py-2 rounded text-white hover:shadow-md"
            >
              Dodaj
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddIllness;

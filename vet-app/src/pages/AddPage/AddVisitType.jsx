import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { addVisitTypeRequest } from "../../api/visitTypeRequest";

const AddVisitType = () => {
  const [visitType, setVisitType] = useState({ visit_type_name: "" });

  const handleAddVisitType = async (e) => {
    e.preventDefault();

    try {
      const response = await addVisitTypeRequest(visitType);

      console.log("Visit type added successfully", response);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      //confiramtion popup
      setVisitType({visit_type_name: "" });
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="mainPart">
        <div className="flex items-start justify-center h-full">
          <div className="flex flex-col items-center mt-20">
            <h3 className="text-3xl font-semibold mb-10 text-emerald-600">
              Formularz dodawania nowego typu wizyty
            </h3>
            <input
              className="rounded h-12 w-96 border-none mb-4"
              type="text"
              placeholder="Nazwa typu wizyty"
              name="visit_type_name"
              value={visitType.visit_type_name}
              onChange={(e) =>
                setVisitType({ ...visitType, visit_type_name: e.target.value })
              }
            />
            <button
              type="submit"
              onClick={handleAddVisitType}
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

export default AddVisitType;

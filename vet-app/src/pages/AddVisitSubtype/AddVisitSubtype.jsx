import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { addVisitSubtypeRequest } from "../../api/visitSubtypeRequest";

const AddVisitSubtype = () => {
  const [visitSubtype, setVisitSubtype] = useState({ visit_subtype_name: "" });

  const handleAddVisitSubtype = async (e) => {
    e.preventDefault();

    try {
      const response = await addVisitSubtypeRequest(visitSubtype);

      console.log("Visit subtype added successfully", response);
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
            <h3 className="text-3xl font-semibold mb-10 text-emerald-600">
              Formularz dodawania nowego podtypu wizyty
            </h3>
            <input
              className="rounded h-12 w-96 border-none mb-4"
              type="text"
              placeholder="Nazwa typu wizyty"
              name="visit_type_name"
              value={visitSubtype.visit_subtype_name}
              onChange={(e) =>
                setVisitSubtype({ ...visitSubtype, visit_subtype_name: e.target.value })
              }
            />
            <button
              type="submit"
              onClick={handleAddVisitSubtype}
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

export default AddVisitSubtype;

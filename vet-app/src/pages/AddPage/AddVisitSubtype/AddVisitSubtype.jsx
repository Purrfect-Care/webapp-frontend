import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { addVisitSubtypeRequest } from "../../../api/visitSubtypeRequest";
import { visitTypeRequest } from "../../../api/visitTypeRequest";

const AddVisitSubtype = () => {
  const [formValues, setFormValues] = useState({
    visit_subtype_name: "",
    visit_subtypes_visit_type_id: "",
  });
  const [visitsTypeData, setVisitsTypeData] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAddVisitSubtype = async (e) => {
    e.preventDefault();

    try {
      const response = await addVisitSubtypeRequest(formValues);
      console.log("Visit subtype added successfully", response);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      //confirmation popup
      setFormValues({
        visit_subtype_name: "",
        visit_subtypes_visit_type_id: "",
      });
    }
  };

  useEffect(() => {
    console.log("Fetching type visit data...");
    const fetchData = async () => {
      try {
        const visitsTypeData = await visitTypeRequest();
        setVisitsTypeData(visitsTypeData);
      } catch (error) {
        console.error("Error fetching data: " + error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="mainPart">
        <div className="flex items-start justify-center h-full">
          <div className="flex flex-col items-center mt-20">
            <h3 className="text-3xl font-semibold mb-10 text-emerald-600">
              Formularz dodawania nowego podtypu wizyty
            </h3>
            <select
              name="visit_subtypes_visit_type_id"
              className="mb-6 rounded-md h-12"
              onChange={handleInputChange}
              value={formValues.visit_subtypes_visit_type_id}
            >
              <option value="">Wybierz typ wizyty</option>
              {visitsTypeData.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.visit_type_name}
                </option>
              ))}
            </select>
            <input
              className="rounded h-12 w-96 border-none mb-10"
              type="text"
              placeholder="Nazwa podtypu wizyty"
              name="visit_subtype_name"
              value={formValues.visit_subtype_name}
              onChange={handleInputChange}
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

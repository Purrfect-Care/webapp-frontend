import React, { useContext } from "react";
import * as AiIcons from "react-icons/ai";
import GlobalContext from "../../context/GlobalContext";

function CreateEventButton() {

  const {setShowEventModal} = useContext(GlobalContext);

  return (
    <button onClick={() => setShowEventModal(true)} className="border bg-white p-2 rounded-full flex shadow-2xl hover:shadow-md hover:font-bold transition duration-300 select-none" >
      <AiIcons.AiOutlinePlusSquare className="text-2xl ml-3 text-customGreen"/>
      <span className="pl-3 pr-6 text-customGreen">Utwórz</span>
    </button>
  );
}

export default CreateEventButton;

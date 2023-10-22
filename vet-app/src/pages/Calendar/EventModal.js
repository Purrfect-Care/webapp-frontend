import React, { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import * as Hi2Icons from "react-icons/hi2";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";

const labelsClasses = ["indigo", "grayCheck", "greenCheck", "blue", "red", "purple"];

function EventModal() {
  const { setShowEventModal, daySelected } = useContext(GlobalContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center ">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-customGreen px-4 py-2 flex justify-between items-center">
          <Hi2Icons.HiBars2 className="text-white" />
          <button onClick={() => setShowEventModal(false)}>
            <AiIcons.AiOutlineClose className="text-white" />
          </button>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Dodaj tytuł"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />

            <AiIcons.AiOutlineClockCircle className="text-gray-400 text-2xl" />
            <p>{daySelected.format("dddd, MMMM DD")}</p>

            <Hi2Icons.HiBars3BottomLeft className="text-gray-400 text-2xl" />
            <input
              type="text"
              name="description"
              placeholder="Dodaj opis"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />

            <BiIcons.BiBookmark className="text-gray-400 text-2xl" />
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <AiIcons.AiFillCheckCircle
                  key={i}
                  className={`text-${lblClass} w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                />
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EventModal;

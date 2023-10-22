import React, { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";

function EventModal() {
  const { setShowEventModal } = useContext(GlobalContext);
  const [title, setTitle] = useState("");

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="text-gray-400">icon</span>
          <button onClick={() => setShowEventModal(false)}>
            <span className="text-gray-400">icon close</span>
          </button>
        </header>
        <div className="p-3">
          <div className="grid gris-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Podaj nazwę wizyty"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="text-gray-400">icon schedule</span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EventModal;

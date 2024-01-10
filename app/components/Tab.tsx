import React from "react";
type TabPropes = {
  team: string;
  id: string;
  handleClick: () => void;
};

const Tab = ({ team, id, handleClick }: TabPropes) => {
  return (
    <button
      onClick={handleClick}
      className={`inline-block max-w-[150px] w-full shadow-lg rounded-lg px-4 py-3 ${
        team === id
          ? "bg-blue-400 text-white"
          : "bg-blue-100 hover:bg-blue-200 hover:text-blue-900"
      }`}
    >
      فريق {id}
    </button>
  );
};

export default Tab;

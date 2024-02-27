import React from "react";
type TabPropes = {
  selectedTeam: string;
  teamId: string;
  teamName: string;
  handleClick: () => void;
};

const Tab = ({ selectedTeam, teamId, teamName, handleClick }: TabPropes) => {
  return (
    <button
      onClick={handleClick}
      className={`inline-block max-w-[150px] w-full shadow-lg rounded-lg px-4 py-3 ${
        selectedTeam === teamId
          ? "bg-blue-400 text-white"
          : "bg-blue-100 hover:bg-blue-200 hover:text-blue-900"
      }`}
    >
      {teamName}
    </button>
  );
};

export default Tab;

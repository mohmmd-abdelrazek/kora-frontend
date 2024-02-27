import React from "react";
type PaginationPropes = {
  selectedTeam: string;
  teamName: string;
  teamId: string;
  handleClick: () => void;
};

const Tab = ({
  selectedTeam,
  teamId,
  teamName,
  handleClick,
}: PaginationPropes) => {
  return (
    <button
      onClick={handleClick}
      className={`rounded-full px-4 py-3 shadow-lg ${
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

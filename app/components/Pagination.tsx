import React from "react";
type PaginationPropes = {
  team: string;
  id: string;
  handleClick: () => void;
};

const Tab = ({ team, id, handleClick }: PaginationPropes) => {
  return (
    <button
      onClick={handleClick}
      className={`inline-block rounded-full px-4 py-3 shadow-lg ${
        team === id
          ? "bg-blue-400 text-white"
          : "bg-blue-100 hover:bg-blue-200 hover:text-blue-900"
      }`}
    >
      {id}
    </button>
  );
};

export default Tab;

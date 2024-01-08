"use client";

import MatchesTable from "../components/MatchesTable";
import HomeButton from "../components/HomeButton";

const Page = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-center h-[80%] bg-slate-100 px-4 py-12 max-sm:py-10 sm:px-[5%] md:px-[8%] lg:px-[15%]">
        <MatchesTable />
      </div>
      <div className="flex w-full items-center justify-center bg-white p-8">
        <HomeButton />
      </div>
    </div>
  );
};

export default Page;

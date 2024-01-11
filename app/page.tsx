"use client";
import { useState } from "react";
import Section from "./components/Section";
import Tab from "./components/Tab";
import Image from "next/image";
import ball from "@/public/icons/football.png";
import Pagination from "./components/Pagination";
import HomeButton from "./components/HomeButton";
import AdminButton from "./components/AdminButton";

const Home = () => {
  const [team, setTeam] = useState("1");
  return (
    <div className="flex w-full">
      <div className="flex flex-1 flex-col items-center gap-40 bg-slate-700 shadow-md max-sm:hidden">
        <h2 className="my-5 flex items-center gap-2 text-white">
          <Image src={ball} alt="ball" height={30}></Image>
          دورى الشباب
        </h2>
        <ul className="flex w-full flex-col items-center justify-center gap-6 rounded-xl px-4 py-3 text-sm font-medium text-text dark:text-gray-400">
          <Tab id="1" team={team} handleClick={() => setTeam("1")} />
          <Tab id="2" team={team} handleClick={() => setTeam("2")} />
          <Tab id="3" team={team} handleClick={() => setTeam("3")} />
        </ul>
      </div>
      <div className="flex h-full w-4/6 flex-col gap-6 max-sm:gap-2 bg-slate-100 max-sm:w-full">
        <div className="px-16 pt-5 text-right max-sm:hidden max-sm:py-10 sm:px-[5%] md:px-[8%] lg:pr-[30%]">
          <h2 className="mb-5 text-right text-slate-700">انضم إلى فريق الآن</h2>
          <p className="font-bold text-slate-500">
            اذا كانت جميع الفرق ممتلئة فلا يمكنك الاشتراك <br />
            يمكنك المحاولة في مرة قادمة
          </p>
        </div>
        <div className="px-4 max-sm:py-4 sm:px-[5%] md:px-[8%] lg:pr-[30%]">
          <Section sectionId="1" team={team} />
          <Section sectionId="2" team={team} />
          <Section sectionId="3" team={team} />
        </div>
        <div className="w-full flex justify-center items-center p-2 gap-6 sm:hidden">
          <Pagination id="1" team={team} handleClick={() => setTeam("1")} />
          <Pagination id="2" team={team} handleClick={() => setTeam("2")} />
          <Pagination id="3" team={team} handleClick={() => setTeam("3")} />
        </div>
        <div className="w-full flex gap-6 justify-center items-center p-8 max-sm:p-4 bg-white">
          <HomeButton />
          <AdminButton />
        </div>
      </div>
    </div>
  );
};

export default Home;

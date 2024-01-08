"use client";
import Image from "next/image";
import hamburger from "@/public/icons/hamburger.svg";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Sidemenu from "./Sidemenu";
import ball from "@/public/icons/football.png"

const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isSide, setIsSide] = useState(false);

  return (
    <>
      <div className={`${!isSide && "hidden"}`}>
        <Sidemenu handleClick={() => setIsSide(false)} />
      </div>
      <div className="h-30 flex w-full items-center justify-between px-4 py-2 font-bold shadow-md sm:px-[5%] md:px-[8%] lg:px-[12%]">
        <div className=" flex gap-5">
          <button onClick={() => setIsSide(!isSide)}>
            <Image src={hamburger} alt="hamburger icon" height={30} />
          </button>
          <h3 className="text-xl flex gap-2 font-bold text-blue-950">
          <Image src={ball} alt="ball" height={30}></Image>
          دوري الشباب
          </h3>
        </div>
        <h3 className="text-blue-950">
          {isHomePage ? "انضم إلى فريق" : "جدول المباريات"}
        </h3>
      </div>
    </>
  );
};

export default Header;

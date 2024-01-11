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
  const isAdminPage = pathname === "/admin";
  const [isSide, setIsSide] = useState(false);

  return (
    <>
      <div className={`${!isSide && "hidden"}`}>
        <Sidemenu handleClick={() => setIsSide(false)} />
      </div>
      <div className="h-16 flex w-full items-center justify-between px-4 py-2 font-bold shadow-md sm:px-[5%] md:px-[8%] lg:px-[12%]">
        <div className="flex items-center gap-5">
          <button onClick={() => setIsSide(!isSide)}>
            <Image className="w-auto" src={hamburger} alt="hamburger icon" height={20} priority={true} />
          </button>
          <h3 className="text-lg flex items-center gap-2 font-bold text-blue-950">
          <Image className="w-auto" src={ball} alt="ball" height={20} />
          دوري الشباب
          </h3>
        </div>
        <h3 className="text-blue-950">
          {isHomePage ? "انضم إلى فريق" : isAdminPage ? "Admin Page" : "جدول المباريات"}
        </h3>
      </div>
    </>
  );
};

export default Header;

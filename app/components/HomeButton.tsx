import { usePathname } from "next/navigation";
import schedule from "@/public/icons/schedule2.png";
import team from "@/public/icons/team.png";
import Link from "next/link";
import Image from "next/image";

const HomeButton = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <Link
        className="bg-blue-700 w-fit text-white text-lg hover:bg-accent hover:text-text flex gap-3 rounded-lg px-4 py-2"
        href={isHomePage ? "/matches-table" : "/"}
      >
        <span className="max-sm:hidden">
          {isHomePage ? "جدول المباريات" : "انضم إلى فريق"}
        </span>
        <Image className="w-auto" src={isHomePage ? schedule : team} alt="schedule" height={20} />
      </Link>
  )
}

export default HomeButton
import Link from "next/link";
import admin from "@/public/icons/admin.png";
import Image from "next/image";
const AdmiButton = () => {
  return (
    <Link
        className="bg-blue-700 w-fit text-white text-lg hover:bg-accent hover:text-text flex gap-3 rounded-lg px-4 py-2"
        href="/admin"
      >
       
      
      <span className="max-sm:hidden">
      Admin Page
        </span>
        <Image src={admin} alt="admin" height={20} />
      </Link>
  )
}

export default AdmiButton
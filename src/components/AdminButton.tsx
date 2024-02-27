import Link from "next/link";
import admin from "@/public/icons/admin.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
const AdminButton = () => {
  const pathname = usePathname();
  return (
    <Link
        className="bg-blue-700 w-fit text-white text-md hover:bg-accent hover:text-text flex gap-3 rounded-lg px-4 py-2"
        href={`${pathname}/schedule`}
      >
      <span className="max-sm:hidden">
      جدول المباريات
        </span>
        <Image className="w-auto" src={admin} alt="admin" height={15} />
      </Link>
  )
}

export default AdminButton
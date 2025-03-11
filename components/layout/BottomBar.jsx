"use client";
import { sidebarLinks } from "@/constans";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomBar = () => {
  const pathname = usePathname();

  return (
    <div className="flex bottom-0 z-20 w-full bg-[#121212] px-6 py-3 items-center justify-between md:hidden ">
      {sidebarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={link.label}
            href={link.route}
            className={`flex gap-2 items-center justify-start rounded-lg py-2 px-4 ${
              isActive && "bg-[#7857FF]"
            }`}
          >
            {link.icon}
            <p className="text-[#ffffff] text-[12px] font-medium max-md:hidden">
              {link.label}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomBar;

'use client'
import React from "react";
import TopBar from "./TopBar";
import { pageTitles } from "@/constans";
import { usePathname } from "next/navigation";

const MainContainer = ({ children }) => {
  const path = usePathname();

  const regex = /^\/([^\/]+)/;
  const firstPath = path.match(regex) ? path.match(regex)[0] : path;

  const title = pageTitles.find((page) => page.url === firstPath)?.title || "";

  return (
    <section className="flex flex-col flex-1 max-w-3xl px-4 md:px-10 lg:px-4 xl:px-20">
      <TopBar />
      <div className="mt-6 mb-20">
        <h1 className="mb-5 text-[30px] font-bold max-sm:text-[24px] max-sm:text-bold text-[#ffffff]">
          {title}
        </h1>
        <div className="h-screen overflow-y-scroll custom-scrollbar">
          {children}
        </div>
      </div>
    </section>
  );
};

export default MainContainer;

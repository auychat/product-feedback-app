"use client";

import Content from "@/components/content/Content";
import MobileNav from "@/components/header/MobileNav";
import Sidebar from "@/components/sidebar/Sidebar";

export default function Home() {

  return (
    <main className="bg-gray-background">
      <div className="max-w-[1110px] min-h-[1024px] mx-auto flex gap-[30px] pt-[94px] pb-[129px] xs:min-w-[375px] xs:max-w-full xs:pb-[55px] xs:flex-col xs:gap-0 xs:pt-0">
        <div className="xs:hidden">
          <Sidebar />
        </div>
        <div className="xs:inline-block">
          <MobileNav />
        </div>
        <Content />
      </div>
    </main>
  );
}

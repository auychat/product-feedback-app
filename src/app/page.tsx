"use client";

import Content from "@/components/content/Content";
import MobileNav from "@/components/header/MobileNav";
import Sidebar from "@/components/sidebar/Sidebar";

export default function Home() {
  return (
    <main className="bg-gray-background">
      <div className="max-w-[1110px] min-h-[1024px] mx-auto flex gap-[30px] pt-[94px] pb-[129px] xs:min-w-[375px] xs:max-w-full xs:pb-[55px] xs:flex-col xs:gap-0 xs:pt-0 sm:flex-col sm:pt-[56px] sm:pb-[110px] sm:px-[39px] sm:gap-[40px] md:flex-col md:pt-[56px] md:pb-[110px] md:px-[39px] md:gap-[40px] md:max-w-[920px] lg:px-8">
        <div className="xs:hidden sm:block md:block">
          <Sidebar />
        </div>
        <div className="xs:block xs:fixed xs:w-full xs:z-10 sm:hidden md:hidden lg:hidden xl:hidden">
          <MobileNav />
        </div>
        <div className="xs:mt-[72px] min-w-[327px] max-w-[825px] w-full">
          <Content />
        </div>
      </div>
    </main>
  );
}

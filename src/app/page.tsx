"use client";

import Content from "@/components/content/Content";
import Sidebar from "@/components/sidebar/Sidebar";
import Image from "next/image";

export default function Home() {
  const handleButtonClick = () => {
    console.log("Clicked");
  };

  return (
    <main className="bg-gray-background">
      <div className="max-w-[1110px] min-h-[1024px] mx-auto flex gap-[30px] pt-[94px] pb-[129px]">
        <Sidebar />

        <Content />
      </div>
    </main>
  );
}

import React from "react";
import Button from "./Button";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="bg-gray-background">
      <div className="max-w-[1110px] h-screen mx-auto flex flex-col items-center justify-center gap-8">
          <h1 className="text-hxl text-blue-dark">404 - Page Not Found</h1>
          <Link href="/">
            <Button className="w-full" btnColor="goback-dark">
              Go Back Home
            </Button>
          </Link>
      </div>
    </main>
  );
};

export default NotFound;

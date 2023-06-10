import React from "react";
import { MainNav } from "./main-nav";

function SiteHeader() {
  return (
    <header className="w-full border-b">
      <div className="px-4 sm:container flex h-14 items-center">
        <MainNav />
      </div>
    </header>
  );
}

export default SiteHeader;

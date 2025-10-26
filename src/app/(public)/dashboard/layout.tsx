'use client';

import "@/shared/extensions/string.extension";
import "@/shared/extensions/number.extension";
import { Navbar } from "@/shared/components/Navbar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <>
    <div className="flex flex-col h-screen w-screen">
      <Navbar />
      {children}
    </div>
  </>
}

export default DashboardLayout;

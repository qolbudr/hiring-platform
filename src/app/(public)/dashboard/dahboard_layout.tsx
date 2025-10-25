import "@/shared/extensions/string.extension";
import { Navbar } from "@/shared/components/Navbar"

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <>
    <div className="flex flex-col h-screen w-screen">
      <Navbar />
      {children}
    </div>
  </>
}
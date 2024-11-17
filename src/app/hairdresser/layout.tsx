import { Providers } from "@/store/Providers";
import { Navbar } from "./components/Navbar";

export default function GeneralLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div className="bg-white h-screen flex flex-col overflow-hidden">
      <Navbar></Navbar>
      <Providers>
        {children}
      </Providers> 
    </div>
  );
}
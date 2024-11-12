import { Navbar } from "../components/nav-bar/NavBar";

export default function GeneralLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div className="bg-white h-screen flex flex-col">
      <Navbar></Navbar>
      {children}
    </div>
  );
}
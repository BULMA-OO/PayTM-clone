import { Navbar } from "./Navbar.jsx";
import { Frame } from "./Frame.jsx";


export function Dashboard() {
  return (
    <div className="flex flex-col gap-6 h-scree w-full bg-white">
      <Navbar />
      <Frame />
    </div>
  );
}

import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";

function UserLayout() {
  return (
    <div className="p-4 max-w-screen mx-auto">
      <Navbar />
      <div className="pt-8">
        <Outlet />
      </div>
    </div>
  );
}

export default UserLayout;

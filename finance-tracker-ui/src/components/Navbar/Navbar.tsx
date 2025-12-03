import useAuth from "../../hooks/useAuth";
import NavbarItem from "./NavbarItem";
import { NotificationBell } from "./NotificationBell";
import UserInfo from "./UserInfo";

function Navbar() {
  const { username } = useAuth();

  return (
    <nav className="bg-[var(--color-dark-bg)] border-gray-800 text-white">
      <div className="w-full md:block md:w-auto">
        <ul className="font-medium flex justify-between p-4 md:p-0 mt-4 border border-[var(--color-dark-surface)] rounded-lg bg-[var(--color-dark-surface)] md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-[var(--color-dark-bg)]">
          <div className="flex">
            <NavbarItem title="Dashboard" path="/dashboard" />
            <NavbarItem title="Accounts" path="/accounts" />
            <NavbarItem title="Invitations" path="/invitations" />
          </div>
          <div className="flex items-center gap-4">
            <UserInfo username={username ?? "Unknown"} />
            <NotificationBell />
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

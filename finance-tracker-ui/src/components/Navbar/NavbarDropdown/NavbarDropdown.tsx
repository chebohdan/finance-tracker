import NavbarDropdownItem from "./NavbarDropdownItem";

type NavbarDropdownProps = {
  open: boolean;
};

function NavbarDropdown({ open }: Readonly<NavbarDropdownProps>) {
  return (
    <div
      className={`absolute right-0 mt-2 w-44 rounded-base shadow-lg border
                  bg-[var(--color-dark-surface)] border-[var(--color-dark-bg)]
                  divide-y divide-[var(--color-dark-bg)]
                  transform transition-all duration-150 origin-top-right
                  ${
                    open
                      ? "scale-100 opacity-100"
                      : "scale-95 opacity-0 pointer-events-none"
                  }`}
    >
      {/* Main links */}
      <ul className="p-2 text-sm font-medium text-[var(--color-dark-text)]">
        <NavbarDropdownItem to="/dashboard" label="Dashboard" />
        <NavbarDropdownItem to="/accounts" label="Accounts" />
        <NavbarDropdownItem to="/invitations" label="Invitations" />
      </ul>

      {/* Separated link */}
      <div className="p-2 text-sm font-medium text-[var(--color-dark-text)]">
        <NavbarDropdownItem to="/logout" label="Log out" danger />
      </div>
    </div>
  );
}

export default NavbarDropdown;

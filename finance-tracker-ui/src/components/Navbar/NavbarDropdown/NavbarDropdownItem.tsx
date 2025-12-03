import { NavLink } from "react-router";

type NavbarDropdownItemProps = {
  to: string;
  label: string;
  danger?: boolean;
};

function NavbarDropdownItem({
  to,
  label,
  danger = false,
}: Readonly<NavbarDropdownItemProps>) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `inline-flex items-center w-full p-2 rounded transition-colors duration-150
         ${
           danger
             ? "hover:bg-[var(--color-danger-hover)] hover:text-white"
             : isActive
             ? "bg-[var(--color-accent)] text-white"
             : "hover:bg-[var(--color-accent-hover)] hover:text-white"
         }`
      }
    >
      {label}
    </NavLink>
  );
}

export default NavbarDropdownItem;

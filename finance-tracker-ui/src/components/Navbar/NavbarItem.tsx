import { NavLink } from "react-router";

type NavbarItemProps = {
  title: string;
  path: string;
};

function NavbarItem({ title, path }: Readonly<NavbarItemProps>) {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) => `
                  block py-2 px-3 rounded-sm 
                  ${isActive ? "bg-accent" : ""}
                `}
      >
        {title}
      </NavLink>
    </li>
  );
}

export default NavbarItem;

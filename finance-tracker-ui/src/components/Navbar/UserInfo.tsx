import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import NavbarDropdown from "./NavbarDropdown/NavbarDropdown";

type UserInfoProps = {
  username: string;
};

function UserInfo({ username }: Readonly<UserInfoProps>) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Trigger button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 cursor-pointer 
                   text-[var(--color-dark-text)]"
      >
        <span>{username}</span>
        <CgProfile size={28} />
      </button>
      <NavbarDropdown open={open} />
    </div>
  );
}

export default UserInfo;

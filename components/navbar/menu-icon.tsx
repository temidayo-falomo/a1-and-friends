"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface MenuIconProps {
  menuOpen: boolean;
  setMenuToggle: (toggle: boolean) => void;
  setOpenMobileMenu: (toggle: boolean) => void;
}

const MenuIcon: React.FC<MenuIconProps> = ({
  menuOpen,
  setMenuToggle,
  setOpenMobileMenu,
}) => {
  const [hover, setHover] = useState(false);
  const pathname = usePathname();

  return (
    <div
      onClick={() => {
        setMenuToggle(!menuOpen);
        setHover(!hover);
        setOpenMobileMenu(true);
      }}
      onMouseEnter={() => {
        setHover(!hover);
      }}
      onMouseLeave={() => {
        setHover(!hover);
      }}
      id="link"
      className="flex w-[22px] h-[35px] cursor-pointer items-center justify-between"
    >
      <div
        className={
          "w-[1px] h-[25px] " +
          (pathname === "/about" ? " bg-black" : "bg-white")
        }
      ></div>
      <div
        className={
          "duration-300 flex justify-end " + (hover ? "gap-[3px]" : "gap-[6px]")
        }
      >
        <div
          className={
            "w-[1px] h-[25px] " +
            (pathname === "/about" ? " bg-black" : "bg-white")
          }
        ></div>
        <div
          className={
            "w-[1px] h-[25px] " +
            (pathname === "/about" ? " bg-black" : "bg-white")
          }
        ></div>
        <div
          className={
            "w-[1px] h-[25px] " +
            (pathname === "/about" ? " bg-black" : "bg-white")
          }
        ></div>
      </div>
    </div>
  );
};

export default MenuIcon;

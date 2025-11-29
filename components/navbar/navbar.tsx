"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import MenuIcon from "./menu-icon";
import { ButtonMenu } from "../elements/button";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { TransitionLink } from "@/utils/transition-link";
import MobileMenu from "./mobile-menu";

const NavBar: React.FC = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [navbarBackground, setNavbarBackground] = useState(false);
  const pathname = usePathname();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const closed = {
    default: {
      translateX: "-100%",
    },
  };
  const open = {
    default: {
      translateX: "0",
      width: 330,
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // Adjust the scroll threshold as needed
        setNavbarBackground(true);
      } else {
        setNavbarBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={
          "w-full max-w-7xl flex justify-center items-center left-1/2 -translate-x-1/2 top-0 z-[100] mx-auto fixed  " +
          (pathname !== "/about" && navbarBackground
            ? "bg-black border-grid border-b-[0px]"
            : pathname !== "/about" && !navbarBackground
            ? "border-grid"
            : pathname === "/about" && !navbarBackground
            ? "border-grid/20"
            : "bg-[#F3F6F9] border-grid/20 border-b-[0px]")
        }
      >
        <div
          className={
            "flex py-[9px] md:py-[20px] w-[90%] md:w-[95%] justify-between items-center"
          }
        >
          <TransitionLink href="/">
            {pathname === "/about" ? (
              <Image
                className="relative w-[80px]"
                src="/A1 Assets/LOGOS/A1/A1 2.png"
                alt="A1 Icon"
                width={80}
                height={80}
                priority
                
              />
            ) : (
              <Image
                className="relative w-[80px]"
                src="/A1 Assets/LOGOS/A1/A1 2.png"
                alt="A1 Icon"
                width={80}
                height={80}
                priority
              />
            )}
          </TransitionLink>
          <div className="flex items-center gap-4">
            <motion.div
              variants={menuToggle ? open : closed}
              animate="default"
              transition={{ ease: "easeOut", duration: 1 }}
              className={
                "hidden md:block menuCover h-[35px] w-[0px] absolute" +
                (pathname === "/about" ? " bg-[#F3F6F9]" : " bg-black")
              }
            ></motion.div>
            {/* <ul className='hidden md:flex font-["helvetica-extended"] text-[16px] font-[300] gap-10 mr-10'>
              <TransitionLink href="/events">
                <li
                  className={
                    "hover:text-primary duration-300" +
                    (pathname === "/about" ? " text-black" : "")
                  }
                >
                  Events
                </li>
              </TransitionLink>
              <TransitionLink href="/about">
                <li
                  id="link"
                  className={
                    "hover:text-primary cursor-pointer duration-300" +
                    (pathname === "/about" ? " text-black" : "")
                  }
                >
                  About
                </li>
              </TransitionLink>
              <TransitionLink href="/blog">
                <li
                  className={
                    "hover:text-primary duration-300" +
                    (pathname === "/about" ? " text-black" : "")
                  }
                >
                  Blog
                </li>
              </TransitionLink>
              <TransitionLink href="/contact">
                <li
                  className={
                    "hover:text-primary duration-300" +
                    (pathname === "/about" ? " text-black" : "")
                  }
                >
                  Contact
                </li>
              </TransitionLink>
            </ul> */}
            {/* <div className="hidden md:block">
              <ButtonMenu
                text="Investors"
                href="mailto:contact@theexhibit.co?subject=Investor Inquiry&body=I’m interested in learning
more about investment opportunities with Exhibit."
              />
            </div> */}
            {/* <MenuIcon
              setMenuToggle={setMenuToggle}
              menuOpen={menuToggle}
              setOpenMobileMenu={setOpenMobileMenu}
            />
            {openMobileMenu ? (
              <MobileMenu
                openMobileMenu={openMobileMenu}
                setOpenMobileMenu={setOpenMobileMenu}
              />
            ) : (
              ""
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};
export default NavBar;

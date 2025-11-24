"use client";

import { TransitionLink } from "@/utils/transition-link";
import { MobileButtonMenu } from "../elements/button";
import { MdClose } from "react-icons/md";

interface MobileMenuProps {
  setOpenMobileMenu: (toggle: boolean) => void;
  openMobileMenu: boolean;
}
const MobileMenu: React.FC<MobileMenuProps> = ({
  setOpenMobileMenu,
  openMobileMenu,
}) => {
  return (
    <div
      className={`absolute md:hidden w-[90%] top-20 px-8 pt-10 pb-10 text-black text-[24px] font-[400] bg-white rounded-md duration-700 ${
        openMobileMenu ? "right-5" : "right-[600px]"
      } `}
    >
      <div className="mb-[35px] flex justify-between">
        <p className="text-[14px]">Navigation</p>
        <MdClose onClick={() => setOpenMobileMenu(false)} size={22} />
      </div>
      <div className="flex flex-col gap-2">
        <TransitionLink
          onNavigate={() => setOpenMobileMenu(false)}
          href="/events"
        >
          Events
        </TransitionLink>
        <TransitionLink
          onNavigate={() => setOpenMobileMenu(false)}
          href="/about"
        >
          About
        </TransitionLink>
        <TransitionLink
          onNavigate={() => setOpenMobileMenu(false)}
          href="/blog"
        >
          Blog
        </TransitionLink>
        <TransitionLink
          onNavigate={() => setOpenMobileMenu(false)}
          href="/contact"
        >
          Contact
        </TransitionLink>
        <MobileButtonMenu
          text="Investors"
          href="mailto:contact@theexhibit.co?subject=Investor Inquiry&body=I’m interested in learning
more about investment opportunities with Exhibit."
        />
      </div>
    </div>
  );
};
export default MobileMenu;

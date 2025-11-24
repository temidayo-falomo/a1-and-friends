"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { TransitionLink } from "@/utils/transition-link";

interface ServicesProps {
  servicesToggle: boolean;
  setServicesToggle: (toggle: boolean) => void; // Assuming it's a boolean, change this if needed
}
export default function Services({
  servicesToggle,
  setServicesToggle,
}: ServicesProps) {
  const [hover, setHover] = useState(0);
  const open = {
    default: {
      top: 0,
    },
  };
  const closed = {
    default: {
      top: -600,
    },
  };
  return (
    <motion.div
      variants={servicesToggle ? open : closed}
      animate="default"
      transition={{ ease: "easeOut", duration: 1 }}
      onMouseLeave={() => {
        setServicesToggle(false);
      }}
      className={
        "w-full flex flex-col items-center top-[-600px] bg-black fixed h-[450px] z-[999] pt-[100px]"
      }
    >
      <div className="h-[1px] w-[90vw] border-t border-stone-500 border-solid"></div>
      <div className="w-[90vw] h-full overflow-hidden flex justify-between font-[helvetica-extended] text-[16px] ">
        <div className="flex justify-between w-[60%] pt-[40px]">
          <p>Our Services</p>
          <div className="w-[50%] flex flex-col text-[26px] font-[500]">
            <TransitionLink href="web-development">
              <div
                onMouseEnter={() => {
                  setHover(1);
                }}
                onMouseLeave={() => {
                  setHover(0);
                }}
                className={
                  "duration-300 " +
                  (hover === 0
                    ? "text-white"
                    : hover === 1
                    ? "text-white"
                    : "text-gray-500")
                }
              >
                Website development
              </div>
            </TransitionLink>

            <TransitionLink href="ui-ux">
              <div
                onMouseEnter={() => {
                  setHover(2);
                }}
                onMouseLeave={() => {
                  setHover(0);
                }}
                className={
                  "duration-300 " +
                  (hover === 0
                    ? "text-white"
                    : hover === 2
                    ? "text-white"
                    : "text-gray-500")
                }
              >
                UI/UX Design
              </div>
            </TransitionLink>

            <TransitionLink href="seo-marketing">
              <div
                onMouseEnter={() => {
                  setHover(3);
                }}
                onMouseLeave={() => {
                  setHover(0);
                }}
                className={
                  "duration-300 " +
                  (hover === 0
                    ? "text-white"
                    : hover === 3
                    ? "text-white"
                    : "text-gray-500")
                }
              >
                SEO & Marketing
              </div>
            </TransitionLink>

            <TransitionLink href="branding">
              <div
                onMouseEnter={() => {
                  setHover(4);
                }}
                onMouseLeave={() => {
                  setHover(0);
                }}
                className={
                  "duration-300 " +
                  (hover === 0
                    ? "text-white"
                    : hover === 4
                    ? "text-white"
                    : "text-gray-500")
                }
              >
                Branding
              </div>
            </TransitionLink>

            <TransitionLink href="subscription">
              <div
                onMouseEnter={() => {
                  setHover(5);
                }}
                onMouseLeave={() => {
                  setHover(0);
                }}
                className={
                  "duration-300 " +
                  (hover === 0
                    ? "text-white"
                    : hover === 5
                    ? "text-white"
                    : "text-gray-500")
                }
              >
                Design Subscription
              </div>
            </TransitionLink>
          </div>
        </div>
        <div className="w-[40%] h-full flex items-end">
          <Image
            className={
              "duration-300 absolute " +
              (hover === 1 || hover === 0 ? "opacity-100" : "opacity-0")
            }
            src="/services/web.png"
            alt=""
            width={450}
            height={400}
          />
          <Image
            className={
              "duration-300 absolute " +
              (hover === 2 ? "opacity-100" : "opacity-0")
            }
            src="/services/UI.png"
            alt=""
            width={450}
            height={400}
          />
          <Image
            className={
              "duration-300 absolute " +
              (hover === 3 ? "opacity-100" : "opacity-0")
            }
            src="/services/marketing.png"
            alt=""
            width={450}
            height={400}
          />
          <Image
            className={
              "duration-300 absolute " +
              (hover === 4 ? "opacity-100" : "opacity-0")
            }
            src="/services/branding.png"
            alt=""
            width={450}
            height={400}
          />
          <Image
            className={
              "duration-300 absolute " +
              (hover === 5 ? "opacity-100" : "opacity-0")
            }
            src="/services/design.png"
            alt=""
            width={450}
            height={400}
          />
        </div>
      </div>
    </motion.div>
  );
}

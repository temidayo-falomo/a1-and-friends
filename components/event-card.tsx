"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";
import CodedText, { CodedTextHandle } from "@/utils/decode-text";
import { TransitionLink } from "@/utils/transition-link";
import { useAudio } from "./AudioProvider";
import Link from "next/link";

interface ImageProps {
  img: string;
  title: string;
  type: string;
  href: string;
  rotation?: number;
}

export default function EventCard({
  img,
  title,
  type,
  href,
  rotation = 0,
}: ImageProps) {
  const { play } = useAudio();
  const [hover, setHover] = useState(false);
  const codedTextRef = useRef<CodedTextHandle>(null);
  const isComingSoon = href === "#";
  const variant = {
    default: {
      rotate: 0,
    },
  };
  const hoverVariant = {
    default: {
      rotate: 45,
    },
  };

  const cardContent = (
    <>
      <div
        onMouseEnter={() => {
          setHover(true);
          codedTextRef.current?.startAnimation();
        }}
        onMouseLeave={() => {
          setHover(false);
          codedTextRef.current?.startAnimation();
        }}
        className={
          "w-[95%] md:min-w-[250px] h-[95%] rounded-[8px] p-8 flex flex-col justify-between hover:backdrop-blur-[5px] absolute bg-black/10 duration-500 " +
          (hover ? "ml-8 -mt-8" : "")
        }
      >
        <div className="flex flex-col">
          {/* <CodedText
            ref={codedTextRef}
            text={type}
            className='font-["helvetica-extended"] font-[400] text-black text-[12px] 2xl:text-[14px] bg-white px-3 py-1 w-fit rounded-full'
          /> */}
          {isComingSoon && (
            <h3 className='font-["helvetica-extended"] text-[28px] 2xl:text-[32px] font-[400] mt-[30px] leading-[1.2]'>
              Coming Soon
            </h3>
          )}
        </div>
        {!isComingSoon && (
          <motion.div
            className="w-fit"
            variants={hover ? hoverVariant : variant}
            animate="default"
            transition={{ ease: "easeOut", duration: 0.3 }}
          >
            <FiArrowUpRight size={22} />
          </motion.div>
        )}
      </div>
      <Image
        className={
          "object-cover w-[95%] md:min-w-[250px] h-[95%] rounded-[8px] duration-500 bg-card " +
          (hover ? "ml-8 -mt-8" : "")
        }
        src={img}
        alt="Event Image"
        width={600}
        height={420}
      />
    </>
  );

  return (
    <div
      onClick={() => !isComingSoon && play()}
      className="w-[90%] md:w-full shrink-0 flex justify-center"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {isComingSoon ? (
        <div className="w-[95%] md:w-[86%] shrink-0 snap-start bordered-container mt-[60px] h-[330px] 2xl:h-[480px] flex justify-center items-center relative opacity-60">
          {cardContent}
        </div>
      ) : (
        <Link
          prefetch
          href={href}
          className="w-[95%] md:w-[86%] shrink-0 snap-start bordered-container cursor-pointer mt-[60px] h-[330px] 2xl:h-[480px] flex justify-center items-center relative"
        >
          {cardContent}
        </Link>
      )}
    </div>
  );
}

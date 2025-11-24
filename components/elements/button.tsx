"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TransitionLink } from "@/utils/transition-link";

interface TextLinkProps {
	href: string;
	text: string;
}

interface ButtonProps {
	href: string;
	text: string;
	color?: string;
	hoverColor?: string;
}

const ButtonMenu: React.FC<ButtonProps> = ({ text, href }) => {
	const pathname = usePathname();
	const [hover, setHover] = useState(false);
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
	return (
		<Link
			id='link'
			href={href}
			target='_blank'
			className={
				`flex items-center gap-1 px-[8px] md:px-[20px] py-[2px] md:py-[6px] rounded-[4px] md:rounded-[8px] cursor-pointer duration-300 border-solid border` +
				(pathname === "/about"
					? " text-white hover:text-black border-black bg-black hover:bg-secondary hover:border-secondary"
					: " border-white hover:bg-white hover:text-black hover:border-white")
			}
			onMouseEnter={() => {
				setHover(true);
			}}
			onMouseLeave={() => {
				setHover(false);
			}}
		>
			<p className='leading-7 text-[12px] md:text-[16px] font-[500] md:font-[400] uppercase font-["helvetica-extended"]'>{text}</p>
			<motion.div variants={hover ? hoverVariant : variant} animate='default' transition={{ ease: "easeOut", duration: 0.5 }}>
				<FiArrowUpRight className='text-[18px] md:text-[22px]' />
			</motion.div>
		</Link>
	);
};

const MobileButtonMenu: React.FC<ButtonProps> = ({ text, href }) => {
	const [hover, setHover] = useState(false);
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
	return (
		<Link
			id='link'
			href={href}
			target='_blank'
			className={
				"w-full flex items-center gap-1 px-[20px] py-[6px] mt-[20px] rounded-[4px] md:rounded-[8px] cursor-pointer duration-300 border-solid border-[1.5px] text-black hover:text-black bg-secondary border-secondary"
			}
			onMouseEnter={() => {
				setHover(true);
			}}
			onMouseLeave={() => {
				setHover(false);
			}}
		>
			<p className='leading-7 text-[20px] uppercase font-["helvetica-extended"]'>{text}</p>
			<motion.div variants={hover ? hoverVariant : variant} animate='default' transition={{ ease: "easeOut", duration: 0.5 }}>
				<FiArrowUpRight className='text-[18px] md:text-[22px]' />
			</motion.div>
		</Link>
	);
};

const TextLink: React.FC<TextLinkProps> = ({ href, text }) => {
	const [hover, setHover] = useState(false);
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
	return (
		<Link
			id='link'
			href={href}
			target='_blank'
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			className='flex items-center font-["helvetica-extended"] cursor-pointer gap-1 w-[220px] justify-between'
		>
			<div className='h-[40px]'>
				<h1 className='text-[20px] lg:text-[32px] font-[300] '>{text}</h1>
			</div>
			<motion.div variants={hover ? hoverVariant : variant} animate='default' transition={{ ease: "easeOut", duration: 0.3 }}>
				<FiArrowUpRight size={26} className={"mt-[-5px]" + (hover ? "" : "")} />
			</motion.div>
		</Link>
	);
};

const Button: React.FC<ButtonProps> = ({ href, text }) => {
	const [hover, setHover] = useState(false);
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
	return (
		<TransitionLink href={href}>
			<div
				id='link'
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
				className={`flex items-center w-full border-secondary hover:bg-[#111] border-l-[2px] duration-300 cursor-pointer gap-2 justify-between py-4 pl-8 pr-4 text-white`}
			>
				<h1 className='font-[helvetica-extended] font-[300] text-[18px]'>{text}</h1>
				<motion.div variants={hover ? hoverVariant : variant} animate='default' transition={{ ease: "easeOut", duration: 0.3 }}>
					<FiArrowUpRight size={22} />
				</motion.div>
			</div>
		</TransitionLink>
	);
};

const ButtonB: React.FC<ButtonProps> = ({ text }) => {
	const [hover, setHover] = useState(false);
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
	return (
		<div
			id='link'
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			className={`flex items-center w-full border-secondary bg-primary text-black hover:bg-secondary border-l-[0px] duration-300 cursor-pointer gap-2 justify-between py-4 pl-8 pr-4`}
		>
			<h1 className='font-[helvetica-extended] font-[300] text-[18px]'>{text}</h1>
			<motion.div variants={hover ? hoverVariant : variant} animate='default' transition={{ ease: "easeOut", duration: 0.3 }}>
				<FiArrowUpRight size={22} />
			</motion.div>
		</div>
	);
};

export { TextLink, ButtonMenu, MobileButtonMenu, Button, ButtonB };

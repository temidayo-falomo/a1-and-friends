"use client";

import Link, { LinkProps } from "next/link";
import React, { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { animatePageOut } from "@/utils/animations";

interface TrasnsitionLinkProps extends LinkProps {
	children: ReactNode;
	className?: string;
	href: string;
	onNavigate?: () => void;
}

export const TransitionLink = ({ children, href, className, onNavigate, ...props }: TrasnsitionLinkProps) => {
	const router = useRouter();
	const pathname = usePathname();

	const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault();

		if (pathname !== href) {
			onNavigate?.();
			animatePageOut(href, router);
		}
	};
	return (
		<Link className={className} onClick={handleTransition} id='link' href={href} {...props}>
			{children}
		</Link>
	);
};

"use client";

interface SpacerProps {
	space?: string;
}
export default function Spacer({ space = "300" }: SpacerProps) {
	const Spacer = "h-[" + space + "px]";
	return <div className={"w-full " + Spacer}></div>;
}

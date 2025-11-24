"use client";
export default function GridBg() {
	return (
		<div className='w-screen md:w-full fixed z-[5] flex justify-center'>
			<div className='w-[90%] md:w-[95%] h-[100vh] grid grid-cols-4'>
				<div className={"w-full border-solid border-l-[1.2px] h-full border-grid"}></div>
				<div className={"w-full border-solid md:border-l-[1.2px] h-full border-grid"}></div>
				<div className={"w-full border-solid md:border-l-[1.2px] h-full border-grid"}></div>
				<div className={"w-full border-solid md:border-l-[1.2px] border-r-[1.2px] h-full border-grid"}></div>
			</div>
		</div>
	);
}

export function AboutGridBg() {
	return (
		<div className='w-[100%] absolute z-[-5] h-full bg-[#F3F6F9] top-0 flex justify-center'>
			<div className='w-[90%] md:w-[95%] h-full grid grid-cols-4'>
				<div className={"w-full border-solid border-l-[1.2px] h-full border-grid/20"}></div>
				<div className={"w-full border-solid md:border-l-[1.2px] h-full border-grid/20"}></div>
				<div className={"w-full border-solid md:border-l-[1.2px] h-full border-grid/20"}></div>
				<div className={"w-full border-solid md:border-l-[1.2px] border-r-[1.2px] h-full border-grid/20"}></div>
			</div>
		</div>
	);
}

// components/CircularText.tsx
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

const CircularText: React.FC = () => {
	return (
		<div className='flex justify-center items-center'>
			<Image
				alt='project-hover'
				className='object-cover object-center h-full w-full p-[3px] relative slow-spin'
				src='/project-hover.svg'
				width={100}
				height={100}
			/>
			<FiArrowUpRight className='absolute text-black' size={12} />
		</div>
	);
};

export default CircularText;

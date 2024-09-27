'use client';
import Image from 'next/image';
import NotFound from '../ui/NotFound';
import kft from '../../../../public/assets/kfc-background.jpg';
import SearchInput from '../ui/SearchInput';
import { useState } from 'react';
import PopularMeals from '../popularMeals/PopularMeals';
import sliderPhoto from '@public/assets/landing-poster.png'
import slider from '@public/assets/kfc-background.jpg'
import  Card  from '../ui/card/Card'

function Content({ lang }: { lang?: string }) {
	const [searchValue, setSearchValue] = useState('');
	
	const handleInputChange = (e: any) => {
		setSearchValue(e.target.value);
	};
	return <>
		<div className='flex flex-col gap-5 mobile:gap-10 pb-5 mobile:pb-0'>
			<div className='relative'>
				<div className='relative h-[25vh]  after:w-full after:h-full after:inset-0 after:absolute after:bg-orange-500/20 after:backdrop-blur-sm'>
					<Image src={kft} alt="background" loading="lazy" decoding="async" data-nimg="fill" 
					className='!relative object-cover' style={{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:"cover", color:"transparent"}} />
				</div>
				<div className="absolute bg-white rounded-lg bottom-0 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 translate-y-1/2">
					<SearchInput isTop={true} value={searchValue} handleInputChange={handleInputChange} />
				</div>
			</div>
			<div className='w-[90%] mx-auto flex flex-col gap-1'>
				<h3 className="font-semibold text-lg md:text-2xl py-3 sm:py-4 truncate max-w-[30ch]">
					{`Results ${
						searchValue != undefined && searchValue != '' ? `for ${searchValue}` : ''
					}`}
				</h3>
				<div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5 md:gap-0">
					<Card
						name="Product Name"
						description="This is a great product."
						price={100}
						newtrend="most selling"
						sale_price={80}
						className="cursor-pointer mb-0 md:mb-5" 
						photo={sliderPhoto.src}
					/>
					<Card
						name="Product Name"
						description="This is a great product."
						price={100}
						newtrend="most selling"
						sale_price={80}
						className="" 
						photo={slider.src}
					/>
					<Card
						name="Product Name"
						description="This is a great product."
						price={100}
						newtrend="most selling"
						sale_price={80}
						className="" 
						photo={sliderPhoto.src}
					/>
					<Card
						name="Product Name"
						description="This is a great product."
						price={100}
						newtrend="most selling"
						sale_price={80}
						className="" 
						photo={slider.src}
					/>
					<Card
						name="Product Name"
						description="This is a great product."
						price={100}
						newtrend="most selling"
						sale_price={80}
						className="" 
						photo={slider.src}
					/>
				</div>
			</div>
			{/* <PopularMeals showHeader={false}/> */}
		</div>

		{/* <NotFound name="items" />		 */}
	</>
}

export default Content;

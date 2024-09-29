'use client';
import Image from 'next/image';
import NotFound from '../ui/NotFound';
import kft from '../../../../public/assets/kfc-background.jpg';
import SearchInput from '../ui/SearchInput';
import { SetStateAction, useEffect, useState } from 'react';
import  Card  from '../ui/card/Card'
import { shopId } from '@/config/shopId';
import { API_BASE_URL } from '@/config/base-url';
import Pagination from '../ui/pagination/Pagination';

function Content({ lang }: { lang?: string }) {
	const [searchValue, setSearchValue] = useState('');
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [nextPage, setNextPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [errorMessage, setErrorMessage] = useState('');
	
	const fetchData = async (searchTerm: string, page: number) => {
		try {
		let response;
		const pageSize = 10; // Define the number of items per page
		const url = searchTerm
			? `${API_BASE_URL}/api/Products/SearchByName/${shopId}?SearchParamter=${searchTerm}&PageNumber=${page}&PageSize=${pageSize}`
			: `${API_BASE_URL}/api/Products/GetAll/${shopId}?PageNumber=${page}&PageSize=${pageSize}`;
			
		response = await fetch(url, {
			method: 'GET',
			headers: {
			'Accept-Language': `${lang}`,
			},
		});

		const result = await response.json();
		setProducts(result.entities);
		setNextPage(result.nextPage);
		setTotalPages(5);
		} catch (error) {
		setErrorMessage('Error fetching data');
		}
	};

	const handleInputChange = (e: any) => {
		setSearchValue(e.target.value);
		setCurrentPage(1);
	};

	useEffect(() => {
		fetchData(searchValue, currentPage);
	}, [searchValue, currentPage]);
	console.log("lang: ",lang);
	
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return <>
		<div className='flex flex-col gap-5 mobile:gap-10 pb-5 mobile:pb-0 bg-[#F5F7FA]'>
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
				{products.length > 0 ? (
					<>
						<div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 sm:gap-8">
							{products.map((product: any) => (
								<Card
									key={product.id}
									id={product.id}
									isTopSelling={product.isTopSelling}
									isTopRated={product.isTopRated}
									name={product.name}
									price={product.price}
									oldPrice={product.oldPrice}
									description={product.description}
									imageUrl={product.imageUrl}
									isActive={product.isActive}
									createdAt={product.createdAt}
									lastUpdatedAt={product.lastUpdatedAt}
									isOffer={false}
									setCurrentItem={() => {}}
								/>
							))}
						</div>
						{totalPages > 1 && nextPage > 0 && (
							<Pagination totalPages={totalPages} onPageChange={handlePageChange} lang={lang} />
						)}
					</>
				) : (
					<div className='flex justify-center'>
						<NotFound name="items" />
					</div>
				)}
			</div>
		</div>
	</>
}

export default Content;

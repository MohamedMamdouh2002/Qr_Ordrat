import React from 'react';

type Props = {};

function Choices({}: Props) {
	return (
		<div className="flex flex-col gap-3 py-4">
			<div className="flex items-start justify-between">
				<div className="flex flex-col gap-1">
					<strong>Your choice of:</strong>
					<span className='text-black/75'>Choose 1</span>
				</div>
				<div className="text-white bg-black px-2 py-1 rounded-full text-sm">Required</div>
			</div>

		</div>
	);
}

export default Choices;

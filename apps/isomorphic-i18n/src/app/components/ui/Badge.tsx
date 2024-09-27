import cn from '../../../../../../../isomorphic/packages/isomorphic-core/src/utils/class-names';
import { LucideProps, Star } from 'lucide-react';
import React, { HTMLAttributes } from 'react';

type Props = {
	Icon: React.ForwardRefExoticComponent<
		Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
	>;
	title: string;
	className?: HTMLAttributes<HTMLDivElement>['className'];
};

function Badge({ Icon, title, className }: Props) {
	return (
		<div
			className={cn(
				'flex items-center gap-1 bg-[#ffe3d3] text-[#F26F2F] font-semibold text-[10px] w-fit px-1 py-.5 rounded-md',
				className
			)}
		>
			<Icon className="fill-[#F26F2F] text-[#F26F2F]" size={12} /> {title}
		</div>
	);
}

export default Badge;

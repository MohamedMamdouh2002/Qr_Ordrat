'use client';
// import convertDate from '@/utils/convertDate';
import { Timeline } from '@mantine/core';
import { CalendarCheck2, CarFront, Microwave, PackageCheck } from 'lucide-react';
import {  useTranslation } from '@/app/i18n/client';
import React from 'react';

type Props = {
	status: Status;
	statusDate: string;
};
enum Status {
	Processing = 'Processing',
	Cooking = 'Cooking',
	Delivering = 'Delivering',
	Delivered = 'Delivered'
}
function OrderTimeLine({ status, statusDate }: Props,{ lang }: { lang?: string }) {
	// const locale = useLocale();
	const { t } = useTranslation(lang!, 'loginForm');

	// const t = useTranslations('trackingOrder');
	return (
		<Timeline
			active={
				status === Status.Processing
					? 0
					: status === Status.Cooking
					? 1
					: status === Status.Delivering
					? 2
					: 3
			}
			lineWidth={3}
			bulletSize={34}
			color="rgb(var(--main-color))"
		>
			<Timeline.Item
				className=""
				bullet={<CalendarCheck2 size={24} className="" />}
				title={t('orderReceived')}
			>
				<p className="text-sm">{t('orderReceivedDesc')}</p>
				{status === Status.Processing && (
					<span className="text-xs mt-2 text-black/50">
						{/* {(statusDate,  as 'ar' | 'en')} */}
                        56
					</span>
				)}
			</Timeline.Item>

			<Timeline.Item
				className=""
				title={t('orderPreparing')}
				lineVariant="dashed"
				bullet={<Microwave size={24} className="" />}
			>
				<p className="text-sm">{t('orderPreparingDesc')}</p>
				{status === Status.Cooking && (
					<span className="text-xs mt-2 text-black/50">
                        lkefjs
						{/* {convertDate(statusDate, locale as 'ar' | 'en')} */}
					</span>
				)}
			</Timeline.Item>

			<Timeline.Item
				className=""
				title={t('orderDelivering')}
				lineVariant="dashed"
				bullet={<CarFront size={24} className="" />}
			>
				<p className="text-sm ">{t('orderDeliveringDesc')}</p>
				{status === Status.Delivering && (
					<span className="text-xs mt-2 text-black/50">
                        dfsdfs
						{/* {convertDate(statusDate, locale as 'ar' | 'en')} */}
					</span>
				)}
			</Timeline.Item>

			<Timeline.Item
				className=""
				title={t('orderDelivered')}
				bullet={<PackageCheck size={24} className="" />}
			>
				<p className="text-sm ">{t('orderDeliveredDesc')}</p>
				{status === Status.Delivered && (
					<span className="text-xs mt-2 text-black/50">
                        fsger
						{/* {convertDate(statusDate, locale as 'ar' | 'en')} */}
					</span>
				)}
			</Timeline.Item>
		</Timeline>
	);
}

export default OrderTimeLine;

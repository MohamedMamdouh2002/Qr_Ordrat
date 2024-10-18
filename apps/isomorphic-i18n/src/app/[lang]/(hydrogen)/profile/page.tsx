import Layout from '@/app/components/ui/hoc/layout';
import SessionGuard from '@/app/components/ui/hoc/layout/SessionGuard';
import Addresses from '@/app/components/profile/Addresses';
import UpdateProfileForm from '@/app/components/profile/UpdateProfileForm';
import { unstable_setRequestLocale } from 'next-intl/server';
import React from 'react';
import { ProfileHeader } from '@/app/shared/account-settings/profile-settings';

type Props = {
	params: {
		locale: 'ar' | 'en';
	};
};

async function Profile({ params: { locale } }: Props) {
	unstable_setRequestLocale(locale);
	return (
		<>
			<div className='w-full mx-auto'>
				<ProfileHeader
					title="Olivia Rhye"
					description="01227375904"
				/>
			</div>
			<div className='w-[95%] md:w-[85%]  mx-auto'>
				<SessionGuard>
					<Layout fullLayout="false" currentPage="Profile" locale={locale}>
						<div className="container flex flex-col gap-10 w-full my-5">
							<div className="flex flex-col gap-5">
								<div className="flex justify-between items-center">
									<h2 className="text-2xl md:text-3xl font-medium">Account Details</h2>
								</div>
								<UpdateProfileForm />
							</div>
							<div className="flex flex-col gap-5">
								<div className="flex justify-between items-center">
									<h2 className="text-2xl md:text-3xl font-medium">My addresses</h2>
								</div>
								<Addresses />
							</div>
						</div>
					</Layout>
				</SessionGuard>
			</div>
		</>
	);
}

export default Profile;

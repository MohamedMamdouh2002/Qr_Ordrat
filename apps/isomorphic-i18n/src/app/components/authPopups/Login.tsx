'use client';
import React, { useContext, useEffect, useState } from 'react';
import Logo from '@public/assets/karam-el-sham.png';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { Form, Formik } from 'formik';
// import Phone from '../../common/inputs/phone';
import Text from '../ui/Text/index';
import { loginInitialValues, useLoginValidation } from '../forms/LoginSchema';
import handleSubmit from '../fetch/handleSubmit';
import { Loader, Loader2 } from 'lucide-react';
import Image from 'next/image';
// import { SessionContext } from '@/utils/contexts';

type Props = {
	onLogin?: () => void;
	setCurrentModal: (val: 'login' | 'register' | 'resetPassword') => void;
};

function Login({ onLogin, setCurrentModal }: Props) {
	const router = useRouter();
	// const { setSession } = useContext(SessionContext);
	const loginSchema = useLoginValidation({});
	const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
	const [errorMsg, setErrorMsg] = useState(false);
	const [data, setData] = useState(null);
	useEffect(() => {
		if (data) {
			setCookie('karam-el-sham-qr-session', data);
			// setSession(data);
			router.refresh();
			onLogin?.();
		}
	}, [data]);
	const [loading, setLoading] = useState(false);
	const [accountVerified, setAccountVerified] = useState(false);
	// useEffect(() => {
	// 	if (accountCreated && accountVerified) {
	// 		setCookie('karam-el-sham-qr-session', 'value');
	// 		router.refresh();
	// 	}
	// }, [accountCreated, accountVerified]);
	console.log(errorMsg);

	return (
		<div className="flex flex-col gap-5">
			<div className="flex flex-col items-center justify-center">
				<Image width={60} height={60} src={Logo} alt="logo"/>
				<p className="text-sm font-light">Fried chicken, Sandwiches, Fast Food...</p>
			</div>
			<div className="flex flex-col items-center">
				<h3 className="font-bold text-lg">Login</h3>
				<button
					onClick={() => setCurrentModal('register')}
					className="text-xs font-bold text-black/50 hover:underline"
				>
					New to ordrat? Create an account now!
				</button>
				<Formik
					initialValues={loginInitialValues}
					onSubmit={async vals => {
						handleSubmit({
							link: 'Auth/Login',
							lang: 'en',
							setSubmittedSuccessfully: setSubmittedSuccessfully,
							setErrorMsg: setErrorMsg,
							setLoading: setLoading,
							data: vals,
							setData: setData
						});
					}}
					validationSchema={loginSchema}
				>
					<Form className="flex flex-col my-4 w-full">
						<Text name="email" label="Email" autoComplete="email" />
						<Text
							name="password"
							label="Password"
							type="password"
							autoComplete="current-password"
						/>
						<button
							onClick={() => setCurrentModal('resetPassword')}
							className="text-xs self-start -mt-3 font-bold text-black/50 hover:underline"
						>
							Forget password?
						</button>
						<button
							disabled={loading}
							type="submit"
							className="bg-orange-500 mt-3 text-white py-3 rounded-lg capitalize flex items-center justify-center"
						>
							{loading ? <Loader2 className="animate-spin" /> : 'Login'}
						</button>
					</Form>
				</Formik>
				{/* {accountCreated && !accountVerified && (
					<bdi dir="ltr" className="my-4">
						<VerificationInput
							autoFocus
							classNames={{
								character:
									'w-full flex items-center justify-center character rounded-lg border border-orange-500',
								characterInactive: 'character--inactive',
								characterSelected: ' outline-orange-500 text-orange-500 font-bold'
							}}
							onComplete={() => setAccountVerified(true)}
						/>
					</bdi>
				)} */}
			</div>
		</div>
	);
}

export default Login;

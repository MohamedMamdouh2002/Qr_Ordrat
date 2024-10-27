'use client';
import React, { useContext, useEffect, useState } from 'react';
import Logo from '@public/assets/karam-el-sham.png';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import {useFormik}  from 'formik';
// import Phone from '../../common/inputs/phone';
import Text from '../ui/Text/index';
import { loginInitialValues, useLoginValidation } from '../forms/LoginSchema';
import handleSubmit from '../fetch/handleSubmit';
import { Loader, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Input } from 'rizzui';
import * as yup from 'yup';

import { shopId } from '@/config/shopId';
import { API_BASE_URL } from '@/config/base-url';
import { method } from 'lodash';
import { useUserContext } from '../context/UserContext';
import Phone from '../ui/inputs/phone';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useTranslation } from '@/app/i18n/client';
// import { SessionContext } from '@/utils/contexts';

type Props = {
	onLogin?: () => void;
	setCurrentModal: (val: 'login' | 'register' | 'resetPassword') => void;
};

function Login({ onLogin, setCurrentModal }: Props,{ lang }: { lang?: string }) {
	const { t } = useTranslation(lang!, 'nav');

	const{accessToken ,setAccessToken ,token ,setToken}=useUserContext()
	const [loading, setLoading] = useState(false);
	// const { setSession } = useContext(SessionContext);
	// const loginSchema = useLoginValidation({});
	// const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
	// const [errorMsg, setErrorMsg] = useState(false);
	// const [data, setData] = useState(null);
	// useEffect(() => {
	// 	if (data) {
	// 		setCookie('karam-el-sham-qr-session', data);
	// 		// setSession(data);
	// 		router.refresh();
	// 		onLogin?.();
	// 	}
	// }, [data]);
	// const [accountVerified, setAccountVerified] = useState(false);
	// useEffect(() => {
	// 	if (accountCreated && accountVerified) {
	// 		setCookie('karam-el-sham-qr-session', 'value');
	// 		router.refresh();
	// 	}
	// }, [accountCreated, accountVerified]);
	// console.log(errorMsg);
	async function sendData(values: any) {
		const jsonData = JSON.stringify(values);
		setLoading(true)

		let res = await fetch(`${API_BASE_URL}/api/Auth/Login`, {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body:jsonData, 
		});
	  
		const result = await res.json();
		setLoading(false)
		console.log("resault: " ,result);
		if (result?.refreshToken) {
			localStorage.setItem('accessToken', result?.accessToken);
			setAccessToken(result.accessToken)
			localStorage.setItem('Token', result?.refreshToken);
			localStorage.setItem('phoneNumber', result?.phoneNumber);
			// console.log("result?.refreshToken",result?.refreshToken);
			setToken(result.refreshToken)

			const userData = {
				phoneNumber: result.phoneNumber,
				firstName: result.firstName || '',
				lastName: result.lastName || '',
				email: result.email || '',
			};
			localStorage.setItem('userData', JSON.stringify(userData));
		  } else {
			console.log('Access Token not found.');
		  }
	}
	const phoneRegex = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)?[0-9]{7,8}$/;

	const validationSchema = yup.object({
		// phoneNumber: yup
		// 	.string()
		// 	.required('Phone number is required')
		// 	.test('validate phone number', 'Invalid phone number', value => {
		// 		if (value && value !== '') return isValidPhoneNumber(value);
		// 		return false;
		// 	}),
	});
	const initialValues = {
		phoneNumber:'',
		shopId:shopId,
	};

	// let formik= useFormik({
	// 	initialValues:{
	// 		phoneNumber:'',
	// 		shopId:shopId
	// 	},
	// 	validationSchema,
	// 	onSubmit:sendData
	// })
	return (
		<div className="flex flex-col gap-5">
			<div className="flex flex-col items-center justify-center">
				<Image width={60} height={60} src={Logo} alt="logo"/>
				<p className="text-sm font-light">Fried chicken, Sandwiches, Fast Food...</p>
			</div>
			<div className="flex flex-col items-center">
				{/* <h3 className="font-bold text-lg">Login</h3> */}
				{/* <button
					// onClick={() => setCurrentModal('register')}
					className="text-xs font-bold text-black/50 hover:underline"
				>
					New to ordrat? Create an account now!
				</button> */}
				{/* <Formik>
					<Form className="flex flex-col my-4 w-full">
						<Text name="email" label="Email" autoComplete="email" />
						<Text
							name="password"
							label="Password"
							type="password"
							autoComplete="current-password"
						/>
						<button
							disabled={loading}
							type="submit"
							className="bg-orange-500 mt-3 text-white py-3 rounded-lg capitalize flex items-center justify-center"
						>
							{loading ? <Loader2 className="animate-spin" /> : 'Login'}
						</button>
					</Form>
				</Formik> */}
				{/* <form className='flex flex-col' onSubmit={formik.handleSubmit}> */}
				<Formik<any>
					initialValues={initialValues}
					enableReinitialize
					validationSchema={validationSchema}
					onSubmit={async (vals, { setSubmitting }) => {
						console.log('Submitted values: ', vals);
						sendData(vals);
						setSubmitting(false);
					}}
				>
					{({ errors, values, initialValues, touched }) => {
						return (
							<Form className="flex flex-col w-full">

								{/* <label htmlFor="phone" className='font-bold mb-1'>{t('phone')}</label> */}
								<Field name="phoneNumber">
									{({ field }: any) => (
									<input
										{...field}
										type="tel"
										autoComplete="tel"
										placeholder={t('phone-ph')}
										id="phoneNumber"
										className={`rounded-md focus:border-2 focus:border-mainColor focus:outline-none ${
										errors.phoneNumber && touched.phoneNumber ? 'border-red-800' : 'border-gray-300'
										}`}
									/>
									)}
								</Field>
								{errors.phoneNumber && touched.phoneNumber && (
									<p className="text-red-500 text-xs">{errors.phoneNumber?.toString() || ''}</p>
								)}

								{/* <Phone name="phoneNumber" label="Phone Number" placeholder="Phone Number" /> */}

								{/* {formik.errors.phoneNumber&& formik.touched.phoneNumber ? */}
								{/* <p className="text-red-500 text-xs">{formik.errors.phoneNumber}</p>:"" } */}
								<button
									type="submit"
									className="bg-mainColor py-3 px-3 rounded-xl mt-4 font-bold text-base text-white flex items-center justify-center"
									disabled={loading} 
								>
									{loading ? (
										<Loader2 className="animate-spin" /> 
									) : (
										"Login"
									)}
								</button>
							{/* </form> */}
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
}

export default Login;

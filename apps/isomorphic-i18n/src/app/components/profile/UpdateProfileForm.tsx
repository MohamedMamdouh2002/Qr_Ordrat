'use client';
import Phone from '../ui/inputs/phone';
import Text from '../ui/inputs/Text';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';

import { isValidPhoneNumber } from 'react-phone-number-input';
import * as yup from 'yup';

type Props = {};

function UpdateProfileForm({}: Props) {

  const validationSchema = yup.object({
    firstName: yup.string().required('firstNameRequired'),
    lastName: yup.string().required('lastNameRequired'),
    phoneNumber: yup
      .string()
      .required('phoneRequired')
      .test('validate phone number', 'phoneInvalid', value => {
        if (value && value !== '') return isValidPhoneNumber(value);
        return value === undefined;
      }),
	});

	const initialValues = {
		firstName: '',
		lastName: '',
		phoneNumber: '',
	};
	return (
		<Formik<any>
			initialValues={initialValues}
			enableReinitialize
			validationSchema={validationSchema}
			onSubmit={vals => {
				console.log("values: ",vals);
			}}
		>
			{({ errors, values, initialValues }) => {
				return (
					<Form className="grid md:grid-cols-2 grid-cols-1 gap-2">
						<Text name="firstName" label="First Name" placeholder="First Name" />
						<Text name="lastName" label="Last Name" placeholder="Last Name" />
						<Phone name="phoneNumber" label="Phone Number" placeholder="Phone Number" />
						<span className="mobile:hidden"></span>
						<button
							disabled={
								values.firstName === initialValues.firstName &&
								values.lastName === initialValues.lastName &&
								values.phoneNumber === initialValues.phoneNumber
							}
							className="mt-2 md:mt-5 md:col-span-1 col-span-full w-40 mx-auto md:mx-0 md:ms-auto px-8 py-2 text-slate-50 border border-transparent hover:border-mainColor bg-mainColor hover:text-mainColor hover:bg-transparent transition duration-150 rounded-lg disabled:bg-black/50 disabled:text-white disabled:border-none"
							type="reset"
						>
							Reset
						</button>
						<button
							disabled={
								(values.firstName === initialValues.firstName &&
									values.lastName === initialValues.lastName &&
									values.phoneNumber === initialValues.phoneNumber) ||
								errors.phoneNumber != undefined ||
								errors.firstName != undefined ||
								errors.lastName != undefined
							}
							className="mt-2 md:mt-5 md:col-span-1 col-span-full w-40 mx-auto md:mx-0 px-8 py-2 border border-transparent hover:border-mainColor text-slate-50 bg-mainColor hover:text-mainColor hover:bg-transparent transition duration-150 rounded-lg disabled:bg-black/50 disabled:text-white disabled:border-none"
							type="submit"
						>
							Save
						</button>
					</Form>
				);
			}}
		</Formik>
	);
}

export default UpdateProfileForm;

import React from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import FormikInput from '../../hoc/layout/FormikInput';

export default function Phone({
	name,
	label,
	placeholder,
	required,
	...props
}: {
	name: string;
	label: string;
	placeholder?: string;
	required?: boolean;
	props?: any[];
}) {
	return (
		<FormikInput
			name={name}
			label={label}
			placeholder={placeholder} 
			InputComponent={MyPhoneInput}
			required={required}
			{...props}
		/>
	);
}

const MyPhoneInput = ({
	id,
	value,
	placeholder,
	handleOnChange,
	handleOnBlur,
	...props
}: {
	id: string;
	value: string;
	placeholder?: string;
	handleOnChange: (val: any) => void;
	handleOnBlur: () => void;
	readOnly?: boolean;
	defaultCountry?: 'EG';
	props?: any[];
}) => {
	return (
		<PhoneInput
			readOnly={props.readOnly}
			countryCallingCodeEditable={false}
			className={
				'bg-white w-full p-3 rounded-lg outline-0 border px-3 py-2 focus-within:border-dotted focus-within:border-orange-500  focus-within:outline-none disabled:text-stone-400'
			}
			defaultCountry={props.defaultCountry || 'EG'}
			value={value}
			numberInputProps={{
				className: 'w-full bg-transparent border-none rounded-none p-0 text-base leading-normal shadow-none focus-within:outline-none focus:ring-0 focus:border-none placeholder:text-black/50',
				placeholder: placeholder,
			}}
			onChange={handleOnChange}
			onBlur={handleOnBlur}
			{...props}
		/>
	);
};

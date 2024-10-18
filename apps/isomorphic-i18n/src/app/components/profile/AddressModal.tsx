'use client';
import { Dialog, RadioGroup } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Form, Formik } from 'formik';
import { BriefcaseBusiness, Building, Home, PenBox, PlusCircle, XOctagon } from 'lucide-react';
import useAddressValidation from '../ui/forms/AddressSchema';
import Text from '../ui/inputs/Text';
import Phone from '../ui/inputs/phone';
import LocationPicker from '../ui/inputs/map/LocationPicker';

export default function AddressModal({
	isOpen,
	setIsOpen,
	address
}: {
	isOpen: boolean;
	setIsOpen: (state: boolean) => void;
	address?: Partial<any>;
}) {
	const [schema, initialValues] = useAddressValidation();
	const addressTypes = [
		{
			name: 'apartment',
			icon: Building
		},
		{
			name: 'home',
			icon: Home
		},
		{
			name: 'office',
			icon: BriefcaseBusiness
		}
	];
	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-[999]">
			<div
				className="fixed inset-0 bg-black/30 backdrop-blur-md w-screen pb-10 overflow-y-auto overflow-x-hidden p-4"
				aria-hidden="true"
			>
				<div className="flex min-h-full items-center justify-center">
					<motion.div
						initial={{ y: 25, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 25, opacity: 0 }}
						className="inset-0 flex w-screen items-center justify-center p-4"
					>
						<Dialog.Panel className="bg-stone-100  border rounded-lg p-4 pr-1 md:pr-4">
							<Dialog.Title
								className={`text-2xl font-bold text-heaader pb-4 border-b font-header flex items-center gap-3`}
							>
								{address ? (
									<>
										<PenBox className="text-mainColor mt-1" />
										Edit Address
									</>
								) : (
									<>
										<PlusCircle className="text-mainColor  mt-1" />
										New Address
									</>
								)}
							</Dialog.Title>
							<Formik<any>
								initialValues={initialValues}
								enableReinitialize
								validationSchema={schema}
								onSubmit={vals => {
									// if(address){
									//   updateAddress.mutate({id:address.id!, vals:vals})
									// }else{
									//   postAddress.mutate({vals:vals})
									// }
									console.log("vals: ",vals);

									setIsOpen(false);
								}}
							>
								{({ errors, touched, values, setFieldValue, initialValues, isValid }) => {
									return (
										
										<Form className="flex flex-col mt-6">
											<div className="grid md:grid-cols-2 grid-cols-1 gap-4 max-h-[60vh] md:max-h-full overflow-y-auto scrollable">
												<div className="flex flex-col gap-5  mr-1 md:mr-0">
													{/* <MapPicker /> */}
													<LocationPicker
														onLocationChange={vals => {
															setFieldValue('lat', vals?.lat);
															setFieldValue('lng', vals?.lng);
														}}
														initialLocation = {{ lat: 30.023173855111207, lng: 31.185028997638923 }}
													/>
													<RadioGroup
													value={values['type']}
													onChange={(val) => setFieldValue('type', val.name)}
													className={'flex mobile:flex-col gap-2 col-span-full'}
													>
													{addressTypes.map((a, i) => (
														<RadioGroup.Option key={i} value={a} className="flex gap-3">
														{({ checked }) => (
															<span
															className={`px-3 py-2 flex items-center gap-2 w-full capitalize cursor-pointer rounded-lg transition duration-150 ${
																checked ? 'bg-mainColor text-white' : 'hover:bg-mainColor/20'
															}`}
															>
															<a.icon />
															{a.name}
															</span>
														)}
														</RadioGroup.Option>
													))}
													</RadioGroup>
												</div>
												<div className="grid sm:grid-cols-2 grid-cols-1 gap-x-3  mr-1 md:mr-0">
													<Text name="aptNo" label="apt no." placeholder='apt no.' required={true} />
													<Text name="floor" label="floor" placeholder='Floor Number' type="number" min="1" />
													<Text name="street" label="street" placeholder='Street' required={true} />
													<Phone name="phoneNumber" label="Phone Number" placeholder='Phone Number' required={true} />
													<div className="col-span-full">
														<Text
															name="additionalDirections"
															label="additional directions"
															placeholder='more information'
															IsTextarea={true}
														/>
													</div>
												</div>
											</div>
											<div className="flex items-center justify-center mt-5 gap-5">
												<button
													className="px-8 py-2 text-slate-50 bg-mainColor border border-transparent hover:border-mainColor hover:text-mainColor hover:bg-transparent transition duration-150 rounded-lg disabled:bg-black/50 disabled:text-white disabled:border-none"
													type="reset"
													onClick={() => {
														setIsOpen(false);
													}}
												>
													Cancel
												</button>
												<button
													disabled={!isValid}
													className="px-8 py-2 text-slate-50 bg-mainColor border border-transparent hover:border-mainColor hover:text-mainColor hover:bg-transparent transition duration-150 rounded-lg disabled:bg-black/50 disabled:text-white disabled:border-none"
													type="submit"
												>
													Save
												</button>
											</div>
										</Form>
									);
								}}
							</Formik>
						</Dialog.Panel>
					</motion.div>
				</div>
			</div>
		</Dialog>
	);
}

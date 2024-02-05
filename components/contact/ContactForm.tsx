'use client';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { AlertMessage } from '@/model';
import { sendEmail } from '@/actions';

const Alert = dynamic(() => import('@/components/Alert'), { ssr: false });

interface Props {
	formIntro: string;
	buttonText: string;
}

export const ContactForm: React.FC<Props> = ({ formIntro, buttonText }) => {
	//
	const [alert, setAlert] = React.useState<AlertMessage | null>(null);

	const sendEmailData = React.useCallback(async (formData: FormData) => {
		const response = await sendEmail(formData);
		if (response) {
			setAlert(response);
		}
	}, []);

	const handleOnChange = React.useCallback(() => {
		alert && setAlert(null);
	}, [alert]);

	return (
		<form noValidate action={sendEmailData}>
			<div className="rich-text-block">{formIntro}</div>
			<div className="field">
				<label htmlFor="name">Naam:</label>
				<input name="name" id="name" type="text" placeholder="Naam" onChange={handleOnChange} />
			</div>
			<div className="field">
				<label htmlFor="email">Email:</label>
				<input name="email" id="email" type="email" placeholder="Email" onChange={handleOnChange} />
			</div>
			<div className="field">
				<label htmlFor="message">Bericht:</label>
				<textarea name="message" id="message" placeholder="Bericht" onChange={handleOnChange} />
			</div>
			{alert && <Alert {...alert} />}
			<div className="submit-button">
				<button type="submit">{buttonText}</button>
			</div>
		</form>
	);
};

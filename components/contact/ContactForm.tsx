'use client';
import dynamic from 'next/dynamic';
import { useFormStatus } from 'react-dom';
import * as React from 'react';
import { AlertMessage } from '@/model';
import { sendEmail } from '@/actions';
import { validateContactForm } from '@/lib';

const Alert = dynamic(() => import('@/components/Alert'), { ssr: false });

interface Props {
	formIntro: string;
	buttonText: string;
}

export const ContactForm: React.FC<Props> = ({ formIntro, buttonText }) => {
	//
	const formRef = React.useRef<HTMLFormElement>(null);
	const [alert, setAlert] = React.useState<AlertMessage | null>(null);
	const { pending } = useFormStatus();

	const sendEmailData = React.useCallback(async (formData: FormData) => {
		// client side validation
		let alertMessage = validateContactForm(formData);
		if (alertMessage.type === 'error') {
			setAlert(alertMessage);
			return null;
		}
		// server side validation
		alertMessage = await sendEmail(formData);
		setAlert(alertMessage);
		if (alertMessage.type === 'success') {
			formRef.current?.reset();
		}
	}, []);

	const handleOnChange = React.useCallback(() => {
		alert && setAlert(null);
	}, [alert]);

	return (
		<form ref={formRef} action={sendEmailData} noValidate>
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
				<button type="submit" disabled={pending || !!alert}>
					{buttonText}
				</button>
			</div>
		</form>
	);
};

'use client';
import ReCAPTCHA from 'react-google-recaptcha';
import dynamic from 'next/dynamic';
import { useFormStatus } from 'react-dom';
import * as React from 'react';
import { AlertMessage } from '@/model';
import { sendEmail, verifyCaptcha } from '@/actions';
import { validateContactForm } from '@/lib';

const Alert = dynamic(() => import('@/components/Alert'), { ssr: false });

interface Props {
	formIntro: string;
	buttonText: string;
}

export const ContactForm: React.FC<Props> = ({ formIntro, buttonText }) => {
	//
	const formRef = React.useRef<HTMLFormElement>(null);
	const recaptchaRef = React.useRef<ReCAPTCHA>(null);
	const [isVerified, setIsverified] = React.useState<boolean>(false);
	const [alert, setAlert] = React.useState<AlertMessage | null>(null);
	const { pending } = useFormStatus();

	const handleCaptchaSubmission = React.useCallback(async (token: string | null) => {
		// server side validation to verify captcha
		const alertMessage = await verifyCaptcha(token);
		if (alertMessage.type === 'error') {
			setAlert(alertMessage);
			setIsverified(false);
			return null;
		}
		setIsverified(true);
	}, []);

	const handleFormSubmission = React.useCallback(async (formData: FormData) => {
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

	const recaptchaSitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

	const disableSubmitButton = React.useMemo(() => {
		return pending || !!alert || !isVerified;
	}, [pending, alert, isVerified]);

	return (
		<form ref={formRef} action={handleFormSubmission} noValidate>
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
			{recaptchaSitekey && (
				<ReCAPTCHA
					className="recaptcha"
					sitekey={recaptchaSitekey!}
					ref={recaptchaRef}
					onChange={handleCaptchaSubmission}
				/>
			)}
			{alert && <Alert {...alert} />}
			{recaptchaSitekey && (
				<button className="button" type="submit" disabled={disableSubmitButton}>
					{buttonText}
				</button>
			)}
		</form>
	);
};

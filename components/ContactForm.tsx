'use client';
import emailjs from 'emailjs-com';
import dynamic from 'next/dynamic';
import { useFormStatus } from 'react-dom';
import * as React from 'react';
import { AlertMessage, AlertMessageType } from '@/model';
import { validateContactForm } from '@/lib';
import { useSearchParams } from 'next/navigation';
import { Button } from './Button';

const Alert = dynamic(() => import('@/components/Alert'), { ssr: false });

const formId = '#form';

function prefabMessage(subject: string): string {
	return `Hallo Wiebe,\nIk heb een vraag over "${subject}"...`.trim();
}
interface Props {
	formIntro: string;
	buttonText: string;
}

export const ContactForm: React.FC<Props> = ({ formIntro, buttonText }) => {
	//
	const formRef = React.useRef<HTMLFormElement>(null);
	const [message, setMessage] = React.useState<string>('');
	const [alert, setAlert] = React.useState<AlertMessage | null>(null);
	const { pending } = useFormStatus();
	const searchParams = useSearchParams();

	React.useEffect(() => {
		if (searchParams.has('subject')) {
			const subject = searchParams.get('subject');
			subject && setMessage(prefabMessage(subject));
		}
	}, [searchParams, formRef]);

	const scrollFormIntoView = React.useCallback(() => {
		formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}, [formRef]);

	const onClickHandler = React.useCallback(
		(e: Event) => {
			e.preventDefault();
			scrollFormIntoView();
		},
		[scrollFormIntoView]
	);

	React.useEffect(() => {
		if (window.location.hash === formId) {
			scrollFormIntoView();
		}
	}, [scrollFormIntoView]);

	React.useEffect(() => {
		const trigger = document.querySelector(`a[href="${formId}"`);
		if (trigger) {
			trigger.addEventListener('click', onClickHandler);
		}
		return () => {
			if (trigger) {
				trigger.addEventListener('click', onClickHandler);
			}
		};
	}, [onClickHandler]);

	const handleOnChange = React.useCallback(() => {
		alert && setAlert(null);
	}, [alert]);

	const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
		const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
		const userID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID || '';

		const formData = new FormData(formRef.current ?? undefined);

		let alertMessage = validateContactForm(formData);
		if (alertMessage.type === AlertMessageType.ERROR) {
			setAlert(alertMessage);
			return null;
		}

		if (formData.get('email') === 'test@email.com') {
			// cypress test
			setAlert({ type: AlertMessageType.SUCCESS, message: 'Bericht verstuurd. Bedankt!' });
			return null;
		}

		emailjs
			.send(
				serviceID,
				templateID,
				{
					from_name: formData.get('name'),
					from_email: formData.get('email'),
					message: formData.get('message'),
				},
				userID
			)
			.then(() => {
				setAlert({ type: AlertMessageType.SUCCESS, message: 'Bericht verstuurd. Bedankt!' });
			})
			.catch((error) => {
				setAlert({ type: AlertMessageType.ERROR, message: 'Er ging iets mis!' });
				console.error('Error sending email:', error);
			});
	}, []);

	return (
		<form id="form" ref={formRef} onSubmit={handleSubmit} noValidate>
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
				<textarea
					name="message"
					id="message"
					placeholder="Bericht"
					onChange={(e) => {
						setMessage(e.target.value);
						handleOnChange();
					}}
					value={message}
				/>
			</div>
			{alert && <Alert {...alert} />}
			<Button type="submit" disabled={pending || !!alert}>
				{buttonText}
			</Button>
		</form>
	);
};

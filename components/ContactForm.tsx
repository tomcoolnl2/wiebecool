'use client';
import dynamic from 'next/dynamic';
import { useFormStatus } from 'react-dom';
import * as React from 'react';
import { AlertMessage } from '@/model';
import { sendEmail } from '@/actions';
import { validateContactForm } from '@/lib';
import { useSearchParams } from 'next/navigation';

const Alert = dynamic(() => import('@/components/Alert'), { ssr: false });

const formId = '#form';

function prefabMessage(subject: string): string {
	return `Hallo Wiebe,\nIk heb een vraag over het beeld genaamd "${subject}"...`.trim();
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
		<form id="form" ref={formRef} action={sendEmailData} noValidate>
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
			<button className="button" type="submit" disabled={pending || !!alert}>
				{buttonText}
			</button>
		</form>
	);
};

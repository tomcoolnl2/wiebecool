'use client';
import classNames from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useFormStatus } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { AlertMessage, ContactFormInput } from '@/model';
import { sendEmail } from '@/lib';
import { Button } from './Button';
// ! TODO: Import proper errorMessages from Contentful: https://app.shortcut.com/wiebecoolnl/story/2625/contenful-config-type-for-hardcoded-values
import { mockErrorMessages as errorMessages } from '@/mock/data';

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
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ContactFormInput>({ mode: 'onBlur' });

	const formRef = React.useRef<HTMLFormElement>(null);
	const [message, setMessage] = React.useState<string>('');
	const [alert, setAlert] = React.useState<AlertMessage | null>(null);
	const { pending } = useFormStatus();
	const searchParams = useSearchParams();

	React.useEffect(() => {
		console.log(errors);
	}, [errors]);

	React.useEffect(() => {
		if (searchParams.has('subject')) {
			const subject = searchParams.get('subject');
			subject && setMessage(prefabMessage(subject));
		}
	}, [searchParams]);

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

	const handleOnSubmit: SubmitHandler<ContactFormInput> = async (data) => {
		const alert = await sendEmail(data);
		setAlert(alert);
		if (alert.type === 'success') {
			formRef.current?.reset();
		}
	};

	return (
		<form id="form" ref={formRef} onSubmit={handleSubmit(handleOnSubmit)} noValidate>
			<div className="rich-text-block">{formIntro}</div>

			<div className={classNames('field', { 'has-form-error': errors.name })}>
				<label htmlFor="name">Naam:</label>
				<input id="name" {...register('name', { required: true, minLength: 2 })} placeholder="Naam" />
				{errors.name && errors.name.type === 'required' && (
					<span role="alert" className="form-error">
						{errorMessages.required}
					</span>
				)}
				{errors.name && errors.name.type === 'minLength' && (
					<span role="alert" className="form-error">
						{errorMessages.minLength}
					</span>
				)}
			</div>

			<div className={classNames('field', { 'has-form-error': errors.email })}>
				<label htmlFor="email">Email:</label>
				<input
					{...register('email', {
						required: true,
						pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: errorMessages.email },
					})}
					placeholder="Email"
					type="email"
				/>
				{errors.email && (
					<span role="alert" className="form-error">
						{errors.email.message}
					</span>
				)}
			</div>

			<div className={classNames('field', { 'has-form-error': errors.message })}>
				<label htmlFor="message">Bericht:</label>
				<textarea
					placeholder="Bericht"
					value={message}
					{...register('message', {
						required: errorMessages.required,
						onChange: (e) => setMessage(e.target.value),
					})}
				/>
				{errors.message && <span>{errors.message.message}</span>}
			</div>

			{alert && <Alert {...alert} />}

			<Button type="submit" disabled={pending || !!alert}>
				{buttonText}
			</Button>
		</form>
	);
};

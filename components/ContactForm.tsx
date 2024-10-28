'use client';
import { useForm, SubmitHandler, set } from 'react-hook-form';
import { useFormStatus } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { AlertMessage, AlertMessageType, ContactFormInput } from '@/model';
import { sendEmail } from '@/lib';
import { Button } from './Button';
import { send } from 'emailjs-com';

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
		watch,
		formState: { errors },
	} = useForm<ContactFormInput>();
	//
	const formRef = React.useRef<HTMLFormElement>(null);
	const [message, setMessage] = React.useState<string>('');
	const [alert, setAlert] = React.useState<AlertMessage | null>(null);
	const { pending } = useFormStatus();
	const searchParams = useSearchParams();

	console.log(watch('email'));

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
	};

	return (
		<form id="form" ref={formRef} onSubmit={handleSubmit(handleOnSubmit)} noValidate>
			<div className="rich-text-block">{formIntro}</div>
			<div className="field">
				<label htmlFor="name">Naam:</label>
				<input {...register('name', { required: true })} placeholder="Naam" type="text" />
				{errors.name && <span>This field is required</span>}
			</div>
			<div className="field">
				<label htmlFor="email">Email:</label>
				<input
					{...register('email', {
						required: true,
						pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: 'invalid email address' },
					})}
					placeholder="Email"
					type="email"
				/>
				{errors.email && <span>This field is required</span>}
			</div>
			<div className="field">
				<label htmlFor="message">Bericht:</label>
				<textarea
					placeholder="Bericht"
					value={message}
					{...register('message', {
						onChange: (e) => setMessage(e.target.value),
						validate: {
							pattern: (value: string) => !/[!]/.test(value),
						},
					})}
				/>
			</div>
			{alert && <Alert {...alert} />}
			<Button type="submit" disabled={pending || !!alert}>
				{buttonText}
			</Button>
		</form>
	);
};

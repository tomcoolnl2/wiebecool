'use client';
import * as React from 'react';
import emailjs from '@emailjs/browser';

export const ContactForm: React.FC<{ buttonText: string }> = ({ buttonText }) => {
	//
	const [mailData, setMailData] = React.useState({
		name: '',
		email: '',
		message: '',
	});

	const { name, email, message } = mailData;

	const [error, setError] = React.useState<boolean | null>(null);

	const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) =>
		setMailData({ ...mailData, [e.target.name]: e.target.value });

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (name.length === 0 || email.length === 0 || message.length === 0) {
			setError(true);
			clearError();
		} else {
			emailjs
				.send(
					'service_seruhwu', // service id
					'template_21aw58z', // template id
					mailData,
					'Q3pccdLZhU-mZT7tQ' // public api
				)
				.then(
					(response) => {
						setError(false);
						clearError();
						setMailData({ name: '', email: '', message: '' });
					},
					(err) => {
						console.log(err.text);
					}
				);
		}
	};
	const clearError = () => {
		setTimeout(() => {
			setError(null);
		}, 2000);
	};

	return (
		<div className="fields w-full float-left clear-both h-auto">
			<form className="contact_form" id="contact_form" onSubmit={(e) => onSubmit(e)}>
				<div
					className={error ? 'empty_notice' : 'returnmessage'}
					style={{ display: error == null ? 'none' : 'block' }}
				>
					<span>
						{error
							? 'Please Fill Required Fields'
							: 'Your message has been received, We will contact you soon.'}
					</span>
				</div>
				<div className="first w-full float-left">
					<ul className="list-none">
						<li className="w-full mb-[30px] float-left">
							<input
								name="name"
								onChange={(e) => onChange(e)}
								value={name}
								id="name"
								type="text"
								placeholder="Name"
							/>
						</li>
						<li className="w-full mb-[30px] float-left">
							<input
								name="email"
								onChange={(e) => onChange(e)}
								value={email}
								id="email"
								type="email"
								placeholder="Email"
							/>
						</li>
					</ul>
				</div>
				<div className="last">
					<textarea
						name="message"
						onChange={(e) => onChange(e)}
						value={message}
						id="message"
						placeholder="Message"
					/>
				</div>
				<div className="submit-button" data-position="left">
					<button type="submit">{buttonText}</button>
				</div>
			</form>
		</div>
	);
};

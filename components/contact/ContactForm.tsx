import * as React from 'react';

interface Props {
	formIntro: string;
	buttonText: string;
}

export const ContactForm: React.FC<Props> = ({ formIntro, buttonText }) => {
	return (
		<form noValidate>
			<div className="rich-text-block">{formIntro}</div>
			<div className="field">
				<label htmlFor="name">Naam:</label>
				<input name="name" id="name" type="text" placeholder="Naam" />
			</div>
			<div className="field">
				<label htmlFor="email">Email:</label>
				<input name="email" id="email" type="email" placeholder="Email" />
			</div>
			<div className="field">
				<label htmlFor="message">Bericht:</label>
				<textarea name="message" id="message" placeholder="Bericht" />
			</div>
			{/* Error messages */}
			{/* Success message */}
			<div className="submit-button">
				<button type="submit">{buttonText}</button>
			</div>
		</form>
	);
};

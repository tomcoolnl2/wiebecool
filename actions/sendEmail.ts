'use server';
import { Resend } from 'resend';
import { AlertMessage } from '@/model';
import { validateContactForm } from '@/lib';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send an email using Resend API based on the provided form data.
 * @param {FormData} formData - The form data containing email, name, and message.
 * @returns {Promise<AlertMessage>} A promise resolving to an AlertMessage indicating the result of sending the email.
 */
export const sendEmail = async (formData: FormData): Promise<AlertMessage> => {
	//
	const alertMessage = validateContactForm(formData);

	if (alertMessage.type === 'error') {
		return alertMessage;
	}

	const email = formData.get('email');
	const name = formData.get('name');
	const message = formData.get('message');

	if (email !== 'test@email.com') {
		resend.emails.send({
			from: 'onboarding@resend.dev',
			to: process.env.RESEND_EMAIL as string,
			subject: `www.wiebecool.nl: ${name} just send you a message`,
			reply_to: email as string,
			text: message as string,
		});
	}

	return { type: 'success', message: 'Bericht verstuurd.' };
};

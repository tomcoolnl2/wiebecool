'use server';
import { Resend } from 'resend';
import { AlertMessage } from '@/model';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formData: FormData): Promise<AlertMessage> => {
	//
	const senderEmail = formData.get('email');
	const senderName = formData.get('name');
	const message = formData.get('message');

	if (!senderEmail || typeof senderEmail !== 'string') {
		return { type: 'error', message: 'Invalid email' };
	}

	if (!message || typeof message !== 'string' || message.length > 300) {
		return { type: 'error', message: 'Invalid message' };
	}

	resend.emails.send({
		from: 'onboarding@resend.dev',
		to: process.env.RESEND_EMAIL as string,
		subject: `wiebecool.nl: ${senderName} just send you a message`,
		reply_to: senderEmail,
		text: message,
	});

	return { type: 'success', message: 'Bericht verstuurd.' };
};

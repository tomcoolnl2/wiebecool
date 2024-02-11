'use server';
import { AlertMessage } from '@/model';

/**
 * Verify the captcha token with Google reCAPTCHA API.
 * @param {string | null} token - The captcha token to verify.
 * @returns {Promise<AlertMessage>} A promise resolving to an AlertMessage indicating the verification result.
 * @throws {Error} If captcha validation fails or an error occurs during the verification process.
 */
export async function verifyCaptcha(token: string | null): Promise<AlertMessage> {
	//
	try {
		const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;
		const response = await fetch(url, { mode: 'no-cors' });
		console.log(response.status, response.ok);
		if (response.ok) {
			return { type: 'success', message: 'Vaidation success.' };
		} else {
			return { type: 'error', message: 'Vaidation failed.' };
		}
	} catch (e: unknown) {
		return { type: 'error', message: 'Vaidation failed.' };
	}
}

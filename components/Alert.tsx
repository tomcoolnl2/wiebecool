import * as React from 'react';
import { AlertMessage } from '@/model';
import '@/css/components/alert.css';

export const Alert: React.FC<AlertMessage> = ({ type, message }) => {
	return (
		<div className={`alert ${type}`} role="alert">
			{message}
		</div>
	);
};

export default Alert;

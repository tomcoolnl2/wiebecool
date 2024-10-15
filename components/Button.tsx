'use client';
import * as React from 'react';

export interface Props {
	type?: HTMLButtonElement['type'];
	centered?: boolean;
	disabled?: boolean;
	children: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Button: React.FC<Props> = ({ type = 'button', centered, disabled, children, onClick }) => {
	return (
		<button
			type={type}
			className={`button${centered ? ' mx-auto' : ''}`}
			onClick={onClick || undefined}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

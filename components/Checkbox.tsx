'use client';
import * as React from 'react';

export interface Props {
	size?: 'small' | 'medium' | 'large';
	checked?: boolean;
	disabled?: boolean;
	onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export const Checkbox: React.FC<Props> = ({ size = 'small', checked, disabled, onChange }) => {
	const [state, setState] = React.useState<boolean>(checked || false);

	const handleOnChange = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setState(event.target.checked);
			onChange?.(event);
		},
		[state]
	);

	return (
		<label className={`checkbox ${size}`}>
			<input type="checkbox" checked={state} disabled={disabled} onChange={handleOnChange} />
			<span className="checkbox-control" />
		</label>
	);
};

import * as React from 'react';
import { AppContext } from '@/context/Context';
import { useClickOutside } from '@/hooks/useClickOutside';

export interface ModalContainerProps<T> {
	children: React.ReactNode;
	nullValue: (arg: T) => void;
}

export const ModalContainer = <T,>({ children, nullValue }: ModalContainerProps<T | null>) => {
	//
	const { modalToggle } = React.useContext(AppContext);

	const domNode: React.RefObject<HTMLDivElement> = useClickOutside(() => {
		modalToggle(false);
		nullValue(null);
	});

	return (
		<div className="modalbox opened">
			<div className="box_inner" ref={domNode}>
				<div className="close">
					<a
						href="#"
						onClick={() => {
							modalToggle(false);
							nullValue(null);
						}}
					>
						<i className="icon-cancel" />
					</a>
				</div>
				<div className="description_wrap">{children}</div>
			</div>
		</div>
	);
};

import Link from 'next/link';
import * as React from 'react';

interface Props {
	mobileNavigationIsOpen: boolean;
	openMobileNavigation: (value: boolean) => void;
}

export const TopBar: React.FC<Props> = ({ mobileNavigationIsOpen, openMobileNavigation }) => {
	//

	return (
		<header className="top-bar">
			<div className="logo">
				{' '}
				<Link href="/" role="link">
					<h1 className="visually-hidden">Wiebe Cool</h1>
					<h2 className="font-poppins font-black text-[22px] tracking-[5px]">BEELDHOUWER</h2>
				</Link>
			</div>
			<div
				className={`cursor-pointer hamburger--slider hamburger${mobileNavigationIsOpen ? ' is-active' : ''}`}
				onClick={() => openMobileNavigation(!mobileNavigationIsOpen)}
			>
				<div className="hamburger-box w-[30px]">
					<div className="hamburger-inner" />
				</div>
			</div>
		</header>
	);
};

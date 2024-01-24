import { usePathname } from 'next/navigation';
import * as React from 'react';
import { MenuItem } from '@/model';

export const Mobile: React.FC<{ menuItems: MenuItem[] }> = ({ menuItems }) => {
	//
	const pathname = usePathname();
	const [toggle, setToggle] = React.useState(false);

	return (
		<>
			<div className="tokyo_tm_topbar bg-white fixed top-0 left-0 right-0 h-[50px] z-[14] hidden">
				<div className="topbar_inner w-full h-full clear-both flex items-center justify-between py-0 px-[20px]">
					<div className="logo" data-type="image">
						{' '}
						<a href="/">
							<h3 className="font-black font-poppins text-[22px] tracking-[4px]">BEELDHOUWER</h3>
							<i className="icon-home-1" />
						</a>
					</div>

					<div className="trigger relative top-[5px]">
						<div
							className={`cursor-pointer hamburger hamburger--slider ${toggle ? 'is-active' : ''}`}
							onClick={() => setToggle(!toggle)}
						>
							<div className="hamburger-box w-[30px]">
								<div className="hamburger-inner" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className={`tokyo_tm_mobile_menu fixed top-[50px] right-[-200px] h-[100vh] w-[200px] z-[15] bg-white transition-all duration-300 ${
					toggle ? 'opened' : ''
				}`}
			>
				<div className="menu_list w-full h-auto clear-both float-left text-right px-[20px] pt-[100px] pb-[0px]">
					<ul className="list-none">
						{menuItems.map((menu) => (
							<li className={`${menu.href === pathname ? 'active' : ''} mb-[7px]`} key={menu.id}>
								<a
									className="text-black font-montserrat"
									href={menu.href}
									onClick={() => {
										setToggle(!toggle);
									}}
								>
									{menu.name}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};

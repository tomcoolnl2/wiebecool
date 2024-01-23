'use client';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import Link from 'next/link';
import { MenuItem } from '@/model';
import { SocialMediaLinks } from '../components/SocialMediaLinks';

export const Sidebar: React.FC<{ menuItems: MenuItem[] }> = ({ menuItems }) => {
	//
	const pathname = usePathname();

	return (
		<aside className="leftpart w-[450px] h-[100vh] fixed flex items-center z-[12] px-[100px] py-[0px] bg-white">
			<div className="leftpart_inner w-full h-auto">
				{/* You can use image or text as logo. data-type values are: "image" and "text" */}
				<div className="logo" data-type="text">
					{' '}
					<a href="/" role="link">
						<h3 className="font-poppins font-black text-[22px] tracking-[5px]">BEELDHOUWER</h3>
					</a>
				</div>
				<nav className="menu px-[0px] py-[50px] w-full float-left" role="navigation">
					<ul className="transition_link m-0 list-none">
						{menuItems.map((menu) => (
							<li
								className={`m-0 w-full float-left ${menu.href === pathname ? 'active' : ''}`}
								key={menu.id}
							>
								<Link
									className="text-[#767676] capitalize inline-block font-medium font-montserrat transition-all duration-300 hover:text-black"
									href={menu.href}
									role="link"
								>
									{menu.name}
								</Link>
							</li>
						))}
					</ul>
				</nav>
				<SocialMediaLinks size={11} />
				<div className="copyright w-full float-left">
					<p className="text-[12px] text-[#999] font-montserrat leading-[25px]">
						© {new Date().getFullYear()}
					</p>
				</div>
			</div>
		</aside>
	);
};

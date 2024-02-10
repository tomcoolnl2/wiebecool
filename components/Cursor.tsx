/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import * as React from 'react';
import { useDetectMobile } from '@/hooks';

interface CursorPosition {
	x: number;
	y: number;
}

export const Cursor: React.FC = () => {
	//
	const isMobile = useDetectMobile();
	const cursorOuter = React.useRef<HTMLDivElement>(null);
	const cursorInner = React.useRef<HTMLDivElement>(null);
	const [cursorPosition, setCursorPosition] = React.useState<CursorPosition>({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = React.useState<boolean>(false);

	const transform = React.useMemo(() => {
		return `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`;
	}, [cursorPosition]);

	const hoverClassName = React.useMemo(() => {
		return isHovered ? ' cursor-hover' : '';
	}, [isHovered]);

	const handleMouseMove = React.useCallback((e: MouseEvent) => {
		setCursorPosition({ x: e.clientX, y: e.clientY });
	}, []);

	React.useEffect(() => {
		//
		if (isMobile || !cursorInner.current || !cursorOuter.current) {
			return;
		}

		window.addEventListener('mousemove', handleMouseMove);

		const links = document.querySelectorAll('a');
		const pointers = document.querySelectorAll('.cursor-pointer');
		const triggers = [...links, ...pointers];

		const handleMouseEnter = () => setIsHovered(true);
		const handleMouseLeave = () => setIsHovered(false);

		triggers.forEach((trigger) => {
			trigger.addEventListener('mouseenter', handleMouseEnter);
			trigger.addEventListener('mouseleave', handleMouseLeave);
		});

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			triggers.forEach((trigger) => {
				trigger.removeEventListener('mouseenter', handleMouseEnter);
				trigger.removeEventListener('mouseleave', handleMouseLeave);
			});
		};
	}, [isMobile, cursorInner, cursorOuter, handleMouseMove]);

	return (
		!isMobile && (
			<>
				<div ref={cursorOuter} className={`mouse-cursor cursor-outer${hoverClassName}`} style={{ transform }} />
				<div ref={cursorInner} className={`mouse-cursor cursor-inner${hoverClassName}`} style={{ transform }} />
			</>
		)
	);
};

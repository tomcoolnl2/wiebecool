import * as React from 'react';
import { Portal } from './hoc/Portal';

interface CursorPosition {
	x: number;
	y: number;
}

export const Cursor: React.FC = () => {
	//
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
		//console.log('handleMouseMove');
		setCursorPosition({ x: e.clientX, y: e.clientY });
	}, []);

	React.useEffect(() => {
		//
		console.log('ursorInner.current', cursorInner);
		if (!cursorInner.current || !cursorOuter.current) {
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
	}, [cursorInner.current, cursorOuter.current]);

	return (
		<>
			<div ref={cursorOuter} className={`mouse-cursor cursor-outer${hoverClassName}`} style={{ transform }} />
			<div ref={cursorInner} className={`mouse-cursor cursor-inner${hoverClassName}`} style={{ transform }} />
		</>
	);
};

'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
	children: React.ReactNode;
}

const variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

const transition = {
	delay: 1,
	ease: 'linear',
	duration: 0.5,
};

export const CardMotion: React.FC<Props> = ({ children }) => {
	return (
		<motion.div
			variants={variants}
			initial="hidden"
			animate="visible"
			transition={transition}
			viewport={{ amount: 0 }}
		>
			{children}
		</motion.div>
	);
};

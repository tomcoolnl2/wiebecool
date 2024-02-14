'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
	delay: number;
	card: React.ReactNode;
}

const variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};

const transition = {
	ease: 'linear',
	duration: 0.5,
};

export const CardMotion: React.FC<Props> = ({ delay, card }) => {
	return (
		<motion.div
			variants={variants}
			initial="hidden"
			animate="visible"
			transition={{ ...transition, delay }}
			viewport={{ amount: 0 }}
		>
			{card}
		</motion.div>
	);
};

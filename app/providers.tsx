'use client';
import * as React from 'react';
import { AppProvider } from '@/context/Context';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <AppProvider>{children}</AppProvider>;
};
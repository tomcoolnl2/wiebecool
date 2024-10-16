import { notFound } from 'next/navigation';

export const useFetchData = async <T>(fetcher: () => Promise<T>): Promise<T> => {
	try {
		const data = await fetcher();
		return data;
	} catch (error) {
		notFound();
	}
};

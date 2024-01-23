'use client';
import * as React from 'react';
import { ActionType, PortfolioItem, Product, State, StateAction } from '@/model';

const initialState: State = {
	animation: 'fadeInLeft',
	modal: false,
	productModal: null,
	portfolioDetailsModal: null,
	modalToggle: () => void 0,
	setProductModal: () => void 0,
	setPortfolioDetailsModal: () => void 0,
};

const AppContext = React.createContext<State>(initialState);

const reducer = (state: State, action: StateAction): State => {
	const { type, payload } = action;
	switch (type) {
		case ActionType.MODAL:
			return {
				...state,
				modal: payload,
			};
		case ActionType.NEWSMODAL:
			return {
				...state,
				productModal: payload,
			};
		case ActionType.PORTFOLIODETAILSMODAL:
			return {
				...state,
				portfolioDetailsModal: payload,
			};
		default:
			return state;
	}
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	//
	const [state, dispatch] = React.useReducer(reducer, initialState);

	const modalToggle = React.useCallback((value: boolean) => {
		dispatch({
			type: ActionType.MODAL,
			payload: value,
		});
	}, []);

	const setProductModal = React.useCallback((value: Product | null) => {
		modalToggle(true);
		dispatch({
			type: ActionType.NEWSMODAL,
			payload: value,
		});
	}, []);

	const setPortfolioDetailsModal = React.useCallback((value: PortfolioItem | null) => {
		modalToggle(true);
		dispatch({
			type: ActionType.PORTFOLIODETAILSMODAL,
			payload: value,
		});
	}, []);

	const { animation, modal, productModal, portfolioDetailsModal } = React.useMemo(() => ({ ...state }), [state]);

	return (
		<AppContext.Provider
			value={{
				animation,
				modal,
				modalToggle,
				productModal,
				setProductModal,
				portfolioDetailsModal,
				setPortfolioDetailsModal,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext };

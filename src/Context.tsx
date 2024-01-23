import * as React from 'react';
import { ActionType, PortfolioItem, Product, ServiceModal, State, StateAction } from './model';

// Initial Value
const initialState: State = {
	nav: 'home',
	animation: 'fadeInLeft',
	modal: false,
	serviceModal: null,
	productModal: null,
	portfolioDetailsModal: null,
	menus: [
		{ id: 1, name: 'Home', href: 'home' },
		{ id: 2, name: 'Missie', href: 'about' },
		// { id: 3, name: 'service', href: 'service' },
		{ id: 4, name: 'Werk', href: 'portfolio' },
		// { id: 5, name: 'News', href: 'news' },
		{ id: 6, name: 'Contact', href: 'contact' },
	],
	navChange: () => void 0,
	animationChange: () => void 0,
	setServiceModal: () => void 0,
	modalToggle: () => void 0,
	setProductModal: () => void 0,
	setPortfolioDetailsModal: () => void 0,
};

const AppContext = React.createContext<State>(initialState);

// Reducer
const reducer = (state: State, action: StateAction): State => {
	const { type, payload } = action;
	switch (type) {
		case ActionType.NAV:
			return {
				...state,
				nav: payload,
			};
		case ActionType.ANIMATION:
			return {
				...state,
				animation: payload,
			};
		case ActionType.MODAL:
			return {
				...state,
				modal: payload,
			};
		case ActionType.SERVICEMODAL:
			return {
				...state,
				serviceModal: payload,
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

export const AppProvider = ({ children }) => {
	//
	const [state, dispatch] = React.useReducer(reducer, initialState);

	const navChange = React.useCallback((value: string) => {
		dispatch({
			type: ActionType.NAV,
			payload: value,
		});
	}, []);

	const animationChange = React.useCallback((value: string) => {
		dispatch({
			type: ActionType.ANIMATION,
			payload: value,
		});
	}, []);

	const modalToggle = React.useCallback((value: boolean) => {
		dispatch({
			type: ActionType.MODAL,
			payload: value,
		});
	}, []);

	const setServiceModal = React.useCallback((value: ServiceModal | null) => {
		dispatch({
			type: ActionType.SERVICEMODAL,
			payload: value,
		});
	}, []);

	const setProductModal = React.useCallback((value: Product | null) => {
		dispatch({
			type: ActionType.NEWSMODAL,
			payload: value,
		});
	}, []);

	const setPortfolioDetailsModal = React.useCallback((value: PortfolioItem | null) => {
		dispatch({
			type: ActionType.PORTFOLIODETAILSMODAL,
			payload: value,
		});
	}, []);

	const { nav, animation, modal, serviceModal, productModal, portfolioDetailsModal, menus } = React.useMemo(
		() => ({ ...state }),
		[state]
	);

	return (
		<AppContext.Provider
			value={{
				menus,
				nav,
				navChange,
				animation,
				animationChange,
				modal,
				modalToggle,
				serviceModal,
				setServiceModal,
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

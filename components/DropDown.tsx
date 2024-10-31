'use client';
import React from 'react';
import Link from 'next/link';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OrderType } from '@/model';
import { useClickOutside } from '@/hooks';
import '@/css/components/dropdown.css';

interface DropDownOption {
	name: string;
	value: OrderType;
}

const dateSortingOptions: DropDownOption[] = [
	{ name: 'Nieuwste', value: OrderType.PUBLISHED_FIRST_DESC },
	{ name: 'Oudste', value: OrderType.PUBLISHED_FIRST_ASC },
];

const nameSortingOptions: DropDownOption[] = [
	{ name: 'A-Z', value: OrderType.PAGE_TITLE_ASC },
	{ name: 'Z-A', value: OrderType.PAGE_TITLE_DESC },
];

const allSortingOptions: DropDownOption[] = [...dateSortingOptions, ...nameSortingOptions];

export const DropDown: React.FC<{ order: OrderType | null }> = ({ order }) => {
	//
	const [sortOrderOption, setSortOrderOption] = React.useState<DropDownOption>(dateSortingOptions[0]);
	const [dropDownIsOpen, setDropDownIsOpen] = React.useState<boolean>(false);

	const closeDropDown = React.useCallback(() => {
		setDropDownIsOpen(false);
	}, []);

	const toggleDropDown = React.useCallback(() => {
		setDropDownIsOpen(!dropDownIsOpen);
	}, [dropDownIsOpen]);

	React.useEffect(() => {
		if (order) {
			const sortingOrder = allSortingOptions.find((option) => option.value === order);
			if (sortingOrder) {
				setSortOrderOption(sortingOrder);
			}
		} else {
			setSortOrderOption(dateSortingOptions[0]);
		}
	}, [order]);

	const listRef = React.useRef<HTMLDivElement>(null);
	const element = useClickOutside<HTMLDivElement>(listRef, closeDropDown);

	return (
		<div className="dropdown">
			<label className="dropdown-label">Sorteren:</label>
			<button
				id="menu-button"
				type="button"
				className="dropdown-trigger cursor-pointer"
				aria-expanded={dropDownIsOpen}
				aria-haspopup="true"
				onClick={toggleDropDown}
			>
				{sortOrderOption.name}
				<FontAwesomeIcon icon={faChevronDown} size="xs" />
			</button>
			<div
				ref={listRef}
				className={`${dropDownIsOpen ? 'block' : 'hidden'} dropdown-list`}
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="menu-button"
				tabIndex={-1}
			>
				{[dateSortingOptions, nameSortingOptions].map((list, i) => (
					<div key={`list-${i}`} className="py-1" role="none">
						{list.map(({ name, value }) => (
							<Link key={name} href={`?${new URLSearchParams({ order: value })}`} role="menuitem" tabIndex={-1} onClick={closeDropDown}>
								{name}
							</Link>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

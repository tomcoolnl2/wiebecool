'use client';
import React from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@/css/components/dropdown.css';
import { SortOrder } from '@/model';
import { useClickOutside } from '@/hooks';

interface DropDownOption {
	name: string;
	value: SortOrder;
}

const dateSorting = [
	{ name: 'Oudste', value: SortOrder.PUBLISHED_FIRST_ASC },
	{ name: 'Nieuwste', value: SortOrder.PUBLISHED_FIRST_DESC },
];
const nameSorting = [
	{ name: 'A-Z', value: SortOrder.PAGE_TITLE_ASC },
	{ name: 'Z-A', value: SortOrder.PAGE_TITLE_DESC },
];

export const DropDown: React.FC = () => {
	//
	const [dropDownIsOpen, setDropDownIsOpen] = React.useState<boolean>(false);
	const [sortOption, setSortOption] = React.useState<DropDownOption>(dateSorting[1]);

	const closeDropDown = React.useCallback(() => {
		setDropDownIsOpen(false);
	}, []);

	const toggleDropDown = React.useCallback(() => {
		setDropDownIsOpen(!dropDownIsOpen);
	}, [dropDownIsOpen]);

	const handleDropDownItemClick = React.useCallback(
		(value: SortOrder) => {
			const option = [...dateSorting, ...nameSorting].find((o) => o.value === value);
			if (option) {
				setSortOption(option);
			}
			closeDropDown();
		},
		[closeDropDown]
	);

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
				{sortOption.name}
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
				{[nameSorting, dateSorting].map((list, i) => (
					<div key={`list-${i}`} className="py-1" role="none">
						{list.map(({ name, value }) => (
							<a
								key={name}
								href="#"
								role="menuitem"
								tabIndex={-1}
								onClick={() => handleDropDownItemClick(value)}
							>
								{name}
							</a>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

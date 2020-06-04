import React from 'react';

const FilterPanel = ({ applyFilter, selectedInteraction }) => {
	const moreOptions = ['Physical', 'Genetic', 'Any'];
	return (
		<div className="filter-panel-root">
			<div className="title">Filter according to Interaction Type:</div>
			<div className="filter-option">
				{moreOptions.map(term => (
					<div
						className={
							selectedInteraction === term
								? 'option selected'
								: 'option not-selected'
						}
						key={term}
					>
						<input
							type="radio"
							id={term}
							value={term}
							onChange={applyFilter}
							checked={selectedInteraction === term}
						/>
						<label htmlFor={term}>{term}</label>
					</div>
				))}
			</div>
		</div>
	);
};

export default FilterPanel;

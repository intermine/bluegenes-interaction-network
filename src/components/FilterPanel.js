import React from 'react';

const FilterPanel = ({ applyFilter, selectedInteraction }) => {
	const moreOptions = ['Physical', 'Genetic', 'Any'];
	return (
		<div className="filter-panel-root">
			<div>Filter according to Interaction Type:</div>
			<div className="filter-option">
				{moreOptions.map(term => (
					<>
						<input
							type="radio"
							key={term}
							id={term}
							value={term}
							onChange={applyFilter}
							checked={selectedInteraction === term}
						/>
						<label htmlFor={term}>{term}</label>
					</>
				))}
			</div>
		</div>
	);
};

export default FilterPanel;

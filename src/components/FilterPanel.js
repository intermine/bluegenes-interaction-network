import React from 'react';

const FilterPanel = ({ applyFilter, selectedInteraction }) => {
	const moreOptions = ['Physical', 'Genetic', 'Both'];
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
						style={{
							borderBottom:
								term == 'Genetic'
									? '1.5px solid #76B3F0'
									: term == 'Physical'
									? '1.5px solid #F56139'
									: ''
						}}
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

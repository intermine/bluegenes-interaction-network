function getGraphData(data) {
	const elements = [];
	data.forEach(el => {
		const { symbol, primaryIdentifier } = el;
		elements.push({
			group: 'nodes',
			data: {
				id: el.symbol,
				info: {
					class: el.class,
					symbol,
					primaryIdentifier
				}
			}
		});
		el.interactions &&
			el.interactions.forEach(interactors => {
				const { symbol, primaryIdentifier } = interactors.participant2;
				elements.push({
					group: 'nodes',
					data: {
						id: primaryIdentifier,
						info: {
							class: interactors.class,
							symbol
						}
					}
				});
				elements.push({
					group: 'edges',
					data: {
						target: el.symbol,
						source: primaryIdentifier
					}
				});
			});
	});
	return elements;
}

function createCytoscapeConfig(elements) {
	return {
		container: document.getElementById('cy'),
		elements: elements,
		grabbable: true,
		style: [
			{
				selector: 'node',
				style: {
					label: 'data(id)'
				}
			},
			{
				selector: 'edge',
				style: {
					'line-color': '#ccc'
				}
			}
		]
	};
}

export { getGraphData, createCytoscapeConfig };

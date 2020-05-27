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
						id: symbol,
						info: {
							class: interactors.class,
							primaryIdentifier
						}
					}
				});
				interactors.details.elements.push({
					group: 'edges',
					data: {
						target: el.symbol,
						source: symbol
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
		],
		layout: {
			name: 'cose-bilkent',
			quality: 'draft',
			fit: true,
			padding: 20,
			idealEdgeLength: 250
		}
	};
}

export { getGraphData, createCytoscapeConfig };

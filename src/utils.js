function getGraphData(data) {
	const elements = [];
	data.forEach(el => {
		const { symbol, primaryIdentifier } = el;
		elements.push({
			group: 'nodes',
			data: {
				id: el.symbol,
				bg: '#787776',
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
				const { type } = interactors.details[0];
				elements.push({
					group: 'nodes',
					data: {
						id: symbol,
						bg: '#F9E465',
						info: {
							class: interactors.class,
							primaryIdentifier,
							details: interactors.details
						}
					}
				});
				elements.push({
					group: 'edges',
					data: {
						target: el.symbol,
						source: symbol,
						group: type == 'physical' ? '' : 'gen'
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
					label: 'data(id)',
					'background-color': 'data(bg)'
				}
			},
			{
				selector: ':selected',
				css: {
					'border-width': 3,
					'border-color': 'black'
				}
			},
			{
				selector: 'edge',
				style: {
					'line-color': '#F56139',
					'curve-style': 'haystack'
				}
			},
			{
				selector: 'edge[group="gen"]',
				style: {
					'line-color': '#76B3F0',
					'haystack-radius': '0.6'
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

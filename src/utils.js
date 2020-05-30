function getGraphData(info) {
	const d = separateDataAccToType(info);
	const elements = [];
	d.forEach(data => {
		data.forEach(el => {
			const { symbol, primaryIdentifier } = el;
			elements.push({
				group: 'nodes',
				data: {
					id: el.symbol,
					bg: '#6582F9',
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
							group: type == 'physical' ? 'phy' : 'gen'
						}
					});
				});
		});
	});
	return elements;
}

function separateDataAccToType(data) {
	let phy = [],
		gen = [];
	data.forEach(d => {
		let p = false,
			g = false;
		d.interactions.forEach(i => {
			i.details.forEach(e => {
				if (!p && e.type == 'physical') {
					phy.push(d);
					p = true;
				}
				if (!g && e.type == 'genetic') {
					gen.push(d);
					g = true;
				}
			});
		});
	});
	return [phy, gen];
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
				selector: 'edge',
				style: {
					'line-color': 'green',
					'curve-style': 'haystack'
				}
			},
			{
				selector: 'edge[group="gen"]',
				style: {
					'line-color': 'red',
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

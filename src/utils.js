import colors from './constant';

function getGraphData(data) {
	const elements = [];
	const colorArrLen = colors.length;
	// setting color of each gene node taking hex code color from constant file
	for (var i = 0; i < data.length; i++) {
		data[i].color = colors[i % colorArrLen];
	}
	data.forEach(el => {
		const { symbol, primaryIdentifier, color } = el;
		elements.push({
			group: 'nodes',
			data: {
				id: el.symbol,
				bg: color,
				shape: 'barrel',
				label: el.symbol,
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
						bg: color,
						shape: 'ellipse',
						label: '',
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

function makePie(elements) {
	// creating array containting the colors each pie node needed
	const idToColorsMap = elements.reduce((m, elem) => {
		if (elem.data && elem.data.id) {
			if (!m[elem.data.id]) m[elem.data.id] = [];
			m[elem.data.id].push(elem.data.bg);
		}
		return m;
	}, {});
	// returning object containing all pie nodes with thier styles
	return Object.keys(idToColorsMap)
		.filter(key => idToColorsMap[key].length > 1)
		.map(id => {
			const pieNodeStyle = {};
			pieNodeStyle['selector'] = `node[id = '${id}']`;
			const style = {};
			const colorLen = idToColorsMap[id].length;
			for (let i = 1; i <= colorLen; i++) {
				style[`pie-${i}-background-color`] = idToColorsMap[id][i - 1];
				style[`pie-${i}-background-size`] = 100 / colorLen;
			}
			pieNodeStyle['style'] = style;
			return pieNodeStyle;
		});
}

function createCytoscapeConfig(elements, cytoscapeElement) {
	return {
		container: cytoscapeElement.current,
		elements: elements,
		grabbable: true,
		style: [
			...makePie(elements),
			{
				selector: 'node',
				style: {
					label: 'data(label)',
					'background-color': 'data(bg)',
					shape: 'data(shape)'
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

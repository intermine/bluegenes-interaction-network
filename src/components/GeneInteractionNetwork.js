import React, { useEffect } from 'react';
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import { createCytoscapeConfig, getGraphData } from '../utils';

cytoscape.use(coseBilkent);

const GeneInteractionNetwork = ({ data, sendNodeData }) => {
	useEffect(() => {
		let cy = cytoscape(createCytoscapeConfig(getGraphData(data || [])));
		let node = cy.elements().nodes();
		node.bind('tap', event => {
			sendNodeData(event);
		});
	}, [data]);

	return <div id="cy" className="cyContainer"></div>;
};

export default GeneInteractionNetwork;

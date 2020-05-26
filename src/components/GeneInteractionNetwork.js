import React, { useEffect } from 'react';
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent';
import { createCytoscapeConfig, getGraphData } from '../utils';

cytoscape.use(coseBilkent);

function GeneInteractionNetwork({ data }) {
	useEffect(() => {
		cytoscape(createCytoscapeConfig(getGraphData(data || [])));
	}, [data]);

	return <div id="cy" className="cyContainer"></div>;
}

export default GeneInteractionNetwork;

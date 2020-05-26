import React, { useEffect } from 'react';
import cytoscape from 'cytoscape';
import { createCytoscapeConfig, getGraphData } from '../utils';

function GeneInteractionNetwork({ data }) {
	useEffect(() => {
		cytoscape(createCytoscapeConfig(getGraphData(data || [])));
	}, [data]);

	return <div id="cy" className="cyContainer"></div>;
}

export default GeneInteractionNetwork;

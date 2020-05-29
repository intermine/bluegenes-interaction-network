import React, { useEffect, useState } from 'react';
import { queryData } from './query';
import GeneInteractionNetwork from './components/GeneInteractionNetwork';
import InteractionDetail from './components/InteractionDetail';

const RootContainer = ({ serviceUrl, entity }) => {
	const [data, setData] = useState([]);
	const [loading, setloading] = useState(false);
	const [selectedNodeData, setSelectedNodeData] = useState({});

	useEffect(() => {
		setloading(true);
		queryData({
			serviceUrl: serviceUrl,
			geneId: entity.value
		}).then(data => {
			setloading(false);
			setData(data);
		});
	}, []);

	const getSelectedNodeData = node => {
		const { data, edges } = node.target[0]._private;
		const { target } = edges[0]._private.data;
		data.parent = target;
		setSelectedNodeData(data);
	};

	return (
		<div className="rootContainer">
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<div className="innerContainer">
					<div className="graph">
						<span className="chart-title">Interaction Network</span>
						{data.length ? (
							<GeneInteractionNetwork
								data={data}
								sendNodeData={getSelectedNodeData}
							/>
						) : (
							<h2>Data Not Found!</h2>
						)}
					</div>
					<div className="controls">
						<InteractionDetail nodeData={selectedNodeData} />
					</div>
				</div>
			)}
		</div>
	);
};

export default RootContainer;

import React, { useEffect, useState } from 'react';
import { queryData } from './query';
import GeneInteractionNetwork from './components/GeneInteractionNetwork';

const RootContainer = ({ serviceUrl, entity }) => {
	const [data, setData] = useState([]);
	useEffect(() => {
		queryData({
			serviceUrl: serviceUrl,
			geneId: entity.value
		}).then(data => {
			setData(data);
		});
	}, []);
	return (
		<div className="rootContainer">
			<div className="innerContainer">
				<div className="graph">
					<span className="chart-title">Gene Interaction Network</span>
					{data.length ? (
						<GeneInteractionNetwork data={data} />
					) : (
						<h1>Loading...</h1>
					)}
				</div>
			</div>
		</div>
	);
};

export default RootContainer;

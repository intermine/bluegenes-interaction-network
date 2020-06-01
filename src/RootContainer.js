import React, { useEffect, useState } from 'react';
import { queryData } from './query';
import GeneInteractionNetwork from './components/GeneInteractionNetwork';
import InteractionDetail from './components/InteractionDetail';
import FilterPanel from './components/FilterPanel';

const RootContainer = ({ serviceUrl, entity }) => {
	const [data, setData] = useState([]);
	const [loading, setloading] = useState(false);
	const [selectedNodeData, setSelectedNodeData] = useState({});
	const [selectedInteraction, ChangeInteractionType] = useState('Any');
	const [physicalTypeData, setPhysicalData] = useState([]);
	const [geneticTypeData, setGeneticData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		setloading(true);
		queryData({
			serviceUrl: serviceUrl,
			geneId: entity.value
		}).then(data => {
			setloading(false);
			setData(data);
			setFilteredData(data);
			separateData(data);
		});
	}, []);

	const separateData = data => {
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
		setPhysicalData(phy);
		setGeneticData(gen);
	};

	const getSelectedNodeData = node => {
		const { data, edges } = node.target[0]._private;
		const { target } = edges[0]._private.data;
		data.parent = target;
		setSelectedNodeData(data);
	};

	const applyFilter = ev => {
		const { value } = ev.target;
		ChangeInteractionType(value);
		if (value == 'Physical') setFilteredData(physicalTypeData);
		else if (value == 'Genetic') setFilteredData(geneticTypeData);
		else if (value == 'Any') setFilteredData(data);
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
								data={filteredData}
								sendNodeData={getSelectedNodeData}
							/>
						) : (
							<h2>Data Not Found!</h2>
						)}
					</div>
					<div className="controls">
						<FilterPanel
							applyFilter={applyFilter}
							selectedInteraction={selectedInteraction}
						/>
						<InteractionDetail nodeData={selectedNodeData} />
					</div>
				</div>
			)}
		</div>
	);
};

export default RootContainer;

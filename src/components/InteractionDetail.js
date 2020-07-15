import React from 'react';

const InteractionDetail = ({ nodeData }) => {
	return (
		<div className="interaction-detail-root">
			{!Object.keys(nodeData).length ? (
				<div className="no-selected-text">
					Click on a gene to get more info about it
				</div>
			) : (
				<div className="info-container">
					<h2>Gene {nodeData.id}</h2>
					<div className="title">
						ID: <strong>{nodeData.info.primaryIdentifier}</strong>
					</div>
					<div className="title">
						Symbol: <strong>{nodeData.id}</strong>
					</div>
					{nodeData &&
						nodeData.info &&
						nodeData.info.details &&
						nodeData.info.details.length && (
							<>
								<div className="title">Interaction Details:</div>
								<div className="interaction-container">
									{nodeData.info.details.map(d => (
										<div className="gene-container" key={d}>
											<div className="gene-title">{d.name}</div>
											<div className="gene-detail">
												<div>
													Type: <strong>{d.type}</strong>
												</div>
												<div>
													Roles:
													<div className="role">
														{d.role1 == 'unspecified role' ||
														d.role2 == 'unspecified role' ? (
															<div>
																Unspecified·Role:{'·'}
																<strong>{nodeData.parent}</strong>
															</div>
														) : (
															<>
																<div>
																	{d.role1}: <strong>{nodeData.id}</strong>
																</div>
																<div>
																	{d.role2}: <strong>{nodeData.parent}</strong>
																</div>
															</>
														)}
													</div>
												</div>
												{d.dataSets.length && (
													<div>
														DataSet:
														{d.dataSets.map(data => (
															<div className="data-set" key={data}>
																{data.name}
															</div>
														))}
													</div>
												)}
											</div>
										</div>
									))}
								</div>
							</>
						)}
				</div>
			)}
		</div>
	);
};

export default InteractionDetail;

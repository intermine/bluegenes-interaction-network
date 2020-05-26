const query = geneId => ({
	from: 'Gene',
	select: [
		'primaryIdentifier',
		'symbol',
		'interactions.participant2.primaryIdentifier',
		'interactions.participant2.symbol',
		'interactions.details.type',
		'interactions.details.name',
		'interactions.details.role1',
		'interactions.details.role2',
		'interactions.details.experiment.interactionDetectionMethods.name',
		'interactions.details.experiment.name',
		'interactions.details.experiment.publication.pubMedId',
		'interactions.details.dataSets.name'
	],
	orderBy: [
		{
			path: 'primaryIdentifier',
			direction: 'ASC'
		}
	],
	where: [
		{
			path: 'Gene',
			op: 'LOOKUP',
			value: geneId,
			extraValue: 'H. sapiens',
			code: 'A'
		}
	]
});

const queryData = ({ geneId, serviceUrl, imjsClient = imjs }) => {
	const service = new imjsClient.Service({
		root: serviceUrl
	});
	return new Promise((resolve, reject) => {
		service
			.records(query(geneId))
			.then(res => {
				// if (res.length === 0) reject('No data found!');
				resolve(res);
			})
			.catch(() => reject('No data found!'));
	});
};

export { queryData };

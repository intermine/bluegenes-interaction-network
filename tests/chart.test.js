import React from 'react';
import ReactDOM from 'react-dom';
import imjs from 'imjs';
import { queryData } from '../src/query';
import GeneInteractionNetwork from '../src/components/GeneInteractionNetwork';

describe('charts', () => {
	let data = [];
	beforeAll(() => {
		return queryData({
			geneId: '1016209',
			serviceUrl: 'https://www.humanmine.org/humanmine',
			imjsClient: imjs
		})
			.then(res => (data = res))
			.catch(() => {});
	});

	test('GenePathwayNetwork renders canvas', () => {
		const el = document.createElement('div');
		ReactDOM.render(<GeneInteractionNetwork data={data} />, el);
		expect(el.innerHTML).toContain('div');
	});
});

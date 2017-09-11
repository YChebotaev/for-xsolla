import assert from 'assert';
import { fetchOptions, assignIds, convertResponse } from '../xsollaRestClient';

describe('xsollaRestClient', () => {
    describe('fetchOptions', () => {
        it('should convert a AOR-specific properties to xsoll query string params', () => {
            const url = new URL('http://example.org/');
            const type = 'testtype';
            const params = {
                pagination: {
                    page: 1,
                    perPage: 10
                }
            };

            const result = fetchOptions(url, type, params);

            assert.equal(url.searchParams.toString(), 'offset=0&limit=10');
            assert.equal(result.method, 'GET');
        });
    });

    describe('assignIds', () => {
        it('should assign .id property to every .data[] item based on 2nd argument', () => {
            const result = assignIds({
                shouldPreserveThis: 'yep',
                data: [
                    { test_id: 1 },
                    { test_id: 2 }
                ]
            }, 'test_id');

            assert.deepEqual(result, {
                shouldPreserveThis: 'yep',
                data: [
                    { id: 1, test_id: 1},
                    { id: 2, test_id: 2}
                ]
            });
        });
    });
});

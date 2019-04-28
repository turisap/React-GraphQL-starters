import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import Pagination, { PAGINATION_QUERY } from '../components/Pagination';
import { MockedProvider } from 'react-apollo/test-utils';
import Router from 'next/router';

/**
 * Faking Next router
 * @type {{push(), prefetch()}}
 */
Router.router = {
    push() {},
    prefetch () {}
};

/**
 * Faiking apollo store
 * @param length
 * @returns {*[]}
 */
function makeMocksFor(length) {
    return [
        {
            request: { query: PAGINATION_QUERY },
            result: {
                data: {
                    itemsConnection: {
                        __typename: 'aggregate',
                        aggregate: {
                            count: length,
                            __typename: 'count',
                        },
                    },
                },
            },
        },
    ];
}

describe('<Pagination/>', () => {
    it('displays a loading message', () => {
        const wrapper = mount(
            <MockedProvider mocks={makeMocksFor(1)}>
                <Pagination page={1}/>
            </MockedProvider>
        );
        // const loading = wrapper.find('p');
        // console.log(loading.debug())
        expect(wrapper.text()).toContain('Loading..');
    })

    it('renders pagination for 18 items', async () => {
        const wrapper = mount(
            <MockedProvider mocks={makeMocksFor(18)}>
                <Pagination page={1}/>
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        expect(wrapper.find('.totalPages').text()).toEqual("5");
        const pagination = wrapper.find('[data-test="pagination"]');
        expect(toJSON(pagination)).toMatchSnapshot();
    })

    it('disables prev button on the first page', async () => {
        const wrapper = mount(
            <MockedProvider mocks={makeMocksFor(18)}>
                <Pagination page={1}/>
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        expect(wrapper.find('a.prev').prop('aria-disabled')).toEqual(true);
        expect(wrapper.find('a.next').prop('aria-disabled')).toEqual(false);
    })
    it('disables next button on the last page', async () => {
        const wrapper = mount(
            <MockedProvider mocks={makeMocksFor(18)}>
                <Pagination page={5}/>
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        expect(wrapper.find('a.prev').prop('aria-disabled')).toEqual(false);
        expect(wrapper.find('a.next').prop('aria-disabled')).toEqual(true);
    })
    it('enables all buttons on a middle page', async () => {
        const wrapper = mount(
            <MockedProvider mocks={makeMocksFor(18)}>
                <Pagination page={3}/>
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        expect(wrapper.find('a.prev').prop('aria-disabled')).toEqual(false);
        expect(wrapper.find('a.next').prop('aria-disabled')).toEqual(false);
    })

});
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import CreateItem, { CREATE_ITEM_MUTATION } from '../components/CreateItem';
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeItem } from "../lib/testUtils";
import Router from 'next/router';

// mock the fetch API
const mockImage = 'http://lol.com/lol.jpg';
global.fetch = jest.fn().mockResolvedValue({
    json : () => ({
        secure_url : mockImage,
        eager : [{
            secure_url : mockImage
        }]
    })

});

describe('<CreateItem/>', () => {
    it('renders and matches snapshot', async () => {
        const wrapper = mount(
            <MockedProvider>
                <CreateItem/>
            </MockedProvider>
        );

        const form = wrapper.find('[data-test="create-item-form"]');
        //console.log(form.debug());
        expect(toJSON(form)).toMatchSnapshot();
    });

    it('uploads a file when changed', async () => {
        const wrapper = mount(
            <MockedProvider>
                <CreateItem/>
            </MockedProvider>
        );

        const input = wrapper.find('input[type="file"]');
        //console.log(input.debug())
        input.simulate('change', { target : { files : ['fakedog.jpg'] }});
        await wait();
        const component = wrapper.find('CreateItem').instance();
        //console.log(component.state)
        expect(component.state.image).toEqual(mockImage);
        expect(component.state.largeImage).toEqual(mockImage);
        expect(global.fetch).toHaveBeenCalled();

        //removing the mock of fetch from the global object
        global.fetch.mockReset();
    });

    it('handles state updating', async () => {
        const wrapper = mount(
            <MockedProvider>
                <CreateItem/>
            </MockedProvider>
        );

        wrapper
            .find('#title')
            .simulate('change', { target : { value : 'Testing', name : 'title' }});
        wrapper
            .find('#price')
            .simulate('change', { target : { value : 534, name : 'price', type : 'number' }});
        wrapper
            .find('#description')
            .simulate('change', { target : { value : 'Piu piu lolipop', name : 'description' }});

        expect(wrapper.find('CreateItem').instance().state).toMatchObject({
            title : "Testing",
            price : 534,
            description : 'Piu piu lolipop'
        })
    })

    it('creates an item when te form is submitted', async() => {
        const item = fakeItem();
        const mocks = [
            {
                request : {
                    query : CREATE_ITEM_MUTATION,
                    variables : {
                        title : item.title,
                        description : item.description,
                        image : '',
                        largeImage : '',
                        price : item.price
                    }
                },
                result : {
                    data : {
                        createItem : {
                            ...item,
                            id : 'adclol',
                            __typename : 'Item'
                        }
                    }
                }
            }
        ];

        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <CreateItem/>
            </MockedProvider>
        );

        // simulate filling the form
        wrapper
            .find('#title')
            .simulate('change', { target : { value : item.title, name : 'title' }});
        wrapper
            .find('#price')
            .simulate('change', { target : { value : item.price, name : 'price', type : 'number' }});
        wrapper
            .find('#description')
            .simulate('change', { target : { value : item.description, name : 'description' }});

        Router.router = {
            push : jest.fn()
        };
        wrapper.find('form').simulate('submit');
        await wait(50);
        expect(Router.router.push).toHaveBeenCalled();
        expect(Router.router.push).toHaveBeenCalledWith({
                pathname: '/item',
                query : {
                    id: 'adclol'
                }
        });
    })
});
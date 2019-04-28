import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import Nav from '../components/Nav';
import { CURRENT_USER_QUERY } from '../components/User';
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeUser, fakeCartItem } from '../lib/testUtils';

const notSignInMock = [
    {
        request : { query : CURRENT_USER_QUERY },
        result : { data : { me : null }}
    }
];

const signedInMocks = [
    {
        request : { query : CURRENT_USER_QUERY },
        result : { data : { me : fakeUser() }}
    }
];

const signedInMocksWithCart = [
    {
        request : { query : CURRENT_USER_QUERY },
        result : { data : { me : {
                    ...fakeUser(),
                    cart : [fakeCartItem(), fakeCartItem(), fakeCartItem()]
                } }}
    }
];


describe('<Nav/>', () => {
    it('renders a minimal navbar when signed out', async () => {
        const wrapper = mount(
            <MockedProvider mocks={notSignInMock}>
                <Nav/>
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        //console.log(wrapper.debug());

        const nav = wrapper.find('[data-test="nav"]');
        expect(toJSON(nav)).toMatchSnapshot();
    });

    it('renders the whole navbar to signed in user',  async() => {
        const wrapper = mount(
            <MockedProvider mocks={signedInMocks}>
                <Nav/>
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        //console.log(wrapper.debug());
        const nav = wrapper.find('[data-test="nav"]');
        expect(toJSON(nav)).toMatchSnapshot();
    })

    it('renders the amount of cart items', async() =>{
        const wrapper = mount(
            <MockedProvider mocks={signedInMocksWithCart}>
                <Nav/>
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        //console.log(wrapper.debug());
        const nav = wrapper.find('[data-test="nav"]');
        expect(toJSON(nav)).toMatchSnapshot();
    })

})
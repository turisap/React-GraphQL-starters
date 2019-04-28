import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import { Authentication } from '../components/Auth';
import { CURRENT_USER_QUERY } from '../components/User';
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeUser } from '../lib/testUtils';

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

describe('<Auth/>', () => {
    it('renders sign in dialog to logged out users', async () => {
        const wrapper = mount(
            <MockedProvider mocks={notSignInMock}>
                <Authentication/>
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        console.log(wrapper.debug());
        expect(wrapper.text()).toContain('Please sigin in before continuing');
        expect(wrapper.find('SignIn').exists()).toBe(true);
    });

    it('renders the child component when the user is signed in', async () => {
        const Hey = () => <p>Test</p>;
        const wrapper = mount(
            <MockedProvider mocks={signedInMocks}>
                <Authentication>
                    <Hey/>
                </Authentication>
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        //console.log(wrapper.debug());
        expect(wrapper.find('Hey').exists()).toBe(true);
    })
});

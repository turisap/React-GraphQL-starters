import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import { ApolloConsumer } from 'react-apollo';
import SignUp, { SIGNUP_MUTATION } from '../components/SignUp';
import { MockedProvider } from 'react-apollo/test-utils';
import { CURRENT_USER_QUERY } from "../components/User";
import { fakeUser } from "../lib/testUtils";

function type (wrapper, name, value) {
    wrapper.find(`input[name="${name}"]`).simulate('change', {
        target : { name, value }
    });
}

const me = fakeUser();
const mocks = [
    // signup mock mutation
    {
        request: {
            query: SIGNUP_MUTATION,
            variables: {
                name: me.name,
                email: me.email,
                password: 'lll',
            },
        },
        result: {
            data: {
                signup: {
                    __typename: 'User',
                    id: 'abc123',
                    email: me.email,
                    name: me.name
                },
            },
        },
    },
    // current user mock mutation
    {
        request: { query: CURRENT_USER_QUERY },
        result: {
            data: { me }
        }
    }
];
// const mocks = [
//     // signup mock mutation
//     {
//         request: {
//             query: SIGNUP_MUTATION,
//             variables: {
//                 name: me.name,
//                 email: me.email,
//                 password: 'wes',
//             },
//         },
//         result: {
//             data: {
//                 signup: {
//                     __typename: 'User',
//                     id: 'abc123',
//                     email: me.email,
//                     name: me.name,
//                 },
//             },
//         },
//     },
//     // current user query mock
//     {
//         request: { query: CURRENT_USER_QUERY },
//         result: { data: { me } },
//     },
// ];

describe('<SignUp/>', () => {
    it('renders and matches shapshot', () => {
        const wrapper = mount(<MockedProvider><SignUp/></MockedProvider>);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });

    it('calls the mutation properly', async () => {
        let apolloClient;
        const wrapper = mount(
            <MockedProvider mocks={mocks}>
                <ApolloConsumer>
                    {client => {
                        apolloClient = client;
                        return <SignUp />;
                    }}
                </ApolloConsumer>
            </MockedProvider>
        );
        await wait();
        wrapper.update();
        type(wrapper, 'name', me.name);
        type(wrapper, 'email', me.email);
        type(wrapper, 'password', 'lll');
        wrapper.update();
        wrapper.find('form').simulate('submit');
        await wait();
        // query the user out of the apollo client
        const user = await apolloClient.query({ query: CURRENT_USER_QUERY });
        //console.log(user);
        expect(user.data.me).toMatchObject(me);

    })
})
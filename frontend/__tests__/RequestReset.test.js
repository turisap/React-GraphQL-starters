import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import RequestReset, { RESET_REQUEST_MUTATION } from '../components/RequestReset';
import { MockedProvider } from 'react-apollo/test-utils';

const mocks = [
    {
        request : {
                query : RESET_REQUEST_MUTATION,
                variables : { email : 'k@mail.com'}
        },
        result  : {
            data : {
                requestReset : {
                    message : 'success',
                    __typename : 'SuccessMessage'
                }
            }
        }
    }
];

describe('<RequestReset/>', () => {
    it('renders and matches snapshot', async () => {
        const wrapper = mount(
            <MockedProvider>
                <RequestReset/>
            </MockedProvider>
        );
        //console.log(wrapper.debug())
        const form = wrapper.find('[data-test="reset-form"]');
        //console.log(form.debug())
        expect(toJSON(form)).toMatchSnapshot();
    })

    // it('calls the mutation', async () => {
    //     const wrapper = mount(
    //         <MockedProvider mocks={mocks}>
    //             <RequestReset/>
    //         </MockedProvider>
    //     );
    //     // simulate typing email
    //     wrapper
    //         .find('input')
    //         .simulate('change', { target : { name : 'email', value : 'k@mail.com '}});
    //     // submit the form
    //     wrapper
    //         .find('form')
    //         .simulate('submit');
    //     await wait();
    //     wrapper.update();
    //     console.log(wrapper.debug())
    //     //expect(wrapper.find('p')).toContain('alksdfj');
    // })
})

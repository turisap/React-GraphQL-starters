import Item from '../components/Item';
import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';

const fakeItem = {
    id : 'laskdjf',
    title : ' A fake item',
    price : 986,
    description : 'Fake fake fake',
    image : 'fake.jpg',
    largeImage : 'fakeLarge.jpg'
};

// describe('<Item/>', () => {
//     it('renders and displays properly', () => {
//         const wrapper = shallow(<Item item={fakeItem}/>);
//         const PriceTag = wrapper.find('PriceTag');
//         //console.log(wrapper.debug())
//         //console.log(PriceTag.debug())
//         //console.log(PriceTag.text())
//         //console.log('LOLOLOLO ' + PriceTag.children())
//         expect(PriceTag.children().text()).toBe('$0.98');
//         expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
//
//     });
//
//     it('renders the image properly', () => {
//         const wrapper = shallow(<Item item={fakeItem}/>);
//         const img = wrapper.find('img');
//         //console.log(wrapper.instance().props)
//         expect(img.props().src).toBe(fakeItem.image);
//         expect(img.props().alt).toBe(fakeItem.title);
//     });
//
//     it('renders the button properly', () => {
//         const wrapper = shallow(<Item item={fakeItem}/>);
//         const buttonList = wrapper.find('.buttonList');
//         expect(buttonList.children()).toHaveLength(3);
//         expect(buttonList.find('Link').exists()).toBe(true);
//         expect(buttonList.find('AddToCart').exists()).toBe(true);
//         expect(buttonList.find('DeleteItem').exists()).toBe(true);
//     })
// })

describe('<Item/>', () => {
    it('renders and matches the snapshot', () => {
       const wrapper = shallow(<Item item={fakeItem}/>);
       expect(toJSON(wrapper)).toMatchSnapshot();
    })
})
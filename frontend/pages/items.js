import Items from '../components/Items';

const Home = props => (
    <div>
        {/**passing the number of current page to the component from the query string**/}
        <Items page={parseFloat(props.query.page || 1)}/>
    </div>
);

export default Home;
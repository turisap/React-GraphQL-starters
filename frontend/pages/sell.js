import CreateItem from '../components/CreateItem';
import { Authentication } from '../components/Auth';

const Sell = props => (
    <div>
        <Authentication>
            <CreateItem/>
        </Authentication>
    </div>
);

export default Sell;
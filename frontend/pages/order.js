import { Authentication } from '../components/Auth';
import Order from '../components/Order';

const OrderPage = props => (
    <div>
        <Authentication>
            <Order id={props.query.id}/>
        </Authentication>
    </div>
);

export default OrderPage;
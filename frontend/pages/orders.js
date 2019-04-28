import { Authentication } from '../components/Auth';
import OrderList from "../components/OrderList";

const OrdersPage = props => (
    <div>
        <Authentication>
            <OrderList/>
        </Authentication>
    </div>
);

export default OrdersPage;
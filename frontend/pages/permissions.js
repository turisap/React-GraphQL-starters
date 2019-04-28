import { Authentication } from '../components/Auth';
import Permissions from '../components/Permissions';

const PermissionsPage = props => (
    <div>
        <Authentication>
            <Permissions/>
        </Authentication>
    </div>
);

export default PermissionsPage;
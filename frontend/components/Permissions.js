import { Query, Mutation } from 'react-apollo';
import ErrorMessage from './ErrorMessage';
import gql from 'graphql-tag';
import Table from './styles/Table';
import { PERMISSIONS } from '../../backend/src/PermissionTypes';
import SickButton from './styles/SickButton';
import PropTypes from 'prop-types';

const ALL_USERS_QUERY = gql`
    query {
        users {
            id
            name
            email
            permissions
        }
    }
`;

const UPDATE_PERMISSIONS_MUTATION = gql`
    mutation UPDATE_PERMISSIONS_MUTATION ($permissions : [Permission], $userId : ID!) {
        updatePermissions (permissions : $permissions, userId : $userId) {
            id
            permissions
            name
            email
        }
    }
`;

const Permissions = props => (
    <Query query={ALL_USERS_QUERY}>
        {({data, loading, error}) =>  (
            <div>
                <ErrorMessage error={error}/>
                <div>
                    <h2>Manage permissions</h2>
                    <Table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            {Object.keys(PERMISSIONS).map(permission => <th key={permission}>{permission}</th>)}
                            <th>👇🏻</th>
                        </tr>
                        </thead>
                        <tbody>{data.users.map(user => <UserPermissions user={user} key={user.id}/>)}</tbody>
                    </Table>
                </div>
            </div>
        )}
    </Query>
);


class UserPermissions extends React.Component {



    /**
     * Never use props to set initial state as it will be never updated
     * we can use it here as we use props only for seeding (initial values), which will be changed later through inputs
     * **/
    state = {
        permissions : this.props.user.permissions
    };

    handlePermissionChange = e => {
        const checkbox = e.target;
        let updatedPermissions = [...this.state.permissions];

        if (checkbox.checked) {
            updatedPermissions.push(checkbox.value);
        } else {
            updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value)
        }
        this.setState({permissions : updatedPermissions});
    }

    render (){
        const user = this.props.user;
        return (
            <Mutation
                mutation={UPDATE_PERMISSIONS_MUTATION}
                variables={{
                    permissions : this.state.permissions,
                    userId : this.props.user.id
                }}
            >
                {(updatePermissions, {loading, error}) => (
                    <>
                    {error && <tr><td colspan='8'><ErrorMessage error={error}/></td></tr>}
                    <tr>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        {Object.keys(PERMISSIONS).map(permission => (
                            <td key={permission}>
                                <label htmlFor={`${user.id}-permission-${permission}`}>
                                    <input
                                        id={`${user.id}-permission-${permission}`}
                                        type={"checkbox"}
                                        checked={this.state.permissions.includes(permission)}
                                        value={permission}
                                        onChange={this.handlePermissionChange}
                                    />
                                </label>
                            </td>
                        ))}
                        <td>
                            <SickButton
                                type={'button'}
                                disabled={loading}
                                onClick={updatePermissions}
                            >Updat{loading ? 'ing' : 'e'}</SickButton>
                        </td>
                    </tr>
                    </>
                )}
            </Mutation>
        )
    }
}

UserPermissions.propTypes = {
    user : PropTypes.shape({
        name : PropTypes.string.isRequired,
        email : PropTypes.string.isRequired,
        id : PropTypes.string.isRequired,
        permissions : PropTypes.array.isRequired
    }).isRequired
}

export default Permissions;
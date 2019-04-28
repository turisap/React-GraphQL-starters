import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from "./User";

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email : String!, $password : String!) {
        signin(email : $email, password : $password) {
            id
            email
            name
        }
    }
`;


class SignIn extends Component {
    state = {
        email : "",
        name : "",
        password : ""
    };

    saveToState = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };

    render() {
        return (
            <Mutation
                mutation={SIGNIN_MUTATION}
                variables={this.state}
                refetchQueries={[
                    {query : CURRENT_USER_QUERY}
                ]}
            >
                {(signInFunction, {error, loading}) => {
                    return (
                        <Form
                            method="post"
                            onSubmit={async e => {
                                e.preventDefault();
                                await signInFunction();
                                this.setState({name : "", email : "", password : ""});
                            }}
                        >
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Sign into your account</h2>
                                <Error error={error}/>
                                <label>
                                    Email
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.saveToState}
                                    />
                                </label>
                                <label>
                                    Password
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.saveToState}
                                    />
                                </label>
                                <button type="submit">Sign Up</button>
                            </fieldset>
                        </Form>
                    )
                }}
            </Mutation>
        );
    }
}

SignIn.propTypes = {};

export default SignIn;

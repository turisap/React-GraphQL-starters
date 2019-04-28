import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import {CURRENT_USER_QUERY} from "./User";

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email : String!, $name : String!, $password : String!) {
        signup(email : $email, name : $name, password : $password) {
            id
            email
            name
        }
    }
`;


class SignUp extends Component {
    state = {
        name : "",
        email : "",
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
                mutation={SIGNUP_MUTATION}
                variables={this.state}
                refetchQueries={[
                    {query : CURRENT_USER_QUERY}
                ]}
            >
                {(signUpFunction, {error, loading}) => {
                    return (
                        <Form
                            method="post"
                            onSubmit={async e => {
                                e.preventDefault();
                                await signUpFunction();
                                this.setState({name : "", email : "", password : ""});
                            }}
                        >
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Sign up for an account</h2>
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
                                    Name
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={this.state.name}
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

SignUp.propTypes = {};

export default SignUp;
export { SIGNUP_MUTATION };

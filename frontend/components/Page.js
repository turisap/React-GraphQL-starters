import React, {Component} from 'react';
import styled, { ThemeProvider, injectGlobal} from 'styled-components';
import Header from './Header';
import Meta from './Meta';


class Page extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <StyledPage>
                    <Meta/>
                    <Header/>
                    <Inner>{this.props.children}</Inner>
                </StyledPage>
            </ThemeProvider>
        );
    }
}

Page.propTypes = {};

export default Page;

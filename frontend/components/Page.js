import React, {Component} from 'react';
import styled, { ThemeProvider, injectGlobal} from 'styled-components';
import Header from './Header';
import Meta from './Meta';


class Page extends Component {
    render() {
        return (
            <>
              <Meta/>
              <Header/>
              <div className="page__contents">
                {this.props.children}
              </div>
            </>
        );
    }
}

Page.propTypes = {};

export default Page;

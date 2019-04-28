import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import { CONFIG } from '../config';
import PropTypes from 'prop-types';
import PaginationStyles from './styles/PaginationStyles';

const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        itemsConnection {
            aggregate {
                count
            }
        }
    }
`;

const Pagination = props => (
    <Query query={PAGINATION_QUERY}>
        {({data, loading, error}) => {
            if(loading) return <p>Loading..</p>;
            if(error) return error;
            const items = data.itemsConnection.aggregate.count;
            const pages = Math.ceil( items / CONFIG.ITEMS_PER_PAGE);
            const page = props.page;
            return (
                <PaginationStyles data-test="pagination">
                    <Head>
                        <title>{CONFIG.SHOP_NAME} - Page {page} of {pages}

                        </title>
                    </Head>
                    <Link
                    prefetch
                    href={{
                        pathname : 'items',
                        query : { page : page - 1}
                    }}
                    >
                        <a aria-disabled={page <= 1} className='prev'>Prev</a>
                    </Link>
                    <p>Page {props.page} of <span className='totalPages'>{pages}</span></p>
                    <p>Items  total : {items}</p>
                    <Link
                        prefetch
                        href={{
                            pathname : 'items',
                            query : { page : page + 1}
                        }}
                    >
                        <a aria-disabled={page >= pages} className='next'>Next</a>
                    </Link>
                </PaginationStyles>
            )
        }}
    </Query>
);

Pagination.propTypes = {
    page : PropTypes.number.isRequired
}

export default Pagination;
export { PAGINATION_QUERY };
import React from 'react';
import UpdateItem from '../components/UpdateItem';

/**
 * Props contain query string for every page as we set it in _app.js
 * Basically, we can access all query string parameters via props.query. on all pages
 * @param props
 */
const Update = props => (
    <div>
        <UpdateItem id={props.query.id}/>
    </div>
);

export default Update;
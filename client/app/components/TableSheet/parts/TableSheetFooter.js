import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {TableCell, TableFooter, TableRow } from 'material-ui/Table';

class TableSheetFooter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={2} style={{ textAlign: 'right'}} >Summary</TableCell>
                    <TableCell>{this.props.summary}</TableCell>
                </TableRow>
            </TableFooter>
        );
    }
}


export default TableSheetFooter;
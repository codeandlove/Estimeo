import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {TableCell, TableHead, TableRow } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

class TableSheetHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false
        }
    }

    handleCheckAllTasks = () => {
        this.setState(s => {
            return {
                checked: !s.checked
            }
        }, () => {
            this.props.handleSelectAllRows();
        })
    };

    render() {

        const {checked} = this.state;

        return (
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Checkbox indeterminate={false} checked={checked} onChange={this.handleCheckAllTasks} />
                    </TableCell>
                    <TableCell>Task name</TableCell>
                    <TableCell numeric>Hours</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Q & A</TableCell>
                    <TableCell />
                </TableRow>
            </TableHead>
        );
    }
}


export default TableSheetHeader;
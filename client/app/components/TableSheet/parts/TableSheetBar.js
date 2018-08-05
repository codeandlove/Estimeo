import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {TableCell, TableRow } from 'material-ui/Table';
import PropertyForm from '../../PropertyForm/PropertyForm';
import { Delete, Reorder } from 'material-ui-icons';
import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';

import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => {
    return (
        <Icon>
            <Reorder />
        </Icon>
    )
});

const SortableItem = SortableElement(({props}) => {

    const { bar } = props;

    return (
        <TableRow>
            <TableCell>
                <DragHandle />
            </TableCell>
            <TableCell colSpan={4}>
                <PropertyForm value={bar.title} handlePropertyUpdate={(property, key) => props.handlePropertyUpdate(property, 'title')} />
            </TableCell>
            <TableCell>
                <IconButton onClick={() => props.handleDeleteRow()}>
                    <Delete />
                </IconButton>
            </TableCell>
        </TableRow>
    )
});


class TableSheetBar extends Component {
    constructor(props){
        super(props);
    }

    render() {

        return <SortableItem key={`bar-${this.props.index}`} index={this.props.index} props={{...this.props}} />;
    }
}


export default TableSheetBar;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import Icon from 'material-ui/Icon';
import { Delete, Reorder } from 'material-ui-icons';
import Checkbox from 'material-ui/Checkbox';

import { withStyles } from 'material-ui/styles';

import {TableCell, TableRow } from 'material-ui/Table';
import PropertyForm from '../../PropertyForm/PropertyForm';

import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';

const styles = theme => ({
    tr: {

    },
    td: {

    }
});


const DragHandle = SortableHandle(() => {
    return (
        <Icon>
            <Reorder />
        </Icon>
    )
});

const SortableItem = SortableElement(({props}) => {
    const { classes } = props;

    return (
        <TableRow className={classes.tr}>
            <TableCell className={classes.td}>
                <DragHandle />
                <Checkbox indeterminate={false} checked={props.selected} onChange={() => props.handleSelectRow()} />
            </TableCell>
            <TableCell className={classes.td}>
                <PropertyForm value={props.task.title} fullWidth={true} placeholder="Task title..." handlePropertyUpdate={(property, key) => props.handlePropertyUpdate(property, 'title')} />
            </TableCell>
            <TableCell className={classes.td}>
                <PropertyForm value={props.task.hours} fullWidth={true} placeholder="Hours" handlePropertyUpdate={(property, key) => props.handlePropertyUpdate(property, 'hours')} />
            </TableCell>
            <TableCell className={classes.td}>
                <PropertyForm value={props.task.desc} fullWidth={true} placeholder="Task description..." handlePropertyUpdate={(property, key) => props.handlePropertyUpdate(property, 'desc')} />
            </TableCell>
            <TableCell className={classes.td}>
                <PropertyForm value={props.task.qa} fullWidth={true} placeholder="Question and answers..." handlePropertyUpdate={(property, key) => props.handlePropertyUpdate(property, 'qa')} />
            </TableCell>
            <TableCell className={classes.td}>
                <IconButton onClick={() => props.handleDeleteRow()}>
                    <Delete />
                </IconButton>
            </TableCell>
        </TableRow>
    )
});

class TableSheetRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false
        }
    }

    render() {

        return <SortableItem props={{...this.props}} key={`row-${this.props.index}`} index={this.props.index} />;

    }
}

TableSheetRow.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableSheetRow);
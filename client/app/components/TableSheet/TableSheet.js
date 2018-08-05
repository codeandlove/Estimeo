import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import { TableSheetHeader, TableSheetFooter, TableSheetRow, TableSheetBar } from './parts';

import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';

import Table, { TableBody } from 'material-ui/Table';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    }
});


const SortableList = SortableContainer(({component}) => {

    const {props} = component;

    const handleUpdateRow = (property, key, row) => {

        const index = props.rows.indexOf(row);
        props.handleUpdateRows([...props.rows.slice(0,index), {...row, [key]: property}, ...props.rows.slice(index+1)]);
    };

    const handleDeleteRow = row => {
        const index = props.rows.indexOf(row);
        props.handleUpdateRows([...props.rows.slice(0,index), ...props.rows.slice(index+1)]);
    };

    const handleSelectIndex = index => {
        component.handleSelectRows(index);
    };

    return (
        <TableBody>
            {
                props.rows.map((row, i)=>{
                    switch(row.type) {
                        case 'task':
                            return <TableSheetRow
                                        key={`row-${i}`}
                                        index={i}
                                        task={row}
                                        handlePropertyUpdate={(property, key) => handleUpdateRow(property, key, row)}
                                        handleSelectRow={() => handleSelectIndex(i)}
                                        handleDeleteRow={() => handleDeleteRow(row)}
                                        selected={component.state.selectedRows.indexOf(i) !== -1}
                                   />;
                            break;
                        case 'bar':
                            return <TableSheetBar
                                        key={`row-${i}`}
                                        index={i}
                                        bar={row}
                                        handlePropertyUpdate={(property, key) => handleUpdateRow(property, key, row)}
                                        handleDeleteRow={() => handleDeleteRow(row)}
                                   />;
                            break;
                        default:
                            console.warn('Missing project row type');
                            return;
                    }
                })
            }
        </TableBody>
    );
});

class TableSheet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedAllRows: false,
            selectedRows: []
        }
    }

    handleSelectRows = index => {
        this.setState(s => {

            if(s.selectedRows.indexOf(index) !== -1) {
                let updatedRows = [...s.selectedRows.slice(0, s.selectedRows.indexOf(index)), ...s.selectedRows.slice(s.selectedRows.indexOf(index)+1)];

                return {
                    selectedAllRows: false,
                    selectedRows: updatedRows
                }
            }

            return {
                selectedRows: [...s.selectedRows, index]
            }
        })
    };

    renderTableBody = () => {
        return <SortableList component={{...this}} onSortEnd={this.onSortEnd} useDragHandle={true} axis="y" lockAxis="y" />;
    };

    onSortEnd = ({oldIndex, newIndex}) => {
        this.props.handleUpdateRows(arrayMove(this.props.rows, oldIndex, newIndex));
    };

    renderSummary = () => {

        const hours = this.props.rows.filter(row => row.type === 'task').map(task => parseInt(task.hours)).filter(Number);

        hours.push(0);

        return hours.reduce((a,b) => (a + b));

    };

    render() {
        const { classes } = this.props;
        const { selectedRows } = this.state;

        return (
            <Table key="project-table-sheet" className={classes.table}>
                <TableSheetHeader handleSelectAllRows={() => null}  />

                { this.renderTableBody() }

                <TableSheetFooter summary={this.renderSummary()} />
            </Table>
        );
    }
}


TableSheet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableSheet);

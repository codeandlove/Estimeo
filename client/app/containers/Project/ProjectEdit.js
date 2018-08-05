import React, { Component } from 'react';

import { connect } from 'react-redux';
import { loadProject, saveProject, deleteProject } from '../../actions/projects';
import { createTask, loadTask, deleteTask, saveTask, loadProjectTasks } from "../../actions/tasks";

import PropertyForm from '../../components/PropertyForm/PropertyForm';

import TableSheet from '../../components/TableSheet/TableSheet';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Slide from 'material-ui/transitions/Slide';
import Dialog, { DialogTitle } from 'material-ui/Dialog';

class ProjectEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            title: null,
            rows: []
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        this.props.loadProject(id, () => {

            this.props.loadProjectTasks(id, () => {

                let rows = [];

                this.props.project.rows.map(row => {
                    if(row.type === 'task') {

                        this.props.tasks.current.filter(task => {

                            if( row._id === task._id ) {
                                rows = [...rows, {...task, type: 'task'}];
                            }
                        });

                    } else {
                        rows = [...rows, row];
                    }
                });

                this.setState({
                    title: this.props.project.title,
                    rows: rows,
                    loading: false
                })
            });
        });
    }

    handleUpdateTitle = title => {
        this.setState({
            title: title
        }, () => {
            this.handleProjectSave();
        })
    };

    handleProjectDelete = () => {
        const id = this.props.match.params.id;

        this.props.deleteProject(id, () => {
            this.props.history.push('/');
        });
    };

    handleProjectSave = () => {
        const id = this.props.match.params.id;

        const {rows, title} = this.state;

        let rowsToSave = rows.map(row => {
           if(row.type === 'task') {
               return {
                   _id: row._id,
                   type: 'task'
               }
           } else {
               return row;
           }
        });

        this.props.saveProject(id, {
            title: title,
            rows: rowsToSave
        }, () => {
            let rows = [];

            rowsToSave.map(row => {
                if(row.type === 'task') {

                    //switch rows to tasks
                    const task = this.props.tasks.current.filter(task => task._id === row._id);

                    if(task.length) {
                        rows = [...rows, {...task[0], type: 'task'}];
                    } else {
                        rows = [...rows, row];
                    }

                } else {
                    rows = [...rows, row];
                }
            });

            this.setState({
                rows: rows
            });
        });
    };

    addTask = () => {
        let taskId = null;

        const empty = { title: '', hours: 0, desc: '', qa: ''};

        this.props.createTask(empty, (request)=> {
            taskId = request.data.task._id;

            this.setState(s => {
                return {
                    rows: [...s.rows, { type:'task', _id: taskId }]
                }
            }, () => {
                this.handleProjectSave();
            });
        });
    };

    deleteTask = id => {
        this.props.deleteTask(id);
    };

    addBar = () => {
        this.setState(s => {
            return {
                rows: [...s.rows, { type:'bar', title: 'Click to change title...', color: '#ffffff' }]
            }
        }, () => {
            this.handleProjectSave();
        });
    };

    deleteBar = row => {

    };

    handleUpdateRows = updatedRows => {

        const {rows} = this.state;

        this.setState(() => {
            return {
                rows: updatedRows
            }
        }, () => {

            //Save tasks
            const nextTasks = updatedRows.filter(row => {
                return row.type === 'task';
            });

            const prevTasks = rows.filter(row => {
                return row.type === 'task';
            });

            let taskToSave = prevTasks.map((el, i) => {
                if(nextTasks[i] !== el) {
                    return nextTasks[i];
                }
            }).filter(elm => !!elm);

            taskToSave = taskToSave[0];

            if(taskToSave) {
                this.props.saveTask(taskToSave._id, taskToSave, () => {
                    //Save project
                    this.handleProjectSave();
                });

                return;
            }

            //Save project
            this.handleProjectSave();

        });


    };

    render() {
        const { loading, title, rows } = this.state;

        if(loading) return null;

        return (
            <div className="estimeo-project-edit">
                <h2 key="project-title">
                    <PropertyForm value={title} handlePropertyUpdate={title => this.handleUpdateTitle(title)} />
                </h2>

                <div className="project-toolbar">
                    <Button raised onClick={this.handleProjectDelete}>Delete</Button>
                </div>

                <Paper>
                    <TableSheet key="project-table" rows={rows} handleUpdateRows={updatedRows => this.handleUpdateRows(updatedRows)} />
                </Paper>

                <div className="project-toolbar">
                    <Button key="new-task-btn" raised onClick={this.addTask} >Add Task</Button>
                    <Button key="new-bar-btn" raised onClick={this.addBar} >Add Bar</Button>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        project: state.projects.current,
        tasks: state.tasks
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadProject: (id, callback) => dispatch(loadProject(id, callback)),
        saveProject: (id, payload, callback) => dispatch(saveProject(id, payload, callback)),
        deleteProject: (id, callback) => dispatch(deleteProject(id, callback)),
        createTask: (payload, callback) => dispatch(createTask(payload, callback)),
        loadTask: (id, callback) => dispatch(loadTask(id, callback)),
        deleteTask: (id, callback) => dispatch(deleteTask(id, callback)),
        saveTask: (id, payload, callback) => dispatch(saveTask(id, payload, callback)),
        loadProjectTasks: (id, callback) => dispatch(loadProjectTasks(id, callback))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEdit);

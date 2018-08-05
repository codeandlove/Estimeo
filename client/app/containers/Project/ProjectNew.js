import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/projects';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Slide from 'material-ui/transitions/Slide';
import Dialog, { DialogTitle } from 'material-ui/Dialog';

class ProjectNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            tasks: []
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleSave = () => {
        this.props.createProject(this.state, () => {
            this.props.loadProjects(() => {
                this.props.history.push('/');
            });
        });
    };

    render() {
        return (
            <div className="estimeo-project-new">
                <form noValidate autoComplete="off">
                    <TextField
                        id="title"
                        label="title"
                        value={this.state.title}
                        onChange={this.handleChange('title')}
                        margin="normal"
                    />
                    <Button raised onClick={this.handleSave}>Save</Button>
                </form>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {...state};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...actionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectNew);

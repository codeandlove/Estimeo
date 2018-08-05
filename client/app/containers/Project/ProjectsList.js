import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/projects';
import { withRouter } from 'react-router';

import Card, { CardActions, CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui-icons/Delete';
import Typography from 'material-ui/Typography';

class ProjectsList extends Component {
    constructor(props) {
        super(props);
    }

    handleEdit = id => {
        this.props.history.push(`/project/edit/${id}`);
    };

    handleDelete = id => {
        this.props.deleteProject(id, () => {
            this.props.loadProjects();
        });
    };

    renderItem = item => {
        return (
            <Card>
                <CardContent>
                    <Typography type="body1">
                        {item.title}
                    </Typography>
                    <h1>{item.rows.length || 0} tasks</h1>
                </CardContent>
                <CardActions>
                    <Button raised onClick={() => this.handleEdit(item._id)}>Edit</Button>
                    <IconButton onClick={() => this.handleDelete(item._id)}>
                        <Delete />
                    </IconButton>
                </CardActions>
            </Card>
        )
    };

    render() {

        return (
            <div className="estimeo-projects-list">
                <h1>Projects</h1>
                <Grid container spacing={24}>
                        {
                            this.props.projects.map((item, i) => {
                                return (
                                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={`item-${i}`}>
                                        {this.renderItem(item)}
                                    </Grid>
                                )
                            })
                        }
                </Grid>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        projects: state.projects.map
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...actionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectsList));

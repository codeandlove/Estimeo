import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadProjects } from "../../actions/projects";

import ProjectsList from '../Project/ProjectsList';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="estimeo-dashboard">
                <h1>Dashboard</h1>
                <ProjectsList />
            </div>
        )
    }

}


function mapStateToProps(state) {
    return {...state};
}

function mapDispatchToProps(dispatch) {
    return {
        loadProjects: () => dispatch(loadProjects())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

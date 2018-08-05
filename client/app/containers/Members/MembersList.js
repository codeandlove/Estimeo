import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/projects';

class MembersList extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="estimeo-members-list">
                <h1>Members List</h1>

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

export default connect(mapStateToProps, mapDispatchToProps)(MembersList);

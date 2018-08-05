import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LinearProgress } from 'material-ui/Progress';

class Loader extends Component {
    constructor(props) {
        super(props);
    }

    result = () => {
        const { request, withOverlay } = this.props;

        let result = (
            <div className={`loader ${(withOverlay ? 'loader-overlay': '')}`}>
                <LinearProgress mode="query" />
            </div>
        );

        if(!request.loading && !request.initialLoading) {
            result = null;
        }

        return result;
    }

    render() {

        return this.result();

    }
}

const mapStateToProps = (state) => {
    return {request: state.request}
};

export default connect(mapStateToProps)(Loader);

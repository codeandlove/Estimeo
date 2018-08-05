import React, { Component } from 'react';
import { connect } from 'react-redux';

function withUser(WrappedComponent) {
    class HOC extends Component {

        render() {
            return (
                <WrappedComponent {...this.props} />
            );
        }
    }

    const mapStateToProps = state => {
        return {
            user: state.user
        };
    };

    return connect(mapStateToProps)(HOC);
}

export default withUser;

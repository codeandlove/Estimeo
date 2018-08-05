import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slide from 'material-ui/transitions/Slide';
import Snackbar from 'material-ui/Snackbar';
import { CircularProgress } from 'material-ui/Progress';


class SnackvarLoader extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Snackbar open={this.props.request.loading} onRequestClose={this.handleRequestClose} transition={<Slide direction="up" />}  message={<span><CircularProgress color="accent" size={20} /> Stand by</span>} />
        )

    }
}

const mapStateToProps = (state) => {
    return {request: state.request}
};

export default connect(mapStateToProps)(SnackvarLoader);

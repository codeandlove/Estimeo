import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import { loadAllInitialData } from "../../actions/initial";

import withUser from '../../HOC/withUser';

import App from '../../containers/App/App';
import Loader from '../Loader/Loader';

import Landing from '../../containers/Landing/Landing';

import Dashboard from '../../containers/Dashboard/Dashboard';

import ProjectNew from '../../containers/Project/ProjectNew';
import ProjectEdit from '../../containers/Project/ProjectEdit';

import UserSignup from '../../containers/User/UserSignup';
import UserSignin from '../../containers/User/UserSignin';
import UserEdit from '../../containers/User/UserEdit';

class Routers extends Component {
  constructor(props) {
      super(props);
  }

  renderSwitch = () => {

      const { user } = this.props;

      let defaultComponent = (user.authorized)? Dashboard : Landing;

      return (
          <Switch>
              <Route exact path="/" component={defaultComponent} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/signup" component={UserSignup} />
              <Route path="/signin" component={UserSignin} />
              <Route path="/user/edit" component={UserEdit} />
              <Route path="/project/new" component={ProjectNew} />
              <Route path="/project/edit/:id" component={ProjectEdit} />
          </Switch>
      )
  };

  render() {
    const { user } = this.props;

    return (
      <Router history={browserHistory} >
        <App user={user}>
            { this.props.initialLoading ? <div className="initial-loading"><span className="initial-message">Stand by</span><Loader withOverlay={true} /></div> : this.renderSwitch() }
        </App>
      </Router>
    );
  }
}

const mapStateToProps = state => {
    return {
        initialLoading: state.request.initialLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAllInitialData: dispatch(loadAllInitialData())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withUser(Routers));

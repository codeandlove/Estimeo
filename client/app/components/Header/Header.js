import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';

import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
        anchorEl: null,
        open: false,
    };

  }

  handleClick = event => {
      this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
      this.setState({ open: false });
  };

  render() {
    const {userIsAuthorized} = this.props;

    return (
        (userIsAuthorized) ?
            <header>
              <AppBar position="static">
                <Toolbar>
                  <IconButton color="contrast" aria-label="Menu" onClick={() => this.props.handleToggleDrawer()}>
                    <MenuIcon />
                  </IconButton>
                  <Typography type="title" color="inherit">
                    <Link to="/">Estimeo</Link>
                  </Typography>
                </Toolbar>
              </AppBar>
            </header>
        :
            <header>
              <AppBar position="static">
                <Toolbar>
                  <Typography type="title" color="inherit">
                    <Link to="/">Estimeo</Link>
                  </Typography>

                  <Button aria-owns={this.state.open ? 'appbar-menu' : null} aria-haspopup="true" onClick={this.handleClick}>
                    <MenuIcon />
                  </Button>

                  <Menu id="appbar-menu" anchorEl={this.state.anchorEl} open={this.state.open} onRequestClose={this.handleRequestClose}>
                    <MenuItem onClick={this.handleRequestClose} >
                      <Link to="/signin">Sign In</Link>
                    </MenuItem>
                    <MenuItem onClick={this.handleRequestClose}>
                      <Link to="/signup">Sign Up</Link>
                    </MenuItem>
                  </Menu>
                </Toolbar>
              </AppBar>
            </header>
    );
  }
}

export default withRouter(Header);

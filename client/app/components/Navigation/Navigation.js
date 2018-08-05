import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { MenuList, MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';

import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import SendIcon from 'material-ui-icons/Send';

const styles = theme => ({
    menuItem: {
        '&:focus': {
            background: theme.palette.primary[500],
            '& $text, & $icon': {
                color: theme.palette.common.white,
            },
        },
    },
    text: {},
    icon: {},
});

class Navigation extends Component {
    constructor(props) {
        super(props);
    }

    handleClickButton = () => {
        this.props.handleToggleDrawer();
        this.props.history.push('/project/new');
    };

    render() {

        const {classes, open} = this.props;

        return (
            <Drawer type="persistent" open={open}>
                <div className="navigation">
                    <IconButton aria-label="close drawer" onClick={this.props.handleToggleDrawer} >
                        <ChevronLeftIcon />
                    </IconButton>

                    <Divider />

                    <MenuList>
                        <MenuItem className={classes.menuItem}>
                            <ListItemIcon className={classes.icon}>
                                <SendIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ text: classes.text }} inset primary="Projects" />
                        </MenuItem>
                        <MenuItem className={classes.menuItem}>
                            <ListItemIcon className={classes.icon}>
                                <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ text: classes.text }} inset primary="Clients" />
                        </MenuItem>
                        <MenuItem className={classes.menuItem}>
                            <ListItemIcon className={classes.icon}>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ text: classes.text }} inset primary="Templates" />
                        </MenuItem>

                        <Divider />

                        <MenuItem className={classes.menuItem}>
                            <ListItemIcon className={classes.icon}>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ text: classes.text }} inset primary="Members" />
                        </MenuItem>
                    </MenuList>

                    <Button raised onClick={this.handleClickButton} >
                        Create new project
                    </Button>
                </div>
            </Drawer>
        );
    }
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withRouter(withStyles(styles)(Navigation));



import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/user';

import SimpleReactValidator from 'simple-react-validator';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    paper: theme.mixins.gutters({
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        width: 480
    }),
    headline: {
        marginBottom: theme.spacing.unit * 3
    },
    textField: {
        width: '100%'
    }
});

class UserSignin extends Component {
    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator();

        this.state = {
            form: {
                email: '',
                password: ''
            },
            error: {
                email: null,
                password: null
            },
            validated: false
        }
    }

    handleChange = name => event => {

        const value = event.target.value;

        this.setState(s => {
            return {
                form: {
                    ...s.form,
                    [name]: value
                }
            }
        });
    };

    handleSubmitEvent = () => {
        const { validated } = this.state;
        const { email, password } = this.state.form;

        if(validated) {
            this.props.loginUser({
                email: email,
                password: password,
                error: {
                    user: null,
                    password: null
                }
            }, () => {
                const {user} = this.props;

                if(user.current.error) {

                    const error = user.current.error;

                    this.setState(s => {
                        return {
                            error: Object.assign({}, ...s.error, error)
                        }
                    }, () => {
                        this.validator.showMessages();
                        this.forceUpdate();
                    })
                }
            })
        }
    };

    validateForm = () => {
        if(!this.validator.allValid()) {
            this.validator.showMessages();
            this.forceUpdate();
        } else {
            this.setState(() => {
                return {
                    validated: true
                }
            }, () => {
                this.handleSubmitEvent()
            })
        }
    };


    render() {

        const { classes } = this.props;

        const { error } = this.state;

        const { email, password } = this.state.form;

        return (
            <div className={classNames('estimeo-login estimeo-signin', classes.container)}>

                <Paper elevation={4} className={classes.paper} >
                    <Typography className={classes.headline} type="headline" component="h2">
                        Sign in
                    </Typography>
                    <form autoComplete="off">

                        <TextField id="email"
                                   label="Email"
                                   className={classes.textField}
                                   value={email}
                                   onChange={this.handleChange('email')}
                                   type="email"
                                   margin="none"
                                   helperText={this.validator.message('email', email, 'required|email') || error.email}
                        />
                        <TextField id="password"
                                   label="Password"
                                   className={classes.textField}
                                   value={password}
                                   onChange={this.handleChange('password')}
                                   type="password"
                                   margin="none"
                                   helperText={this.validator.message('password', password, 'required|alpha_num') || error.password}
                        />

                        <Button color="primary" onClick={this.validateForm}>
                            Sign In
                        </Button>
                    </form>
                </Paper>
            </div>
        )
    }

}


UserSignin.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...actionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserSignin));

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/user';

import { withStyles } from 'material-ui/styles';
import SimpleReactValidator from 'simple-react-validator';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 480,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
    },
    button: {
        margin: theme.spacing.unit,
    }
});

class UserSignup extends Component {
    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator();

        this.state = {
            form: {
                name: '',
                surname: '',
                companyName: '',
                email: '',
                confirmEmail: '',
                password: '',
                confirmPassword: '',
            },
            isEmailSame: null,
            isPasswordSame: null,
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
        const {name, surname, companyName, email, password} = this.state.form;

        if(validated) {
            this.props.createUser({
                name: name,
                surname: surname,
                company: companyName,
                email: email,
                password: password
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
        const {name, surname, companyName, email, confirmEmail, password, confirmPassword} = this.state.form;

        const { classes } = this.props;

        return (
            <div className="estimeo-register estimeo-singup">
                Here is register
                <Paper>
                </Paper>
                <form className={classes.container} autoComplete="off">
                    <TextField id="name"
                               label="Name"
                               className={classes.textField}
                               value={name}
                               onChange={this.handleChange('name')}
                               margin="normal"
                               helperText={this.validator.message('name', name, 'required|alpha_num')}
                    />

                    <TextField id="surname"
                               label="Surname"
                               className={classes.textField}
                               value={surname}
                               onChange={this.handleChange('surname')}
                               margin="normal"
                               helperText={this.validator.message('surname', surname, 'required|alpha_num')}
                    />

                    <TextField id="company-name"
                               label="Company Name"
                               className={classes.textField}
                               value={companyName}
                               onChange={this.handleChange('companyName')}
                               margin="normal"
                               helperText={this.validator.message('company-name', companyName, 'required|alpha_num')}
                    />

                    <TextField id="email"
                               label="Email"
                               className={classes.textField}
                               value={email}
                               onChange={this.handleChange('email')}
                               autoComplete="current-email"
                               type="email"
                               margin="normal"
                               helperText={this.validator.message('email', email, 'required|email')}
                    />

                    <TextField id="confirm-email"
                               label="Confirm Email"
                               className={classes.textField}
                               value={confirmEmail}
                               onChange={this.handleChange('confirmEmail')}
                               autoComplete="current-email"
                               type="email"
                               margin="normal"
                               helperText={this.validator.message('confirm-email', confirmEmail, 'required|email')}
                    />

                    <TextField id="password"
                               label="Password"
                               className={classes.textField}
                               value={password}
                               onChange={this.handleChange('password')}
                               autoComplete="current-password"
                               type="password"
                               margin="normal"
                               helperText={this.validator.message('password', password, 'required|alpha_num')}
                    />

                    <TextField id="confirm-password"
                               label="Confirm Password"
                               className={classes.textField}
                               value={confirmPassword}
                               onChange={this.handleChange('confirmPassword')}
                               autoComplete="current-password"
                               type="password"
                               margin="normal"
                               helperText={this.validator.message('confirm-password', confirmPassword, 'required|alpha_num')}
                    />

                    <Button raised color="accent" className={classes.button} onClick={this.validateForm}>
                        Sign Up
                    </Button>
                </form>
            </div>
        )
    }
}

UserSignup.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {...state};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...actionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserSignup));

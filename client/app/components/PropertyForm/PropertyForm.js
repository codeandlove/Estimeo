import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CONFIG from '../../const/index';

import TextField from 'material-ui/TextField';

class PropertyForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
               value: null,
                edit: false,
                wait: false
        }
    }

    componentDidMount() {
        this.setState(() => {
            return {
                value: this.props.value,
                edit: this.props.edit
            }
        })
    }

    componentWillReceiveProps(newProps) {
        //console.log(newProps.value);
        this.setState(() => {
            return {
                value: newProps.value
            }
        })
    }


    handleChange = name => event => {
        const { wait } = this.state;
        const { saveOnUpdate } = this.props;

        this.setState({
            [name]: event.target.value
        }, () => {
            if(!wait && saveOnUpdate) {
                this.setState({
                    wait: true
                }, () => {
                    setTimeout(() => {

                        this.props.handlePropertyUpdate(this.state.value);

                        this.setState({
                            wait: false
                        });
                    }, CONFIG.SAVING.SAVING_TIMEOUT);
                })
            }
        });
    };

    renderInput = () => {
        const { multiline, placeholder, type, fullWidth}  = this.props;

        const { value } = this.state;

        return <TextField autoFocus={true} type={type} name="property" multiline={multiline} fullWidth={fullWidth} placeholder={placeholder} value={value} onBlur={() => this.toggleEdit()}  onChange={this.handleChange('value')} />;
    };

    toggleEdit = () => {

        this.setState(s => {
            return {
                edit: !s.edit
            }
        }, () => {
            const { edit, value } = this.state;

            if(!edit) {
                this.props.handlePropertyUpdate(value);
            }
        });
    };

    renderProperty = () => {
        const { value } = this.state;
        const { placeholder } = this.props;

        return (
            <span onClick={() => this.toggleEdit()} >{ value || placeholder }</span>
        )
    };

    render() {
        const { edit } = this.state;

        return ( edit ) ? this.renderInput() : this.renderProperty();

    }
}

PropertyForm.propTypes = {
                   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            saveOnUpdate: PropTypes.bool,
    handlePropertyUpdate: PropTypes.func
};

export default PropertyForm;

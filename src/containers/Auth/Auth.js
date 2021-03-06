import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

/**
* @author
* @class Auth
**/

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email'
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                    isEmail: true
                },
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                valid: 'false',
                validation: {
                    required: true
                },
                touched: false
            }
        },
        isSignUp: true
    }

    componentDidMount() {
        // the user does not select ingredients, and login through Authenticate button, 
        //the page should go to homepage, instead of checkout page
        if (!this.props.burgerBuilding && this.props.authenticatedPath !== '/') {
            this.props.onSetRedirectPath()
        }

    }

    

    inputChangedHandler = (event, elementName) => {
        const updatedControls = updateObject(this.state.controls, {
            [elementName]: updateObject(this.state.controls[elementName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[elementName].validation),
                touched: true
            })
        })

        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        })
    }

    render() {
        let formElementArrary = [];
        for (var key in this.state.controls) {
            formElementArrary.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = formElementArrary.map(element => (
            <Input key={element.id}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
                invalid={!element.config.valid}
                touched={element.config.touched}
                shouldValidate={element.config.validation}
                changed={(event) => this.inputChangedHandler(event, element.id)}
            />
        ))

        if (this.props.loading) {
            form = <Spinner />
        }

        let error = null;
        if (this.props.error) {
            error = <p>{this.props.error.message}</p>
        }

        let authenticated = null;
        if (this.props.isAuthenticated) {
            authenticated = <Redirect to={this.props.authenticatedPath} />
        }

        return (
            <div className={classes.Auth}>
                {authenticated}
                {error}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>Submit</Button>
                </form>

                <Button clicked={this.switchModeHandler}
                    btnType='Danger'>
                    Switch to {this.state.isSignUp ? 'Sign up' : 'Sign in'}
                </Button>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        burgerBuilding: state.burgerbuilder.building,
        authenticatedPath: state.auth.path,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetRedirectPath: () => dispatch(actions.authRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
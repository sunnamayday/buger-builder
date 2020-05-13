import React, { useEffect, useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = props => {
    const [authInfo, setAuthInfo] = useState({
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
    });
    const [isSignUp, setIsSignUp] = useState(true);
    const { burgerBuilding, authenticatedPath, onSetRedirectPath } = props;
    useEffect(() => {
        // the user does not select ingredients, and login through Authenticate button, 
        //the page should go to homepage, instead of checkout page
        if (!burgerBuilding && authenticatedPath !== '/') {
            onSetRedirectPath()
        }
    }, [onSetRedirectPath, burgerBuilding, authenticatedPath])

    const inputChangedHandler = (event, elementName) => {
        const updatedControls = updateObject(authInfo, {
            [elementName]: updateObject(authInfo[elementName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, authInfo[elementName].validation),
                touched: true
            })
        })

        setAuthInfo(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authInfo.email.value, authInfo.password.value, isSignUp);
    }

    const switchModeHandler = () => {
        setIsSignUp(!isSignUp);
    }

    let formElementArrary = [];
    for (var key in authInfo) {
        formElementArrary.push({
            id: key,
            config: authInfo[key]
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
            changed={(event) => inputChangedHandler(event, element.id)}
        />
    ))

    if (props.loading) {
        form = <Spinner />
    }

    let error = null;
    if (props.error) {
        error = <p>{props.error.message}</p>
    }

    let authenticated = null;
    if (props.isAuthenticated) {
        authenticated = <Redirect to={props.authenticatedPath} />
    }

    return (
        <div className={classes.Auth}>
            {authenticated}
            {error}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType='Success'>Submit</Button>
            </form>

            <Button clicked={switchModeHandler}
                btnType='Danger'>
                Switch to {isSignUp ? 'Sign up' : 'Sign in'}
            </Button>
        </div>
    )
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
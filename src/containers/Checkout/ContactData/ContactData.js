import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler  from '../../../hoc/withErrorHandler';
import * as orderAction from '../../../store/actions/index';
/**
* @author
* @class ContactData
**/

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                },
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                },
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                touched: false
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                },
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]

                },
                value: 'Fastest',
                validation: {},
                valid: true
            },


        },
        formValid: false
    }


    placeOrderHandler = (event) => {
        // To prevent the default which would be to send the request and reload the page
        event.preventDefault();
        // this.setState({ loading: true })

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            order: this.state.orderForm
        }
        this.props.onOrderBurger(order);
        // this.props.
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formValid: formIsValid });
    }

    checkValidity(value, rule) {
        let isValid = true;
        if (!rule) {
            return true;
        }
        if (rule.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rule.minLength) {
            isValid = isValid && value.length >= rule.minLength;
        }

        if (rule.maxLength) {
            isValid = isValid && value.length <= rule.maxLength
        }
        return isValid;
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = <form onSubmit={this.placeOrderHandler}>
            {formElementsArray.map(element => (
                <Input key={element.id}
                    elementType={element.config.elementType}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    invalid={!element.config.valid}
                    touched={element.config.touched}
                    shouldValidate={element.config.validation}
                    changed={(event) => this.inputChangedHandler(event, element.id)}
                />
            ))}
            <Button btnType='Success'
                disabled={!this.state.formValid}>Order</Button>
        </form>

        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h2><strong>Please Enter Your Contact Data</strong></h2>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerbuilder.ingredients,
        price: state.burgerbuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(orderAction.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
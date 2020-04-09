import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
/**
* @author
* @class ContactData
**/

class ContactData extends Component {
    state = {
        name: null,
        email: null,
        address: {
            street: null,
            postalCode: null
        },
        loading: false
    }


    placeOrderHandler = (event) => {
        // To prevent the default which would be to send the request and reload the page
        event.preventDefault();
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Max",
                address: {
                    street: "test street",
                    zipCode: "v8n123",
                },
                email: "test@gmail.com"
            },
            deliveryMethod: "fastest"
        }
        axios.post('/order.json', order)
            .then(response => {
                console.log(response)
                // purchasing: false to close the modal
                this.setState({ loading: false })
                this.props.history.push('/')
            }).catch(error => {
                console.log(error);
                this.setState({ loading: false })

            });
    }

    render() {
        let form = (
            <form action="">
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Email" />
                <input type="street" placeholder="Street" />
                <input type="postal" placeholder="Postal Code" />
                <Button btnType='Success' clicked={this.placeOrderHandler}>Order</Button>
            </form>
        )
        if (this.state.loading) {
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


export default ContactData
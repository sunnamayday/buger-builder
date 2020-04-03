import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Aux from '../../hoc/Aux';

/**
* @author
* @class BurgerBuilder
**/

class BurgerBuilder extends Component {
    state = {}
    render() {
        return (
            <Aux>
                <div>BurgerBuilder</div>
                <div>BurgerControls</div>
            </Aux>
        )
    }
}


BurgerBuilder.propTypes = {}
export default BurgerBuilder
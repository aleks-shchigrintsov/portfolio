import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './actions';

class __CONTAINER_NAME__ extends Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}

export default connect(state => ({
        state: '' //here should be reducer for this container from index reducers
    }),
    (dispatch) => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(__CONTAINER_NAME__);
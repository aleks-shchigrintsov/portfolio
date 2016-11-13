import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './actions';

class AboutMeContainer extends Component {
    render() {
        const aboutMeState = this.props.aboutMeState;

        return (
            <div>
                {aboutMeState.name}
            </div>
        );
    }
}

export default connect(state => ({
        aboutMeState: state.aboutMe
    }),
    (dispatch) => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(AboutMeContainer);
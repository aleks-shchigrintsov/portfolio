import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './actions';

class AboutMeContainer extends Component {
    render() {
        const { aboutMeState, aboutMeActions } = this.props;

        return (
            <div>
                {aboutMeState.name}

                <button onClick={() => aboutMeActions.changeName()}>CHANGE NAME</button>
            </div>
        );
    }
}

export default connect(state => ({
        aboutMeState: state.aboutMe
    }),
    (dispatch) => ({
        aboutMeActions: bindActionCreators(actions, dispatch)
    })
)(AboutMeContainer);
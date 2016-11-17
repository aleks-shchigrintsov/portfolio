import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import * as actions from './actions';

import LogoComponent from 'LogoComponent';
import NavBarLinkComponent from 'NavBarLinkComponent';

import styles from './NavBarComponent.modules.css'

const NavBarComponent = ({navBarState}) => {
    const { links } = navBarState;

    return (
        <div className={styles.navBarComponent}>
            <LogoComponent />


            <div className={styles.linksContainer}>
                {links.map(link => {
                    return (
                        <NavBarLinkComponent
                            key={link.url}
                            linkUrl={link.url}
                            linkText={link.text}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default connect(state => ({
        navBarState: state.navBar
    }),
    (dispatch) => ({
        // aboutMeActions: bindActionCreators(actions, dispatch)
    })
)(NavBarComponent);
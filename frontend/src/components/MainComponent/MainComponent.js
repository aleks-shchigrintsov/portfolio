import React, { Component, PropTypes, cloneElement } from 'react';

import NavBarComponent from 'NavBarComponent';

import styles from './MainComponent.modules.css'

export default class MainComponent extends Component {
    render() {
        const { children } = this.props;

        return (
            <div className={styles.mainComponent}>
                <NavBarComponent />

                {children && cloneElement(children, this.props)}
            </div>
        );
    }
};
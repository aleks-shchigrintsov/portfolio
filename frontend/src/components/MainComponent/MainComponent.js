import React, { Component, PropTypes, cloneElement } from 'react';

import styles from './MainComponent.modules.css'

export default class MainComponent extends Component {
    render() {
        return (
            <div className={styles.mainComponent}>
                {cloneElement(this.props.children, this.props)}
            </div>
        );
    }
};
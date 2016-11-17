import React, { PropTypes } from 'react';

import { Link } from 'react-router';

import styles from './NavBarLinkComponent.modules.css'

const propTypes = {
    linkText: PropTypes.string,
    linkUrl: PropTypes.string
};

const NavBarLinkComponent = ({linkText, linkUrl}) => {
    return (
        <Link
            to={linkUrl}
            className={styles.navBarLinkComponent}
            activeClassName={styles.active}
        >
            {linkText}
        </Link>
    );
};

NavBarLinkComponent.propTypes = propTypes;

export default NavBarLinkComponent;
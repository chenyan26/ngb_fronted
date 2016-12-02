/**
 * Created by echo on 2016/12/2.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import styles from './Home.less';
var classNames = require('classnames');

const propTypes = {
};

class Home extends Component {

    render(){
        return (
                <div>
                    home
                </div>
        );
    }
}

Home.propTypes = {
};

export default Home;

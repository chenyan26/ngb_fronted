/**
 * Created by echo on 2016/12/5.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
// import { Button, Table, Popconfirm } from 'antd';
//
// import styles from './Individual.less';

class Biz extends React.Component {

    componentWillMount() {
        // const { dispatch } = this.props;
        // dispatch({
        //     type: 'Individual/query',
        // });
    }

    render() {

        return (
                <div>
                    服务号
                </div>
        );
    }
}

Biz.propTypes = {
    // list: PropTypes.array.isRequired,
    // homeActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        // list : state.individual.list
    }
}

export default connect(mapStateToProps)(Biz)

/**
 * Created by echo on 2016/12/2.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Button, Table, Popconfirm } from 'antd';

import styles from './Individual.less';

const columns = [{
    title: 'id',
    dataIndex: 'id',
    width: 50,
}, {
    title: 'number',
    dataIndex: 'number',
    width: 150,
}, {
    title: 'mobile',
    dataIndex: 'mobile',
    width: 150,
}, {
    title: 'name',
    dataIndex: 'name',
    width: 150,
}, {
    key: 'edit',
    width: 50,
    render: (text, record) => (
            <p>
                <a onClick={() => onEditItem(record)}>编辑</a>
            </p>
    ),
}, {
    key: 'delete',
    width: 50,
    render: (text, record) => (
            <p>
                <Popconfirm title="确定要删除吗？" onConfirm={() => onDeleteItem(record.id)}>
                    <a>删除</a>
                </Popconfirm>
            </p>
    ),
}];
/*
const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        id: `${i}`,
        number: `88888888${i}`,
        mobile: `88888888${i}`,
        name: `用户名 ${i}`,
    });
}
*/
const data = [];
class Individual extends React.Component {

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'individual/query',
        });
    }

    render() {
        const { list } = this.props;
        list.map((obj, i) => {
            data[i] = {
                key: i,
                id: obj.id,
                number: obj.number,
                mobile: obj.mobile,
                name: obj.name
            }
        });

        return (
                <div>
                    <Button type="primary" className={styles.add_btn}>添加用户</Button>
                    <Table columns={columns}
                           dataSource={data}
                           pagination={{ pageSize: 50 }}
                           scroll={{ y: 500 }} />
                </div>
        );
    }
}

Individual.propTypes = {
    list: PropTypes.array.isRequired,
    // homeActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        list : state.individual.list
    }
}

export default connect(mapStateToProps)(Individual)

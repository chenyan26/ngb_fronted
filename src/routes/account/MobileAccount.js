/**
 * Created by echo on 2016/12/20.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Button, Table, Modal } from 'antd';

import styles from './MobileAccount.less';

class MobileAccount extends React.Component {

    state = {
        selectedRows: [],
        confirmVisible: false
    };

    componentWillMount() {
        const { dispatch } = this.props;
        console.log("MobileAccount-componentWillMount");
        dispatch({
            type: 'account/query',
            payload: {type: 1}
        });
    }

    //---------------- Table 相关--------------------

    showDeleteConfirm = () => {
        this.setState({
            confirmVisible: true
        })
    };

    onDelete = () => {
        const { dispatch } = this.props;
        let idArr = [];
        this.state.selectedRows.map((obj, i)=> {
            idArr.push(obj.id);
        });
        console.log(idArr); //[1,4,5]
        this.setState({
            confirmVisible: false,
            selectedRows: []
        });
        dispatch({
            type: 'account/delete',
            payload:  {
                ids: idArr,
                type: 1
            }
        });
    };

    handleConfirmCancle = ()=> {
        this.setState({
            confirmVisible: false
        });
    };

    renderTable = () => {
        const columns = [{
            title: '克拉号',
            dataIndex: 'number',
            width: 80,
        }, {
            title: '注册日期',
            dataIndex: 'register_date',
            width: 120,
        }, {
            title: '最近一次登录日期',
            dataIndex: 'lately_date',
            width: 120,
        }];

        let data = [];
        const { mobileList, loading } = this.props;

        mobileList.map((obj, i) => {
            data[i] = {
                key: i,
                id: obj.id,
                number: obj.number,
                register_date: obj.register_date,
                lately_date: obj.lately_date
            }
        });

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({
                    selectedRows : selectedRows
                })
            },
        };

        return (
                <div>
                    <Button type="primary"
                            className={styles.delete_btn}
                            disabled = {this.state.selectedRows.length ? false : true}
                            onClick={this.showDeleteConfirm}>
                        删除手机用户
                    </Button>
                    <Table rowSelection={rowSelection}
                           columns={columns}
                           dataSource={data}
                           pagination={{ pageSize: 30 }}
                           loading={loading}
                           rowKey={record => record.id}
                           scroll={{ y: 500 }} />
                </div>
        );
    };

    //----------------render--------------------
    renderError = ()=> {
        const { errorModalVisible, dispatch, error } = this.props;
        if (errorModalVisible) {
            Modal.error({
                title: '提示',
                content: (
                        <div>
                            <br/>
                            <p>请求失败，请重试</p>
                            <br/>
                            <p>错误error：{error}</p>
                        </div>),
                onOk(){
                    dispatch({
                        type: 'user/hideErrorModal',
                    });
                },
            });
        }
    };

    render() {
        return (
                <div>
                    {this.renderTable()}
                    <Modal width="350"
                           visible={this.state.confirmVisible}
                           onOk={this.onDelete}
                           onCancel={this.handleConfirmCancle}
                           okText="确定" cancelText="取消">
                        <p className={styles.confirm_p}>确定要删除选中的手机用户吗？</p>
                    </Modal>
                    {this.renderError()}
                </div>
        );
    }
}

MobileAccount.propTypes = {
    mobileList: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    errorModalVisible: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        mobileList : state.account.mobileList,
        loading : state.account.loading,
        errorModalVisible: state.account.errorModalVisible
    }
}

export default connect(mapStateToProps)(MobileAccount)
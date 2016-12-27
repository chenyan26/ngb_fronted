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

    componentDidUpdate(prevProps, prevState, prevContext) {
        const { errorModalVisible, dispatch, error } = this.props;
        if (errorModalVisible) {
            Modal.warning({
                title: '提示',
                content: (
                        <div>
                            <br/>
                            <p>请求失败，请重试</p>
                            <br/>
                            <p className={styles.error_p}>{error}</p>
                        </div>
                ),
                onOk(){
                    dispatch({
                        type: 'account/hideErrorModal',
                    });
                },
            });
        }
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
                type: 0
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
                <Table rowSelection={rowSelection}
                       columns={columns}
                       dataSource={data}
                       pagination={{ pageSize: 30 }}
                       loading={loading}
                       rowKey={record => record.id}
                       scroll={{ y: 500 }} />
        );
    };

    //----------------render--------------------

    render() {
        return (
                <div>
                    <Button type="primary"
                            className={styles.delete_btn}
                            disabled = {this.state.selectedRows.length ? false : true}
                            onClick={this.showDeleteConfirm}>
                        删除手机用户
                    </Button>
                    {this.renderTable()}
                    <Modal style={{top:300}}
                           visible={this.state.confirmVisible}
                           onOk={this.onDelete}
                           onCancel={this.handleConfirmCancle}
                           okText="确定" cancelText="取消">
                        <p className={styles.confirm_p}>确定要删除选中的手机用户吗？</p>
                    </Modal>
                </div>
        );
    }
}

MobileAccount.propTypes = {
    mobileList: PropTypes.array.isRequired,
    errorModalVisible: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        mobileList : state.account.mobileList,
        loading : state.loading.models.account,
        errorModalVisible: state.account.errorModalVisible,
        error: state.account.error
    }
}

export default connect(mapStateToProps)(MobileAccount)

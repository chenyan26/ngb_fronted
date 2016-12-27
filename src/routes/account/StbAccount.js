/**
 * Created by echo on 2016/12/20.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Button, Table, Modal } from 'antd';

import styles from './StbAccount.less';

class StbAccount extends React.Component {

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
            title: '激活日期',
            dataIndex: 'register_date',
            width: 120,
        }, {
            title: '最近一次登录日期',
            dataIndex: 'lately_date',
            width: 120,
        }];

        let data = [];
        const { stbList, loading } = this.props;

        stbList.map((obj, i) => {
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
                        删除机顶盒用户
                    </Button>
                    {this.renderTable()}
                    <Modal style={{top:300}}
                           visible={this.state.confirmVisible}
                           onOk={this.onDelete}
                           onCancel={this.handleConfirmCancle}
                           okText="确定" cancelText="取消">
                        <p className={styles.confirm_p}>确定要删除选中的机顶盒用户吗？</p>
                    </Modal>
                </div>
        );
    }
}

StbAccount.propTypes = {
    stbList: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    errorModalVisible: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        stbList : state.account.stbList,
        loading : state.account.loading,
        errorModalVisible: state.account.errorModalVisible,
        error: state.account.error
    }
}

export default connect(mapStateToProps)(StbAccount)

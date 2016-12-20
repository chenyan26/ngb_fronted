/**
 * Created by echo on 2016/12/9.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Button, Table, Modal } from 'antd';

import styles from './Customer.less';
import CustomerModal from '../components/CustomerModal';

class Customer extends React.Component {

    state = {
        selectedRows: [],
        confirmVisible: false
    };

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'customer/query',
        });
    }

    //---------------- Modal 相关--------------------

    renderModal = ()=> {
        const { modalVisible , newModal, currentItem, dispatch} = this.props;
        if (modalVisible) {
            const customerModalProps = {
                item: newModal ? {} : currentItem,
                visible: modalVisible,

                onOk(data) {
                    if (newModal) {
                        console.log("提交新建");
                        dispatch({
                            type: 'customer/create',
                            payload: data,
                        });
                    } else {
                        console.log("提交编辑");
                        dispatch({
                            type: 'customer/update',
                            payload: data,
                        });
                    }
                },
                onCancel() {
                    dispatch({
                        type: 'customer/hideModal',
                    });
                },
            };

            return (
                    <CustomerModal {...customerModalProps}/>
            )
        }
    };

    //---------------- Table 相关--------------------

    onAdd = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'customer/showModal',
            payload: {
                newModal: true,
            },
        });
    };

    onEditItem = (record) => {
        console.log(record);
        const { dispatch } = this.props;
        dispatch({
            type: 'customer/showModal',
            payload: {
                newModal: false,
                currentItem: {...record, key:undefined},
            },
        });
    };

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
            type: 'customer/delete',
            payload:  {ids: idArr}
        });
    };

    handleConfirmCancle = ()=> {
        this.setState({
            confirmVisible: false
        });
    };

    renderTable = () => {
        const columns = [{
            title: '姓名',
            dataIndex: 'name',
            width: 80,
        }, {
            title: '性别',
            dataIndex: 'gender',
            width: 50,
        }, {
            title: '年龄',
            dataIndex: 'age',
            width: 40,
        }, {
            title: '地址',
            dataIndex: 'address',
            width: 200,
        }, {
            title: '手机',
            dataIndex: 'mobile',
            width: 100,
        }, {
            title: '序列号',
            dataIndex: 'serial_number',
            width: 100,
        },  {
            title: '操作',
            key: 'edit',
            width: 50,
            render: (text, record) => ( //每一个行的信息 data[record.id]
                    <p>
                        <a onClick={() => this.onEditItem(record)}>修改</a>
                    </p>
            ),
        }];

        let data = [];
        const { list, loading } = this.props;
        list.map((obj, i) => {
            data[i] = {
                key: i,
                id: obj.id,
                name: obj.name,
                gender: obj.gender,
                age: obj.age,
                address: obj.address,
                mobile: obj.mobile,
                serial_number: obj.serial_number,
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
                            className={styles.add_btn}
                            onClick={this.onAdd}>
                        新增客户
                    </Button>
                    <Button type="primary"
                            className={styles.delete_btn}
                            disabled = {this.state.selectedRows.length ? false : true}
                            onClick={this.showDeleteConfirm}>
                        删除客户
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

    render() {
        return (
                <div>
                    {this.renderTable()}
                    {this.renderModal()}
                    <Modal width="350"
                           visible={this.state.confirmVisible}
                           onOk={this.onDelete}
                           onCancel={this.handleConfirmCancle}
                           okText="确定" cancelText="取消">
                        <p className={styles.confirm_p}>确定要删除选中的客户信息吗？</p>
                    </Modal>
                </div>
        );
    }
}

Customer.propTypes = {
    list: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    modalVisible: PropTypes.bool.isRequired,
    newModal: PropTypes.bool.isRequired,
    currentItem: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        list : state.customer.list,
        loading : state.customer.loading,
        modalVisible: state.customer.modalVisible,
        newModal: state.customer.newModal,
        currentItem: state.customer.currentItem,
    }
}

export default connect(mapStateToProps)(Customer)

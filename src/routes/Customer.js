/**
 * Created by echo on 2016/12/9.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Button, Table, Popconfirm } from 'antd';

import styles from './Customer.less';
import CustomerModal from '../components/CustomerModal'

class Customer extends React.Component {

    state = {
        selectedRows : [],
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
            // const submitStatue = this.state.mobile ? "" : "disabled";

            const customerModalProps = {
                item: newModal ? {} : currentItem,
                type: newModal,
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
                currentItem: record,
            },
        });
    };

    onDelete = () => {
        const { dispatch } = this.props;
        let idArr = [];
        this.state.selectedRows.map((obj, i)=> {
            idArr.push(obj.id);
        });
        console.log(idArr); //[1,4,5]
        dispatch({
            type: 'customer/delete',
            payload:  {ids: idArr}
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
            width: 50,
        }, {
            title: '地址',
            dataIndex: 'addr',
            width: 200,
        }, {
            title: '手机',
            dataIndex: 'mobile',
            width: 120,
        }, {
            title: '电话',
            dataIndex: 'tel',
            width: 120,
        }, {
            title: 'STB状态',
            dataIndex: 'stb_status',
            width: 70,
        }, {
            title: 'Mobile状态',
            dataIndex: 'mobile_status',
            width: 70,
        }, {
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

        const stbs = { 0 : "未绑定", 1 : "未激活", 2 : "激活" };
        const mobs = { 0 : "未绑定", 1 : "僵死", 2 : "活跃" };

        list.map((obj, i) => {
            const {[obj.stb_status] : ss} = stbs;
            const {[obj.mobile_status] : ms} = mobs;

            data[i] = {
                key: i,
                id: obj.id,
                name: obj.name,
                gender: obj.gender,
                age: obj.age,
                addr: obj.addr,
                mobile: obj.mobile,
                tel: obj.tel,
                stb_status: ss,
                mobile_status: ms
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
                            onClick={this.onDelete}>
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
    }

    //----------------render--------------------

    render() {
        return (
                <div>
                    {this.renderTable()}
                    {this.renderModal()}
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

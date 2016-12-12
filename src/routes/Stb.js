/**
 * Created by echo on 2016/12/12.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Button, Table, Modal } from 'antd';

import styles from './Stb.less';
import StbModal from '../components/StbModal';

class Stb extends React.Component {

    state = {
        selectedRows: [],
        confirmVisible: false
    };

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'stb/query',
        });
    }

    //---------------- Modal 相关--------------------

    renderModal = ()=> {
        const { modalVisible , newModal, currentItem, dispatch} = this.props;
        if (modalVisible) {
            const stbModalProps = {
                item: newModal ? {} : currentItem,
                isEmpty: newModal,
                visible: modalVisible,

                onOk(data) {
                    if (newModal) {
                        console.log("提交新建");
                        dispatch({
                            type: 'stb/create',
                            payload: data,
                        });
                    } else {
                        console.log("提交编辑");
                        dispatch({
                            type: 'stb/update',
                            payload: data,
                        });
                    }
                },
                onCancel() {
                    dispatch({
                        type: 'stb/hideModal',
                    });
                },
            };

            return (
                    <StbModal {...stbModalProps}/>
            )
        }
    };

    //---------------- Table 相关--------------------

    onAdd = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'stb/showModal',
            payload: {
                newModal: true,
            },
        });
    };

    onEditItem = (record) => {
        console.log(record);
        const { dispatch } = this.props;
        dispatch({
            type: 'stb/showModal',
            payload: {
                newModal: false,
                currentItem: record,
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
            type: 'stb/delete',
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
            title: '状态',
            dataIndex: 'status',
            width: 70,
        }, {
            title: '购买日期',
            dataIndex: 'buy_date',
            width: 120,
        }, {
            title: '激活日期',
            dataIndex: 'activate_date',
            width: 120,
        },{
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

        const status = { 0: "未激活", 1 : "已激活" };

        list.map((obj, i) => {
            const {[obj.status] : ss} = status;

            data[i] = {
                key: i,
                id: obj.id,
                name: obj.name,
                gender: obj.gender,
                age: obj.age,
                addr: obj.addr,
                mobile: obj.mobile,
                tel: obj.tel,
                buy_date: obj.buy_date,
                activate_date: obj.activate_date,
                status: ss
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

Stb.propTypes = {
    list: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    modalVisible: PropTypes.bool.isRequired,
    newModal: PropTypes.bool.isRequired,
    currentItem: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        list : state.stb.list,
        loading : state.stb.loading,
        modalVisible: state.stb.modalVisible,
        newModal: state.stb.newModal,
        currentItem: state.stb.currentItem,
    }
}

export default connect(mapStateToProps)(Stb)

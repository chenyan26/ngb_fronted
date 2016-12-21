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
        console.log("Stb-componentWillMount");
        dispatch({
            type: 'stb/query',
        });
    }

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
                        type: 'stb/hideErrorModal',
                    });
                },
            });
        }
    }

    //---------------- Modal 相关--------------------

    renderModal = ()=> {
        const { modalVisible, dispatch} = this.props;
        if (modalVisible) {
            const stbModalProps = {
                visible: modalVisible,
                onOk(data) {
                    console.log("提交新建");
                    dispatch({
                        type: 'stb/create',
                        payload: data,
                    });
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
            title: '序列号',
            dataIndex: 'serial_number',
            width: 80,
        }, {
            title: 'CA号',
            dataIndex: 'ca_number',
            width: 80,
        }, {
            title: '系统版本',
            dataIndex: 'system_version',
            width: 80,
        }, {
            title: '激活日期',
            dataIndex: 'register_date',
            width: 120,
        }];

        let data = [];
        const { list, loading } = this.props;

        list.map((obj, i) => {
            // const {[obj.status] : ss} = status;

            data[i] = {
                key: i,
                id: obj.id,
                serial_number: obj.serial_number,
                ca_number: obj.ca_number,
                system_version: obj.system_version,
                register_date: obj.register_date
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
                        新增机顶盒终端
                    </Button>
                    <Button type="primary"
                            className={styles.delete_btn}
                            disabled = {this.state.selectedRows.length ? false : true}
                            onClick={this.showDeleteConfirm}>
                        删除机顶盒终端
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
                        <p className={styles.confirm_p}>确定要删除选中的机顶盒终端吗？</p>
                    </Modal>
                </div>
        );
    }
}

Stb.propTypes = {
    list: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    modalVisible: PropTypes.bool.isRequired,
    errorModalVisible: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        list : state.stb.list,
        loading : state.stb.loading,
        modalVisible: state.stb.modalVisible,
        errorModalVisible: state.stb.errorModalVisible,
        error: state.stb.error
    }
}

export default connect(mapStateToProps)(Stb)

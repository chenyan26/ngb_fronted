/**
 * Created by echo on 2016/12/20.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Button, Table, Modal } from 'antd';

import styles from './Content.less';
import ContentModal from '../components/ContentModal';

class Content extends React.Component {

    state = {
        selectedRows: [],
        confirmVisible: false
    };

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'content/query',
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
                        type: 'content/hideErrorModal',
                    });
                },
            });
        }
    }

    //---------------- Modal 相关--------------------

    renderModal = ()=> {
        const { modalVisible , newModal, currentItem, dispatch} = this.props;
        if (modalVisible) {
            const customerModalProps = {
                item: newModal ? {} : currentItem,
                visible: modalVisible,
                isEmpty: newModal,
                onOk(data) {
                    if (newModal) {
                        console.log("提交新建");
                        dispatch({
                            type: 'content/create',
                            payload: data,
                        });
                    } else {
                        console.log("提交编辑");
                        dispatch({
                            type: 'content/update',
                            payload: data,
                        });
                    }
                },
                onCancel() {
                    dispatch({
                        type: 'content/hideModal',
                    });
                },
            };

            return (
                    <ContentModal {...customerModalProps}/>
            )
        }
    };

    //---------------- Table 相关--------------------

    onAdd = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'content/showModal',
            payload: {
                newModal: true,
            },
        });
    };

    onEditItem = (record) => {
        console.log("编辑："+record);
        const { dispatch } = this.props;
        dispatch({
            type: 'content/showModal',
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
            type: 'content/delete',
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
            title: '海报',
            // dataIndex: 'poster',
            width: 60,
            render: (text, record) => (
                    <img src={record.poster} style={{ width: "80%", height: 80 }}/>
            )
        }, {
            title: '名字',
            dataIndex: 'name',
            width: 70,
        }, {
            title: '年份',
            dataIndex: 'year',
            width: 40,
        }, {
            title: '导演',
            dataIndex: 'director',
            width: 60,
        }, {
            title: '演员',
            dataIndex: 'actors',
            width: 100,
        }, {
            title: '地区',
            dataIndex: 'region',
            width: 50,
        }, {
            title: '简介',
            dataIndex: 'synopsis',
            width: 200,
        }, {
            title: '标签',
            // dataIndex: 'tags',
            key: 'tags',
            width: 70,
            render: (text, record) => { //每一个行的信息 data[record.id]
                return(
                        <div>
                            {record.tags ? record.tags.map((obj, i) => {
                                return (
                                        <p key={i}>
                                            {obj}
                                        </p>
                                );
                            }) : ""
                            }
                        </div>
                );
            },
        }, {
            title: '操作',
            key: 'edit',
            width: 40,
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
                poster: obj.poster,
                name: obj.name,
                year: obj.year,
                director: obj.director,
                actors: obj.actors,
                region: obj.region,
                synopsis: obj.synopsis,
                tags: obj.tags,
                url:obj.url
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
                            className={styles.add_btn}
                            onClick={this.onAdd}>
                        新增视频
                    </Button>
                    <Button type="primary"
                            className={styles.delete_btn}
                            disabled = {this.state.selectedRows.length ? false : true}
                            onClick={this.showDeleteConfirm}>
                        删除视频
                    </Button>
                    {this.renderTable()}
                    {this.renderModal()}
                    <Modal style={{top:300}}
                           visible={this.state.confirmVisible}
                           onOk={this.onDelete}
                           onCancel={this.handleConfirmCancle}
                           okText="确定" cancelText="取消">
                        <p className={styles.confirm_p}>确定要删除选中的视频吗？</p>
                    </Modal>
                </div>
        );
    }
}

Content.propTypes = {
    list: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    modalVisible: PropTypes.bool.isRequired,
    newModal: PropTypes.bool.isRequired,
    currentItem: PropTypes.object.isRequired,
    errorModalVisible: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        list : state.content.list,
        loading : state.content.loading,
        modalVisible: state.content.modalVisible,
        newModal: state.content.newModal,
        currentItem: state.content.currentItem,
        errorModalVisible: state.content.errorModalVisible,
        error: state.content.error
    }
}

export default connect(mapStateToProps)(Content)

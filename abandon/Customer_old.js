/**
 * Created by echo on 2016/12/9.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Button, Table, Popconfirm, Modal, Form, Input } from 'antd';
const FormItem = Form.Item;

import styles from '../src/routes/Customer.less';

class Customer_old extends React.Component {

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'customer/query',
        });
    }

    //---------------- Modal 相关--------------------

    handleOk = ()=> {
        const { dispatch, newModal } = this.props;
        if (newModal) {
            console.log("提交新建");
            dispatch({
                type: 'customer/create',
                payload: {
                    name: "",
                    gender: "",
                    age: "",
                    addr: "",
                    mobile: "",
                    tel: "",
                    stb_status: "",
                    mobile_status: ""
                },
            });
        } else {
            console.log("提交编辑");
            dispatch({
                type: 'customer/update',
                payload: {
                    name: this.state.name,
                    gender: this.state.gender,
                    age: this.state.age,
                    addr: this.state.addr,
                    mobile: this.state.mobile,
                    tel: this.state.tel,
                    stb_status: this.state.stb_status,
                    mobile_status: this.state.mobile_status
                },
            });
        }
    };

    handleCancel = ()=> {
        const { dispatch } = this.props;
        dispatch({
            type: 'customer/hideModal',
        });
    };

    handleNumberChange = (e)=> {
        this.setState({
            number: e.target.value
        });
    };
    handleMobileChange = (e)=> {
        this.setState({
            mobile: e.target.value
        });
    };
    handleNameChange = (e)=> {
        this.setState({
            name: e.target.value
        });
    };
    handleDevice_idChange = (e)=> {
        this.setState({
            device_id: e.target.value
        });
    };

    renderModal = ()=> {
        const { modalVisible } = this.props;
        if (modalVisible) {
            const formItemLayout = {
                labelCol: {
                    span: 6,
                },
                wrapperCol: {
                    span: 14,
                },
                hasFeedback: true
            };

            // const submitStatue = this.state.mobile ? "" : "disabled";

            return (
                    <Modal  visible={modalVisible}
                            title="个人号"
                            maskClosable={false}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            footer={[
                                <Button key="back" type="ghost" size="large"
                                        onClick={this.handleCancel}>取消</Button>,
                                <Button key="submit" type="primary" size="large"
                                        disabled = {this.state.number ? false : true}
                                        onClick={this.handleOk} >提交</Button>
                            ]}
                    >
                        <Form horizontal>
                            <FormItem
                                    label="姓名"
                                    {...formItemLayout}
                                    validateStatus= {this.state.name ? "success" : "error"}    //"error"
                                    help={this.state.name ? "" : "不能为空"}>
                                <Input id="number"
                                       type="text"
                                       defaultValue={ this.state.name }
                                       onChange={this.handleNumberChange}/>
                            </FormItem>
                            <FormItem
                                    label="性别"
                                    {...formItemLayout}
                                    validateStatus= "success">
                                <Input id="gender"
                                       type="number"
                                       defaultValue={this.state.gender}
                                       onChange={this.handleMobileChange}/>
                            </FormItem>
                            <FormItem
                                    label="name"
                                    {...formItemLayout}
                                    validateStatus= "success">
                                <Input id="name"
                                       type="text"
                                       defaultValue={this.state.name}
                                       onChange={this.handleNameChange}/>
                            </FormItem>
                            <FormItem
                                    label="device_id"
                                    {...formItemLayout}
                                    validateStatus= "success">
                                <Input id="device_id"
                                       type="text"
                                       defaultValue={this.state.device_id}
                                       onChange={this.handleDevice_idChange}/>
                            </FormItem>
                        </Form>
                    </Modal>
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

        this.setState({
            number: "",
            mobile: "",
            name: "",
            device_id: ""
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

        this.setState({ number: record.number,
            mobile: record.mobile,
            name: record.name,
            device_id: record.device_id
        });
    };

    onDeleteItem = (id) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'customer/delete',
            payload: id
        });
    };

    renderTable() {
        const columns = [{
            title: 'id',
            dataIndex: 'id',
            width: 50,
        }, {
            title: 'number',
            dataIndex: 'number',
            width: 140,
        }, {
            title: 'mobile',
            dataIndex: 'mobile',
            width: 140,
        }, {
            title: 'name',
            dataIndex: 'name',
            width: 140,
        }, {
            title: 'device_id',
            dataIndex: 'device_id',
            width: 140,
        }, {
            key: 'edit',
            width: 50,
            render: (text, record) => ( //每一个行的信息 data[record.id]
                    <p>
                        <a onClick={() => this.onEditItem(record)}>编辑</a>
                    </p>
            ),
        }, {
            key: 'delete',
            width: 50,
            render: (text, record) => (
                    <p>
                        <Popconfirm title="确定要删除吗？" onConfirm={() => this.onDeleteItem(record.id)}>
                            <a>删除</a>
                        </Popconfirm>
                    </p>
            ),
        }];

        let data = [];
        const { list, loading } = this.props;
        list.map((obj, i) => {
            data[i] = {
                key: i,
                id: obj.id,
                number: obj.number,
                mobile: obj.mobile,
                name: obj.name,
                device_id: obj.device_id
            }
        });

        return (
                <Table columns={columns}
                       dataSource={data}
                       pagination={{ pageSize: 30 }}
                       loading={loading}
                       rowKey={record => record.id}
                       scroll={{ y: 500 }} />
        );
    }

    //----------------render--------------------

    render() {
        return (
                <div>
                    <Button type="primary" className={styles.add_btn} onClick={this.onAdd}>新建个人号</Button>
                    {this.renderTable()}
                    {this.renderModal()}
                </div>
        );
    }
}

Customer_old.propTypes = {
    list: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    modalVisible: PropTypes.bool.isRequired,
    newModal: PropTypes.bool.isRequired,
    currentItem: PropTypes.object.isRequired,
    form:PropTypes.object
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

export default connect(mapStateToProps)(Customer_old)

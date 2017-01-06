/**
 * Created by echo on 2016/12/9.
 */

import React, { Component, PropTypes } from 'react';
import { Button, Modal, Form, Input, Select, Icon} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import styles from './CustomerModal.less';

class CustomerModal extends React.Component {

    handleCancel = ()=> {
        const { onCancel } = this.props;
        onCancel();
    };

    handleOk = ()=> {
        const { validateFields, getFieldValue } = this.props.form;
        const { onOk, item } = this.props;

        validateFields((errors) => {
            if (errors) {
                return;
            }

            const data = {
                // ...getFieldsValue(),
                id: item.id,

                name:getFieldValue("name"),
                gender: Number(getFieldValue("gender")),
                age:getFieldValue("age"),
                address:getFieldValue("address"),
            };
            onOk(data);
        });
    };

    checkAge = (rule, value, callback)=> {
        if (value && !/^[\d]{1,3}$/.test(value)){
            callback(new Error('请输入正确年龄'));
        } else {
            callback();
        }
    };

    checkMobile = (rule, value, callback)=> {
        if (value && !/^1[3|4|5|7|8][0-9]{9}$/.test(value)) {
            callback(new Error('请输入正确的手机号'));
        } else {
            callback();
        }
    };

    render() {
        const { visible , item, isEmpty} = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
                <Modal  visible={visible}
                        title="客户信息"
                        maskClosable={false}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" type="ghost" size="large"
                                   onClick={this.handleCancel}
                            >取消</Button>,
                            <Button key="submit" type="primary" size="large"
                                    //  disabled = {this.state.number ? false : true}
                                    onClick={this.handleOk}
                            >提交</Button>
                        ]}
                >
                    <Form horizontal onSubmit={this.handleSubmit}>
                        <FormItem
                                {...formItemLayout}
                                label="姓名"
                                hasFeedback
                        >
                            {getFieldDecorator('name', {
                                initialValue: item.name,
                                rules: [
                                    { required: true, message: '姓名不能为空' },
                                ],
                            })(
                                    <Input type="text"/>
                            )}
                        </FormItem>
                        <FormItem
                                {...formItemLayout}
                                label="性别"
                        >
                            {getFieldDecorator('gender', { initialValue: `${isEmpty ? "0" : item.gender}`})(
                                    <Select>
                                        <Option value="0">男</Option>
                                        <Option value="1">女</Option>
                                    </Select>
                            )}
                        </FormItem>
                        <FormItem
                                {...formItemLayout}
                                label="年龄"
                        >
                            {getFieldDecorator('age', {
                                initialValue: item.age,
                                rules: [
                                    { validator: this.checkAge },
                                ],
                                })(
                                    <Input type="number"/>
                            )}
                        </FormItem>
                        <FormItem
                                {...formItemLayout}
                                label="地址"
                        >
                            {getFieldDecorator('address', { initialValue: item.address })(
                                    <Input type="text"/>
                            )}
                        </FormItem>
                        <FormItem
                                {...formItemLayout}
                                label="手机"
                        >
                            {getFieldDecorator('mobile', {
                                initialValue: item.mobile,
                                rules: [
                                    { validator: this.checkMobile },
                                ],
                            })(
                                    <Input type="number"/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
        );
    }
}

CustomerModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    isEmpty: PropTypes.bool.isRequired,
};

export default Form.create()(CustomerModal);
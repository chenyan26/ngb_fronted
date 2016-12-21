/**
 * Created by echo on 2016/12/9.
 */

import React, { Component, PropTypes } from 'react';
import { Button, Modal, Form, Input, Select, Icon} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

let uuid = 0;

import styles from './CustomerModal.less';

class CustomerModal extends React.Component {

    componentWillMount() {
        const { item, isEmpty} = this.props;
        let objs = [0];
        if (!isEmpty) {
            uuid = item.serial_number.length - 1;
            for (let i = 1; i < item.serial_number.length; i++) {
                objs.push(i);
            }
        }
        this.props.form.setFieldsValue({
            keys: objs,
        });
    }

    remove = (k) => {
        const { getFieldValue, setFieldsValue } = this.props.form;
        // can use data-binding to get
        const keys = getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    add = () => {
        uuid++;
        const { getFieldValue, setFieldsValue } = this.props.form;
        // can use data-binding to get
        const keys = getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        // can use data-binding to set
        // important! notify form to detect changes
        setFieldsValue({
            keys: nextKeys,
        });
    };

    handleCancel = ()=> {
        const { onCancel } = this.props;
        onCancel();
    };

    handleOk = ()=> {
        const { getFieldsValue, validateFields, getFieldValue} = this.props.form;
        const { onOk, item } = this.props;

        const keys = getFieldValue('keys');
        let ser = [];
        keys.map((k, i) => {
            if (getFieldValue(`serial_${k}`).length){ //空的序列号不提交
                ser.push(getFieldValue(`serial_${k}`));
            }
        });
        console.log("ser:" + ser);

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

                serial_number: ser
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
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        const formItemLayoutWithOutLabel = {
            wrapperCol: { span: 14, offset: 6 },
        };

        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            let it = "";
            if (!isEmpty) {
                it = item.serial_number[k] ? item.serial_number[k] :"";
            }
            return (
                    <FormItem
                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                            label={index === 0 ? '序列号' : ''}
                            required={false}
                            key={k}
                    >
                        {getFieldDecorator(`serial_${k}`, {
                            initialValue: it,
                            validateTrigger: ['onChange', 'onBlur']
                        })(
                                <Input type="text" style={{ width: '70%', marginRight: 8 }}/>
                        )}
                        <Icon
                                className={styles.dynamic_delete_button}
                                type="minus-circle-o"
                                disabled={keys.length == 1}
                                onClick={() => this.remove(k)}
                        />
                    </FormItem>
            );
        });

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
                            {getFieldDecorator('gender', { initialValue: `${item.gender ? "女" : "男"}`})(
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

                        {formItems}

                        <FormItem {...formItemLayoutWithOutLabel}>
                            <Button type="dashed"
                                    onClick={this.add}
                                    style={{ width: '80%' }}>
                                <Icon type="plus" /> 添加序列号
                            </Button>
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
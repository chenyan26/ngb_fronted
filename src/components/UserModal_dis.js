/**
 * Created by echo on 2016/12/12.
 */

import React, { Component, PropTypes } from 'react';
import { Button, Modal, Form, Input , Select, DatePicker} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

import moment from 'moment';

// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

class UserModal extends React.Component {

    state = {
        buy_date: "2016-01-01",
        activate_date: "2016-01-01"
    };

    componentWillMount() {
        const { isEmpty, item } = this.props;
        if (!isEmpty) {
            this.setState({
                buy_date: item.buy_date,
                activate_date: item.activate_date
            })
        }
    }

    handleCancel = ()=> {
        const { onCancel } = this.props;
        onCancel();
    };

    handleOk = ()=> {
        const { getFieldsValue, validateFields } = this.props.form;
        const { onOk, item } = this.props;
        validateFields((errors) => {
            if (errors) {
                return;
            }
            const data = { ...getFieldsValue(),
                id: item.id,
                buy_date: this.state.buy_date,
                activate_date: this.state.activate_date
            };
            console.log("提交id："+ data.id + "名字：" + data.name);
            console.log("购买日期："+ this.state.buy_date);
            console.log("激活日期："+ this.state.activate_date);
            onOk(data);
        });
    };

    handleBuyDateChange = (date, dateString)=> {
        this.setState({
            buy_date: dateString
        })
    };

    handleActivateDateChange = (date, dateString)=> {
        this.setState({
            activate_date: dateString
        })
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
        const { visible , item } = this.props;
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
                                    { required: true, message: '不能为空' },
                                ],
                            })(
                                    <Input type="text"/>
                            )}
                        </FormItem>
                        <FormItem
                                {...formItemLayout}
                                label="性别"
                        >
                            {getFieldDecorator('gender', { initialValue: item.gender })(
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
                            {getFieldDecorator('addr', { initialValue: item.addr })(
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
                        <FormItem
                                {...formItemLayout}
                                label="电话"
                        >
                            {getFieldDecorator('tel', { initialValue: item.tel })(
                                    <Input type="number"/>
                            )}
                        </FormItem>
                        <FormItem
                                {...formItemLayout}
                                label="购买日期"
                        >
                            <DatePicker defaultValue={moment(this.state.buy_date, 'YYYY-MM-DD')}
                                        onChange={this.handleBuyDateChange}/>
                        </FormItem>
                        <FormItem
                                {...formItemLayout}
                                label="激活日期"
                        >
                            <DatePicker defaultValue={moment(this.state.activate_date, 'YYYY-MM-DD')}
                                        onChange={this.handleActivateDateChange}/>
                        </FormItem>
                    </Form>
                </Modal>
        );
    }
}

UserModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    isEmpty: PropTypes.bool.isRequired,
};

export default Form.create()(UserModal);
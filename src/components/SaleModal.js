/**
 * Created by echo on 2017/1/6.
 */

import React, { Component, PropTypes } from 'react';
import { Button, Modal, Form, Input, Icon, DatePicker} from 'antd';
const FormItem = Form.Item;

import moment from 'moment';

// 推荐在入口文件全局设置 locale
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

let uuid = 0;

import styles from './SaleModal.less';

class SaleModal extends React.Component {

    state = {
        date: "2016-01-01"
    };

    componentWillMount() {
        const { item, isEmpty} = this.props;
        let objs = [0];
        if (!isEmpty && item.serial_number) {
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
        const { getFieldsValue, validateFields, getFieldValue, isEmpty } = this.props.form;
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

                mobile:getFieldValue("mobile"),
                point:getFieldValue("point"),

                date: this.state.date,

                serial_number: ser
            };
            onOk(data);
        });
    };

    checkMobile = (rule, value, callback)=> {
        if (value && !/^1[3|4|5|7|8][0-9]{9}$/.test(value)) {
            callback(new Error('请输入正确的手机号'));
        } else {
            callback();
        }
    };

    handleDateChange = (date, dateString)=> {
        this.setState({
            date: dateString
        })
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
            if (!isEmpty && item.serial_number) {
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
                        title="销售记录"
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
                                label="电话"
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
                                label="日期"
                        >
                            <DatePicker defaultValue={moment(this.state.date, 'YYYY-MM-DD')}
                                        onChange={this.handleDateChange}/>
                        </FormItem>
                        <FormItem
                                {...formItemLayout}
                                label="网点"
                        >
                            {getFieldDecorator('point', { initialValue: item.point })(
                                    <Input type="text"/>
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

SaleModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    isEmpty: PropTypes.bool.isRequired,
};

export default Form.create()(SaleModal);
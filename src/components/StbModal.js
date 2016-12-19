/**
 * Created by echo on 2016/12/12.
 */

import React, { Component, PropTypes } from 'react';
import { Button, Modal, Form, Input } from 'antd';
const FormItem = Form.Item;

class StbModal extends React.Component {

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
                id: item.id
            };
            console.log("提交id："+ data.id + "CA号：" + data.ca_number);
            onOk(data);
        });
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
                        title="机顶盒终端信息"
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
                                label="序列号"
                                hasFeedback
                        >
                            {getFieldDecorator('serial_number', {
                                initialValue: item.serial_number,
                                rules: [
                                    { required: true, message: '不能为空' },
                                ],
                            })(
                                    <Input type="text"/>
                            )}
                        </FormItem>
                        <FormItem
                                {...formItemLayout}
                                label="CA号"
                        >
                            {getFieldDecorator('ca_number', { initialValue: item.ca_number })(
                                    <Input type="text"/>
                            )}
                        </FormItem>
                        <FormItem
                                {...formItemLayout}
                                label="系统版本"
                        >
                            {getFieldDecorator('system_version', { initialValue: item.system_version })(
                                    <Input type="text"/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
        );
    }
}

StbModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    isEmpty: PropTypes.bool.isRequired,
};

export default Form.create()(StbModal);
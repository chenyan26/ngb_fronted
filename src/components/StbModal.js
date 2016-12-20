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
        const { onOk } = this.props;
        validateFields((errors) => {
            if (errors) {
                return;
            }
            const data = { ...getFieldsValue() };
            onOk(data);
        });
    };

    render() {
        const { visible } = this.props;
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
                                initialValue: "",
                                rules: [
                                    { required: true, message: '不能为空' },
                                ],
                            })(
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
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
};

export default Form.create()(StbModal);
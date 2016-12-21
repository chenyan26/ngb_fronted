/**
 * Created by echo on 2016/12/20.
 */

import React, { Component, PropTypes } from 'react';
import { Button, Modal, Form, Input, Checkbox } from 'antd';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

import styles from './ContentModal.less';

/**
 * 选中项的value的数组
 */
let _tags = [];

let tagList= [
        { name: "动作冒险", value: 0, disabled: false },
        { name: "文艺爱情", value: 1, disabled: false },
        { name: "恐怖惊悚", value: 2, disabled: false },
        { name: "历史宫廷", value: 3, disabled: false },
        { name: "内地港台", value: 4, disabled: false },
        { name: "日韩亚太", value: 5, disabled: false },
        { name: "欧美片场", value: 6, disabled: false },
];

class ContentModal extends React.Component {
    state = {
        isDisabled: false,
    };

    componentWillMount() {
        const { item } = this.props;
        if (item.tags) {
            //把文字变成数字
            item.tags.map((t) => {
                tagList.map((obj, j) => {
                    if(t === obj.name) {
                        _tags.push(j);
                    }
                });
            });

            if (_tags.length == 3){
                tagList.map((tag) => {
                    tag.disabled = true;
                });
                _tags.map((v)=> {
                    tagList[v].disabled = false;
                });
                this.setState({
                    isDisabled: true,
                });
            }
        }
    }

    /**
     * 所有选项可选
     */
    resetDisabled = ()=> {
        tagList.map((tag) => {
            tag.disabled = false;
        });
        this.setState({
            isDisabled: false
        });
    };

    handleCancel = ()=> {
        const { onCancel } = this.props;
        onCancel();
        _tags = [];
        this.resetDisabled();
    };

    handleOk = ()=> {
        const { getFieldsValue, validateFieldsAndScroll } = this.props.form;
        const { onOk, item } = this.props;
        validateFieldsAndScroll((errors) => {
            if (errors) {
                return;
            }
            let tags = [];
            //把数字变成文字
            _tags.map((t) => {
                tagList.map((obj, j) => {
                    if(t == j) {
                        tags.push(obj.name);
                    }
                });
            });
            const data = { ...getFieldsValue(),
                tags: tags,
                id: item.id};
            onOk(data);
        });
        _tags = [];
        this.resetDisabled();
    };

    /**
     * 点选时调用
     * @param checkedValues 选中项value数组
     */
    onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
        _tags = checkedValues;
        if (_tags.length == 3) {
            tagList.map((tag) => {
                tag.disabled = true;
            });
            checkedValues.map((value)=> {
                tagList[value].disabled = false;
            });
            this.setState({
                isDisabled: true
            });
            return;
        }
        this.resetDisabled();
    };

    render() {
        const { visible , item} = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        let options = [];
        tagList.map((t, i) => {
            options.push({label: t.name, value: t.value, disabled: t.disabled});
        });

        return (
                <Modal  visible={visible}
                        title="视频内容"
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
                                label="海报"
                        >
                            {getFieldDecorator('poster', { initialValue: item.poster })(
                                    <Input placeholder="海报URL地址" type="text"/>
                            )}
                        </FormItem>
                        <FormItem
                                {...formItemLayout}
                                label="名字"
                                hasFeedback
                        >
                            {getFieldDecorator('name', {
                                initialValue: item.name,
                                rules: [
                                    { required: true, message: '名字不能为空' },
                                ],
                            })(
                                    <Input type="text"/>
                            )}
                        </FormItem>
                        <FormItem
                                {...formItemLayout}
                                label="年份"
                        >
                            {getFieldDecorator('year', { initialValue: item.year })(
                                    <Input type="number"/>
                            )}
                        </FormItem>
                        <FormItem
                                {...formItemLayout}
                                label="导演"
                        >
                            {getFieldDecorator('director', { initialValue: item.director })(
                                    <Input type="text"/>
                            )}
                        </FormItem>
                        <FormItem
                                {...formItemLayout}
                                label="演员"
                        >
                            {getFieldDecorator('actors', { initialValue: item.actors })(
                                    <Input type="text"/>
                            )}
                        </FormItem>
                        <FormItem
                                {...formItemLayout}
                                label="地区"
                        >
                            {getFieldDecorator('region', { initialValue: item.region })(
                                    <Input type="text"/>
                            )}
                        </FormItem>
                        <FormItem
                                className={styles.synopsis_form}
                                {...formItemLayout}
                                label="简介"
                        >
                            {getFieldDecorator('synopsis', { initialValue: item.synopsis })(
                                    <Input type="textarea"
                                           autosize/>
                            )}
                        </FormItem>
                        <FormItem
                                {...formItemLayout}
                                label="标签"
                        >
                            <CheckboxGroup options={options} defaultValue={_tags} disabled={this.state.isDisabled} onChange={this.onChange} />
                        </FormItem>

                        <FormItem
                                {...formItemLayout}
                                label="视频URL"
                        >
                            {getFieldDecorator('url', { initialValue: item.url })(
                                    <Input type="text"/>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
        );
    }
}

ContentModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
};

export default Form.create()(ContentModal);
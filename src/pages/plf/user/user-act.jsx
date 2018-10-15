/**
 * Created by ggh on 2018/10/15.
 */
import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, DatePicker, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const ActModalForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form } = props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 8 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 14 },
                sm: { span: 14 },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select className="icp-selector" style={{width: '80px'}}>
                <Option value="86">+86</Option>
            </Select>
        );
        return (
            <Modal
                visible={visible}
                title="编辑人员"
                okText="创建"
                cancelText="取消"
                onCancel={onCancel}
                onOk={onCreate}
                style={{ top: 20 }}
            >
                <Form layout="vertical">
                    <FormItem {...formItemLayout} hasFeedback label="姓名">
                        {getFieldDecorator('UserName',{
                            rules:[{required:true,message:'请输入姓名！',}]
                        })(
                            <Input type="textarea" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} hasFeedback label="工号">
                        {getFieldDecorator('WorkerNo', {
                            rules: [{ required: true, message: '请输入工号!', }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} hasFeedback label="Email">
                        {getFieldDecorator('Email', {
                            rules: [
                                {type: 'email', message: '请输入合理的邮箱地址!',}, 
                                { required: true, message: '请输入Email!', }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} hasFeedback label="电话">
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: '请输入你的电话号码!', }],
                        })(
                            <Input addonBefore={prefixSelector} />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} hasFeedback label="性别">
                        {getFieldDecorator('GenderId', {
                            rules: [{ required: true, message: '请选择人员状态!' }],
                        })(
                            <Radio.Group>
                                <Radio value="0">男</Radio>
                                <Radio value="1">女</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} hasFeedback label="出生日期">
                        {(
                            <DatePicker format="YYYY-MM-DD" placeholder={['请选择日期']} onChange={this.onChange} onOk={this.onOk} />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} hasFeedback label="证件类型">
                        {(
                            <Radio.Group>
                                <Radio value="0">身份证</Radio>
                                <Radio value="1">护照</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} hasFeedback label="证件号码">
                        {(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} hasFeedback label="人员状态" className="collection-create-form_last-form-item" style={{marginBottom: 0}}>
                        {getFieldDecorator('UserStatus', {
                            rules: [{ required: true, message: '请选择人员状态!' }],
                        })(
                            <Radio.Group>
                                <Radio value="0">正常</Radio>
                                <Radio value="1">离职</Radio>
                                <Radio value="2">冻结</Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
);

class ActForm extends Component{
    state = {
        visible: false,
    };
    showModal = () => {
        this.setState({ visible: true });
    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('提交的数据: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    };
    saveFormRef = (form) => {
        this.form = form;
    };
    render(){
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>新建人员</Button>
                <ActModalForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default ActForm;
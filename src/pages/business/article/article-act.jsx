/**
 * Created by ggh on 2018/5/06.
 */
import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
const FormItem = Form.Item;

const ActModalForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="编辑新文章"
                okText="创建"
                cancelText="取消"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <FormItem label="标题">
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入文章的标题!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="描述">
                        {getFieldDecorator('description',{
                            rules:[{required:true,message:'请输入文章的描述！'}]
                        })(
                            <Input type="textarea" />
                        )}
                    </FormItem>
                    <FormItem className="collection-create-form_last-form-item" style={{marginBottom: 0}}>
                        {getFieldDecorator('modifier', {
                            initialValue: 'public',
                        })(
                            <Radio.Group>
                                <Radio value="public">发布</Radio>
                                <Radio value="private">私有</Radio>
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

            console.log('Received values of form: ', values);
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
                <Button type="primary" onClick={this.showModal}>新建文章</Button>
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
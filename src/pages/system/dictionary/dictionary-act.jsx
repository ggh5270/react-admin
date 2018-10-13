/**
 * Created by ggh on 2018/5/06.
 */
import React, { Component } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData, receiveData } from '@/action';
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 14 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 14 },
        sm: { span: 18 },
    },
};

const ActModalForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form } = props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="编辑字典"
                okText="创建"
                cancelText="取消"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form>
                    <FormItem {...formItemLayout} label="类别代码">
                        {getFieldDecorator('Dictionary_KindCode', {
                            rules: [{ required: true, message: '请输入数据字典类别代码!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="类别名称">
                        {getFieldDecorator('Dictionary_KindName', {
                            rules: [{ required: true, message: '请输入数据字典类别名称!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="字典代码">
                        {getFieldDecorator('Dictionary_Code', {
                            rules: [{ required: true, message: '请输入数据字典代码!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="字典名称">
                        {getFieldDecorator('Dictionary_Name', {
                            rules: [{ required: true, message: '请输入数据字典名称!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="数据字典值">
                        {getFieldDecorator('Dictionary_Value', {
                            rules: [{ required: true, message: '请输入数据字典值!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="排序">
                        {getFieldDecorator('Dictionary_OrderId', {
                            rules: [{ required: false, message: '请输入序号!' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="备注">
                        {getFieldDecorator('Dictionary_Remark',{
                            rules:[{required:false,message:'请输入数据字典的备注！'}]
                        })(
                            <Input type="textarea" />
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
        loading: false,
    };
    componentWillMount() {
        const { receiveData } = this.props;
        receiveData(null, 'data');
    };
    componentWillReceiveProps(nextProps) {
        const { data: nextAuth = {} } = nextProps;
    
        if (nextAuth.data && nextAuth.data.IsSucceed === true) {   // 判断是否登陆
           console.log(nextProps)
        }
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
            form.resetFields();
            this.setState({ visible: false });

            const { fetchData } = this.props;
            // fetchData({funcName: 'postData',params:{url:'/Dictionary/GetDictionarySingle?serviceKey=Dictionary',data:{"dictionaryId":"1"}}, stateName: 'data'});

            fetchData({funcName: 'postData',params:{url:'/Dictionary/SaveDictionary?serviceKey=Dictionary',data:{"model":values}}, stateName: 'data'});

            
        });
    };
    saveFormRef = (form) => {
        this.form = form;
    };
    render(){
        const { loading } = this.state;

        return (
            <div>
                <Button type="primary" onClick={this.showModal}>新建字典</Button>
                <Button type="primary" onClick={this.start} disabled={loading} loading={loading} >刷新</Button>
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
// 用于接收api返回的结果
const mapStateToPorps = state => {
    const { data } = state.httpData;
    return { data };
};

const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});

export default connect(mapStateToPorps, mapDispatchToProps)(ActForm);
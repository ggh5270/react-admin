/**
 * Created by ggh on 2018/4/30.
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchData, receiveData } from '@/action';

const FormItem = Form.Item;

class Login extends React.Component {
    //执行一次，在初始化render之前执行，如果在这个方法内调用setState，render()知道state发生变化，并且只执行一次
    componentWillMount() {
        const { receiveData } = this.props;
        receiveData(null, 'auth');
    }
    //当props发生变化时执行，初始化render时不执行，在这个回调函数里面，你可以根据属性的变化，通过调用this.setState()来更新你的组件状态，旧的属性还是可以通过this.props来获取,这里调用更新状态是安全的，并不会触发额外的render调用
    componentWillReceiveProps(nextProps) {
        const { auth: nextAuth = {} } = nextProps;
        const { history } = this.props;

        if (nextAuth.data && nextAuth.data.IsSucceed === true) {   // 判断是否登陆
            localStorage.removeItem('token-locals');
            localStorage.setItem('token-locals', JSON.stringify(nextAuth.data));
            // localStorage.setItem('valTime', Date);
            history.push('/');
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { fetchData } = this.props;
                fetchData({funcName: 'apiOauthInfo', params: {"requestData":{"LoginId":""+values.userName+"","Password":""+values.password+"","OpenId":"","UnionId":"","PlatformType":1}}, stateName: 'auth'});
                
                // const result=apiOauthInfo({"requestData":{"UserName":""+values.userName+"","Password":""+values.password+""}});
        
                // result.then(function (resout) {
                //     if(resout.IsSucceed===false)
                //     {
                //         message.warn("用户名或密码错误，请重新登陆！")
                //     }
                //     else{
                //         fetchData({funcName: ''+values.userName+'', stateName: 'auth'});
                //     }
                // })
            }
        });
    };
    gitHub = () => {
        message.warn('第三方授权登录暂不开放');
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-form" >
                    <div className="login-logo">
                        <span>Locals路客筹建管理平台</span>
                    </div>
                    <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
                        <FormItem>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <a className="login-form-forgot" href="" style={{float: 'right'}}>忘记密码</a>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                                登录
                            </Button>
                            <p style={{display: 'flex', justifyContent: 'space-between'}}>
                                <a href="">或 现在就去注册!</a>
                                <a onClick={this.gitHub} ><Icon type="github" />(第三方登录)</a>
                            </p>
                        </FormItem>
                    </Form>
                </div>
            </div>

        );
    }
}

const mapStateToPorps = state => {
    const { auth } = state.httpData;
    return { auth };
};
const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});


export default connect(mapStateToPorps, mapDispatchToProps)(Form.create()(Login));
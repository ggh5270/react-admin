/**
 * Created by ggh on 2018/4/28.
 */
import axios from 'axios';
import { get, post } from './tools';
import * as config from './config';
import { message } from 'antd';

export const getPros = () => axios.post('http://api.xitu.io/resources/github', {
    category: "trending",
    period: "day",
    lang: "javascript",
    offset: 0,
    limit: 30
}).then(function (response) {
    return response.data;
}).catch(function (error) {
    console.log(error);
});

// export const npmDependencies = () => axios.get('./npm.json').then(res => res.data).catch(err => console.log(err));

// export const weibo = () => axios.get('./weibo.json').then(res => res.data).catch(err => console.log(err));

const GIT_OAUTH = 'https://github.com/login/oauth';
export const gitOauthLogin = () => axios.get(`${GIT_OAUTH}/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin`);
export const gitOauthToken = code => axios.post('https://cors-anywhere.herokuapp.com/' + GIT_OAUTH + '/access_token', {...{client_id: '792cdcd244e98dcd2dee',
    client_secret: '81c4ff9df390d482b7c8b214a55cf24bf1f53059', redirect_uri: 'http://localhost:3006/', state: 'reactAdmin'}, code: code}, {headers: {Accept: 'application/json'}})
    .then(res => res.data).catch(err => console.log(err));
export const gitOauthInfo = access_token => axios({
    method: 'get',
    url: 'https://api.github.com/user?access_token=' + access_token,
}).then(res => res.data).catch(err => console.log(err));

// easy-mock数据交互
// 管理员权限获取
export const admin = () => get({url: config.MOCK_AUTH_ADMIN});

// 访问权限获取
export const guest = () => get({url: config.MOCK_AUTH_VISITOR});

/**
 * 获取token
 * @param data 登陆的用户名和密码，类型为json串
 */
export const apiOauthInfo = data =>
    axios.post(config.MOCK_AUTH, data, {headers: {'Content-Type': 'application/json; charset=utf-8;'}})
    .then(res => res.data)
    .catch(err => {
        message.warn('接口授权异常');
    });

/**
 * 公用get请求
 * @param url       接口地址
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const getData = ({url, msg = '接口异常'}) => get({url: config.MOCK_API + url, msg:msg, headers: localStorage.getItem("objLogin").Entity});

/**
 * 公用post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const postData = ({url, data, msg = '接口异常'}) => post({url:config.MOCK_API + url, data:data,msg:msg,headers:localStorage.getItem("objLogin").Entity});
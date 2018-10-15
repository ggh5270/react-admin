/**
 * Created by ggh on 2018/10/13.
 */
import axios from 'axios';
import { get, post } from './tools';
import * as config from './config';
import { message } from 'antd';

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

export const apiGetData = url =>
    axios.get(config.MOCK_API + url, {headers: {'Content-Type': 'application/json; charset=utf-8;'}}).then(res => res.data).catch(err => {
        console.log(err);
        message.warn('接口异常');
     });

/**
 * 获取用户信息
 */
export const apiOauthData = () => 
    postData({'url':'/Account/GetAccountLoginInfo',"data":{'param':{'PlatformType':1}}})
    .then(res => res.Entity).catch(err => console.log(err));

/**
 * 公用get请求
 * @param url       接口地址
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const getData = ({url, msg = '接口异常'}) => get({url: config.MOCK_API + url, msg:msg,headers:{headers:{'Content-Type':'application/json; charset=utf-8;','Authorization':JSON.parse(localStorage.getItem('token-locals'))}}});

/**
 * 公用post请求
 * @param url       接口地址
 * @param data      接口参数
 * @param msg       接口异常提示
 * @param headers   接口所需header配置
 */
export const postData = ({url, data, msg = '接口异常'}) => post({url:config.MOCK_API + url, data:data,msg:msg,headers:{headers: {'Content-Type': 'application/json; charset=utf-8;','Authorization':JSON.parse(localStorage.getItem('token-locals'))}}});

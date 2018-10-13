/**
 * Created by ggh on 2018/4/28.
 * 接口地址配置文件
 */

//easy-mock模拟数据接口地址
const EASY_MOCK = 'http://localhost:1102';
export const MOCK_API = EASY_MOCK + '/api';
export const MOCK_AUTH = EASY_MOCK + '/api/oauth2/token';  // 获取token接口地址
export const MOCK_AUTH_ADMIN = MOCK_AUTH + '/admin';       // 管理员权限接口
export const MOCK_AUTH_VISITOR = MOCK_AUTH + '/visitor';   // 访问权限接口



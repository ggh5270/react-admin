export const menus = [
    { key: '/app/dashboard/index', title: '首页', icon: 'mobile', },
    {
        key: '/app/business', title: '业务管理', icon: 'windows',
        sub: [
            { key: '/app/business/article-lists', title: '文章管理', icon: 'question-circle', },
        ],
    },
    {
        key: '/app/system', title: '系统管理', icon: 'scan',
        sub: [
            { key: '/app/system/user-lists', title: '用户管理', icon: '', },
            { key: '/app/system/organize-list', title: '机构管理', icon: '', },
            { key: '/app/system/role-list', title: '角色管理', icon: '', },
            { key: '/app/system/menu-list', title: '菜单管理', icon: '', },
            { key: '/app/system/log-list', title: '日志管理', icon: '', },
            { key: '/app/system/dictionary-lists', title: '数据字典', icon: '', },
        ],
    },
];
/**
 * Created by ggh on 2018/10/13.
 */
import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchData, receiveData } from '@/action';
import { bindActionCreators } from 'redux';
import SiderMenu from './SiderMenu';

const { Sider } = Layout;

class SiderCustom extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
        openKey: '',
        selectedKey: '',
        firstHide: true,        // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
        menus:[],
    };
    componentDidMount() {
        this.setMenuOpen(this.props);

        const { fetchData } = this.props;
        const queryParam={'param':{'PlatformType':1}};
        fetchData({funcName: 'postData',params:{url:'/NavigateMenu/GetNavigateMenuSingleList',data:queryParam}, stateName: 'menuData'}).then(res => {
            console.log(res)
            if(res.data !==undefined && res.data.IsSucceed===true && res.data.Entity!=="")
            {
                 var arryMenu = new Array();
                 var arrySubMenu = new Array();

                 const menuList=JSON.parse(res.data.Entity);
                //  console.log(menuList)
                 menuList.map(function (item)
                 {
                     if(item.ParentId === 0 && item.MenuType === 0)
                     {
                        arrySubMenu = new Array();
                         menuList.map(function (itemSub)
                         {
                             if(itemSub.ParentId === item.MenuId && itemSub.ParentId !== 0 && itemSub.MenuType === 0)
                             {
                                arrySubMenu.push({ key: itemSub.LinkUrl, title: itemSub.MenuName, icon: itemSub.Icon, });
                             }
                             return '';
                         });
                         if(arrySubMenu.length>0)
                         {
                            arryMenu.push({ key: item.LinkUrl, title: item.MenuName, icon: item.Icon,sub:arrySubMenu });
                         }
                         else{
                            arryMenu.push({ key: item.LinkUrl, title: item.MenuName, icon: item.Icon, });
                         }
                     }
                     return '';
                 });
                console.log(arryMenu)

                  //获取菜单
                 this.setState({menus:arryMenu});
            }
        });
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.onCollapse(nextProps.collapsed);
        this.setMenuOpen(nextProps)
    }
    setMenuOpen = props => {
        const { pathname } = props.location;

        this.setState({
            // openKey: pathname.substr(0, pathname.lastIndexOf('/')),  //点击菜单后，去掉自动关闭菜单
            selectedKey: pathname
        });
    };
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({
            collapsed,
            firstHide: collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    };
    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
        console.log(this.state);
        const { popoverHide } = this.props;     // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
        popoverHide && popoverHide();
    };
    openMenu = v => {
        console.log(v);
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false,
        })
    };
    render() {
        return (
            <Sider
                trigger={null}
                breakpoint="lg"
                collapsed={this.props.collapsed}
                style={{ overflowY: 'auto' }}
            >
                <div className="logo">筹建系统</div>
                <SiderMenu
                    menus={this.state.menus}
                    onClick={this.menuClick}
                    theme="dark"
                    mode="inline"
                    selectedKeys={[this.state.selectedKey]}
                    openKeys={this.state.firstHide ? null : [this.state.openKey]}
                    onOpenChange={this.openMenu}
                />
                <style>
                    {`
                    #nprogress .spinner{
                        left: ${this.state.collapsed ? '70px' : '206px'};
                        right: 0 !important;
                    }
                    `}
                </style>
            </Sider>
        )
    }
}

const mapStateToProps = state => {
    const { responsive } = state.httpData;
    return { responsive };
};
const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiderCustom));
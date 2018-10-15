/**
 * Created by ggh on 2018/10/15.
 */
import React, { Component } from 'react';
// import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import Wysiwyg from 'bundle-loader?lazy!../components/ui/Wysiwyg';  // 按需加载富文本配置
import Bundle from '../components/widget/Bundle';

import ArticleList from '../pages/business/article/article-lists';
import UserList from '../pages/plf/user/user-list';
import DictionaryList from '../pages/plf/param/custom/dictionary-lists';

const WysiwygBundle = (props) => (
    <Bundle load={Wysiwyg}>
        {(Component) => <Component {...props} />}
    </Bundle>
);

export default class CRouter extends Component {
    requireAuth = (permission, component) => {
        const { auth } = this.props;
        const { permissions } = auth.data;
        // const { auth } = store.getState().httpData;
        if (!permissions || !permissions.includes(permission)) return <Redirect to={'404'} />;
        return component;
    };
    render() {
        return (
            <Switch>
                <Route exact path="/app/dashboard/index" component={Dashboard} />
                <Route exact path="/app/business/article-lists" component={ArticleList} />

                <Route exact path="/app/plf/user/user-list" component={UserList} />
                <Route exact path="/app/plf/security/permis-list" component={DictionaryList} />
                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        )
    }
}
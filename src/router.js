import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';

import Container from './routes/Container';
import Login from './routes/Login';

import Customer from './routes/Customer';
import StbAccount from './routes/account/StbAccount';
import MobileAccount from './routes/account/MobileAccount'
import Stb from './routes/Stb'
import Content from './routes/Content'

// import Individual from './routes/Individual';

export default function({ history }) {
  return (
    <Router history={history}>
		<Route path="/" component={Container}>
			<IndexRoute breadcrumbName="登录" component={Login} />
	    	<Route path="login" breadcrumbName="登录" component={Login} />

			<Route path="customer" breadcrumbName="客户信息" component={Customer} />
			<Route path="stb" breadcrumbName="机顶盒终端" component={Stb} />

			<Route path="stb_account" breadcrumbName="机顶盒用户信息" component={StbAccount} />
			<Route path="mobile_account" breadcrumbName="手机用户信息" component={MobileAccount} />

			<Route path="content" breadcrumbName="视频内容信息" component={Content} />

			{/*<Route path="individual" breadcrumbName="个人号管理" component={Individual} />*/}

	    	{/*<Route path="dashboard" breadcrumbName="控制面板" component={Dashboard} />*/}
	    </Route>
	</Router>
	);
};

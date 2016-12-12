import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';

import Container from './routes/Container';
import Login from './routes/Login';

import Individual from './routes/Individual';
import Customer from './routes/Customer';

export default function({ history }) {
  return (
    <Router history={history}>
		<Route path="/" component={Container}>
			<IndexRoute breadcrumbName="登录" component={Login} />
	    	<Route path="login" breadcrumbName="登录" component={Login} />

			<Route path="individual" breadcrumbName="个人号管理" component={Individual} />

			<Route path="customer" breadcrumbName="客户信息" component={Customer} />

	    	{/*<Route path="dashboard" breadcrumbName="控制面板" component={Dashboard} />*/}
	    </Route>
	</Router>
	);
};

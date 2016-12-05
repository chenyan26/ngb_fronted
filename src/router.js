import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';

import Container from './routes/Container';
import Login from './routes/Login';

import Individual from './routes/Individual';
import Biz from './routes/Biz';

export default function({ history }) {
  return (
    <Router history={history}>
		<Route path="/" component={Container}>
			<IndexRoute breadcrumbName="登录" component={Login} />
	    	<Route path="login" breadcrumbName="登录" component={Login} />

			<Route path="individual" breadcrumbName="个人号管理" component={Individual} />
			<Route path="biz" breadcrumbName="服务号管理" component={Biz} />

	    	{/*<Route path="dashboard" breadcrumbName="控制面板" component={Dashboard} />*/}
	    </Route>
	</Router>
	);
};

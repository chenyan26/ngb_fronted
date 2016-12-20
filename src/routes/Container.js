import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import styles from './Container.less';

import { Menu, Breadcrumb, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Container extends Component {

  constructor(props) {
    super(props);
    this.state = {collapse: false, currentNavMenu: 'mail'};
  }

  onCollapseChange = (e) => {
    this.setState({
      collapse: !this.state.collapse,
    });
  };

  handleNavMenuClick = (e) => {
    console.log('click ', e);
    this.setState({
      currentNavMenu: e.key,
    });
  };

  render() {
    const collapse = this.state.collapse;
    return (
    <div className={collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-aside"}>

      <aside className="ant-layout-sider">
        <div className="ant-layout-logo">后台管理平台</div>
        <Menu mode="inline"
              theme="light"
              defaultOpenKeys={['customer', 'account', 'terminal', 'terminal_action', 'content_mg']}
              defaultSelectedKeys={['customer_info']}
        >

          <SubMenu key="customer" title={<span><Icon type="user" /><span>客户数据管理</span></span>}>
            <Menu.Item key="customer_info">客户信息
              <Link to="customer"/>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="account" title={<span><Icon type="user" /><span>用户数据管理</span></span>}>
            <Menu.Item key="stb_account">机顶盒用户信息
              <Link to="stb_account"/>
            </Menu.Item>
            <Menu.Item key="mobile_account">手机用户信息
              <Link to="mobile_account"/>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="terminal" title={<span><Icon type="laptop" /><span>终端数据管理</span></span>}>
            <Menu.Item key="stb">机顶盒终端
              <Link to="stb"/>
            </Menu.Item>

          </SubMenu>
          <SubMenu key="terminal_action" title={<span><Icon type="appstore" /><span>终端行为数据管理</span></span>}>
            <Menu.Item key="stb_record">机顶盒使用记录
              <Link to="stb_record"/>
            </Menu.Item>
            <Menu.Item key="vs_record">通信App使用记录
              <Link to="vs_record"/>
            </Menu.Item>
            <Menu.Item key="vod_record">VoD点播记录
              <Link to="vod_record"/>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="content_mg" title={<span><Icon type="appstore" /><span>内容管理</span></span>}>
            <Menu.Item key="content">内容信息
              <Link to="content"/>
            </Menu.Item>
          </SubMenu>

        </Menu>

        <div className="ant-aside-action" onClick={this.onCollapseChange}>
          {collapse ? <Icon type="right" /> : <Icon type="left" />}
        </div>
      </aside>


      <div className="ant-layout-main">
        <div className="ant-layout-header">

          <div className="ant-layout-breadcrumb">
            <Breadcrumb {...this.props} />
          </div>
  
          <Menu onClick={this.handleNavMenuClick}
            selectedKeys={[this.state.currentNavMenu]}
            mode="horizontal">
            {/*<Menu.Item key="mail">*/}
              {/*<Icon type="mail" />首页*/}
            {/*</Menu.Item>*/}
            {/*<Menu.Item key="app">*/}
              {/*<Icon type="appstore" />控制面板*/}
            {/*</Menu.Item>*/}
            <Menu.Item key="alipay">
              <a href="#" target="_blank" rel="noopener noreferrer">帮助中心</a>
            </Menu.Item>
            <SubMenu title={<span><Icon type="setting" />用户登录</span>}>
                <Menu.Item key="setting:1">账户信息</Menu.Item>
                <Menu.Item key="setting:2">退出登录</Menu.Item>
            </SubMenu>
          </Menu>
        </div>
        <div className="ant-layout-container">
          <div className="ant-layout-content">
            <div style={{ height: '100%' }}>
              {this.props.children}
            </div>
          </div>
        </div>

        {/*<div className="ant-layout-footer">*/}
        {/*Mr-V.cn 版权所有 © 2016 由威创客技术部支持*/}
        {/*</div>*/}
      </div>
    </div>
    );
  }
}

Container.propTypes = {
};

const mapStateToProps = (state) => ({
	user: state.app.user,
    role: state.app.role,
	allowRegister: state.app.allowRegister,
	menuItems: state.app.menuItems
});

export default connect(mapStateToProps)(Container);

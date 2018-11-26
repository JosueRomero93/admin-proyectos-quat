import React, { Component } from 'react';
import './App.css';

import { Layout, Breadcrumb, Drawer } from 'antd';

import event from './Event';
import { loginService } from "./Service";
import Menu from "./Menu";
import securityService from './service/SecurityService';

const { Header, Content, Sider } = Layout;

const url = "http://187.162.173.4:8080";

class App extends Component {

  state = {
    route: [],
    selectedComponent: null,
    permissions: [
      "security/logout"
    ],
    collapsed: true,
    drawerComponent: null,
    drawerVisible: false,
    drawerTitle: "Sin título"
  };

  componentWillMount() {
    loginService.host = url;

    this.securityPermissionsUpdateEvent = event.subscribe("security/permissions:update", (permissions) => {
      console.log("Actualizar permisos:", permissions);

      this.updatePermissions(permissions);
    });

    this.selectOptionEvent = event.subscribe("select/option", option => {
      this.setState({
        route: option.route || [],
        selectedComponent: option.component
      });
    });

    this.openDrawerEvent = event.subscribe("open/drawer", drawer => {
      this.setState({
        drawerComponent: drawer.component,
        drawerVisible: true,
        drawerTitle: drawer.title || "Sin título"
      });
    });

    this.closeDrawerEvent = event.subscribe("close/drawer", () => {
      this.setState({
        drawerComponent: null,
        drawerVisible: false,
        drawerTitle: "Sin título"
      });
    });
  }

  componentWillUnmount() {
    this.securityPermissionsUpdateEvent.unsubscribe();
    this.selectOptionEvent.unsubscribe();
    this.openDrawerEvent.unsubscribe();
  }

  updatePermissions(permissions) {
    // sessionStorage.setItem("permissions", JSON.stringify(permissions));
    securityService.permissions = permissions;
    this.setState({
      permissions,
      route: [],
      selectedComponent: null
    });
  }
  
  render() {
    let SelectedComponent = null;

    if (this.state.selectedComponent) {
      const Component = this.state.selectedComponent;
      SelectedComponent = (
        <Component
          url="http://187.162.173.4:8080"
          permissions={this.state.permissions}
        />
      );
    }

    return (
      <Layout id="app">
        <Header className="header">
          <div className="logo" />
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              collapsed={this.state.collapsed}
              permissions={this.state.permissions}
              onSelect={(option) => {
                // console.log(option);
                this.setState({
                  route: option.route,
                  selectedComponent: option.component
                });
              }}
            />
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {
                this.state.route.map(r => {
                  return (
                    <Breadcrumb.Item 
                      key="breadcrumb"
                    >
                      {r.toUpperCase()}
                    </Breadcrumb.Item>
                  );
                })
              }
            </Breadcrumb>
            <Content style={{ 
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
              background: '#fff',
              margin: 0,
              minHeight: 280,
              overflow: "auto",
              padding: "10px"
            }}>
              {
                SelectedComponent
              }
              <Drawer
                title={this.state.drawerTitle}
                width={540}
                placement="right"
                onClose={e => this.setState({
                  drawerVisible: false,
                  drawerComponent: null
                })}
                maskClosable={true}
                visible={this.state.drawerVisible}
                style={{
                    height: 'calc(100% - 55px)',
                    overflow: 'auto',
                    paddingBottom: 53,
                }} >
                {
                  this.state.drawerComponent
                }
              </Drawer>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;

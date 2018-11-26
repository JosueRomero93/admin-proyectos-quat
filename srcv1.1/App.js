import React, { Component } from 'react';
import './App.css';

import { Layout, Menu, Breadcrumb, Icon, message } from 'antd';

import event from './Event';
// import MiComponente from './components/MiComponente';

import components from './router';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class App extends Component {
  
  state = {
    route: [],
    components: [],
    parentKey: "",
    selectedKey: "",
    selectedComponent: null
  };

  componentWillMount() {
    // this.updateActions([
    //   {
    //     id: "inicio",
    //     actions: ["acceder"]
    //   }
    // ]);

    this.updatePermissions(["system:login"]);

    this.loginUnsubscribe = event.subscribe("login", (user) => {
      console.log("Login:", user);
      this.login(user);
    });

    this.logoutUnsubscribe = event.subscribe("logout", () => {
      this.logout();
    });

    // this.login();
  }

  componentWillUnmount() {
    this.loginUnsubscribe();
    this.logoutUnsubscribe();
  }

  async login(user) {
    message.success("Bienvenido a Quat Solutions - Administrador de Proyectos v1.0");
    // TODO: Obtener los permisos del usuario

    const credencial = user.credencial || {};

    const permissions = ["system:profile"];

    if (credencial.correo === "master@quat") {
        permissions.push(
          "usuario/consulta",
          "perfil/consulta",
          "rol/consulta",
          "usuario/alta",
          "perfil/alta",
          "rol/alta",
          "usuario/detalles",
          "perfil/detalles",
          "rol/detalles",
          "usuario/modificar",
          "perfil/modificar",
          "rol/modificar",
          "usuario/baja",
          "perfil/baja",
          "rol/baja",
        );
    }

    permissions.push(...user.perfiles.map(perfil => {
      return perfil.roles.map(r => r.permiso);
    }).reduce((p, c) => {
      p.push(...c);
      return p;
    }, []));

    console.log("permisos", permissions);

    this.updatePermissions(permissions);
    
    // this.updateActions(user.actions);
  }

  updatePermissions(permissions) {
    const user_components = [];

    let $parentKey = null;
    let $selectedKey = null;
    let $selectedComponent = null;

    for (let c of components) {
      let count = 0;

      for (let o of c.options) {
        o.visible = permissions.indexOf(o.permission) >= 0;
        count += o.visible ? 1 : 0;
        if ((o.default || !$selectedKey) && o.visible) {
          $parentKey = c.id;
          $selectedKey = `${$parentKey}-${o.id}`;
          $selectedComponent = o.component;
        }
      }

      if (count > 0) {
        user_components.push(c);
      }
    }

    sessionStorage.setItem("permissions", JSON.stringify(permissions));

    this.setState({
      route: $selectedKey.split("-").map(s => s.toUpperCase()),
      components: user_components,
      parentKey: $parentKey,
      selectedKey: $selectedKey,
      selectedComponent: $selectedComponent
    });
  }

  logout() {
    message.success("Hasta pronto");
    this.updatePermissions(["system:login"]);
  }

  selectComponent($key) {
    console.log("Select", $key);
    for (let c of this.state.components) {
      for (let o of c.options) {
        let key = `${c.id}-${o.id}`;
        if (key === $key) {
          let parentKey = c.id;
          let selectedKey = `${parentKey}-${o.id}`;
          console.log(parentKey, selectedKey);
          this.setState({
            route: selectedKey.split("-").map(s => s.toUpperCase()),
            parentKey,
            selectedKey,
            selectedComponent: o.component,
          });
          return;
        }
      }
    }
  }

  render() {
    return (
      <Layout id="app">
        <Header className="header">
          <div className="logo" />
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              selectedKeys={[this.state.selectedKey]}
              defaultOpenKeys={[this.state.parentKey]}
              style={{ height: '100%', borderRight: 0 }}
              onSelect={(e) => {
                this.selectComponent(e.key);
              }}
            >
              {
                this.state.components.map(c => {
                  return (
                    <SubMenu key={c.id} title={
                      <span><Icon type={c.icon} />{c.label}</span>
                    }>
                    {
                      c.options.filter(o => o.visible).map(o => {
                        return (
                          <Menu.Item key={`${c.id}-${o.id}`}>
                            {o.label}</Menu.Item>
                        );
                      })
                    }
                    </SubMenu>      
                  );
                })
              }
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {
                this.state.route.map(r => {
                  return (<Breadcrumb.Item 
                    key={Math.random().toString(16).slice(2)}>
                    {r}</Breadcrumb.Item>);
                })
              }
            </Breadcrumb>
            <Content style={{ 
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: '#fff',
              margin: 0,
              minHeight: 280,
              overflow: "auto"
            }}>
              {
                this.state.selectedComponent
              }
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;

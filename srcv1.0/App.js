import React, { Component } from 'react';
import './App.css';

import { Layout, Menu, Breadcrumb, Icon, message } from 'antd';

import event from './Event';
import Acceder from './components/inicio/Acceder';
import Perfil from './components/inicio/Perfil';
import BackendCodigo from './components/desarrollo/BackendCodigo';
import ProyectoAlta from './components/proyecto/ProyectoAlta';
import ProyectoConsulta from './components/proyecto/ProyectoConsulta';
// import MiComponente from './components/MiComponente';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const url = "http://187.162.194.73:8080";

const components = [
  {
    id: "inicio",
    label: "Bienvenido",
    options: [
      {
        id: "acceder",
        label: "Iniciar Sesión",
        component: <Acceder />
      },
      {
        id: "perfil",
        label: "Perfil",
        component: <Perfil />
      }
    ]
  },
  {
    id: "desarrollo",
    label: "Desarrollo",
    options: [
      {
        id: "bajar-backend-codigo",
        label: "Bajar Código Backend",
        component: <h1>Bajar Código</h1>
      },
      {
        id: "subir-backend-codigo",
        label: "Subir Código Backend",
        component: <BackendCodigo />
      },
      {
        id: "bajar-backend-compilado",
        label: "Bajar Compilado Backend",
        component: null
      },
      {
        id: "subir-backend-compilado",
        label: "Compilado Backend",
        component: null
      }
    ]
  },
  {
    id: "proyectos",
    label: "Proyectos",
    options: [
      {
        id: "consultar",
        label: "Consultar",
        default: true,
        component: <ProyectoConsulta url={url} />,
      },
      {
        id: "alta",
        label: "Alta",
        component: <ProyectoAlta url={url} />,
      },
    ]
  }
];

class App extends Component {
  
  state = {
    route: [],
    components: [],
    parentKey: "",
    selectedKey: "",
    selectedComponent: null,
  };

  componentWillMount() {
    this.updateActions([
      {
        id: "inicio",
        actions: ["acceder"]
      }
    ]);

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

  updateActions(actions) {
    const user_components = [];

    let $parentKey = null;
    let $selectedKey = null;
    let $selectedComponent = null;

    for (let p of actions) {
      let c = (components.filter(c => c.id === p.id) || [])[0];
      
      if (!c) {
        continue;
      }

      for (let o of c.options) {
        o.visible = p.actions.indexOf(o.id) >= 0;
        if ((o.default || !$selectedKey) && o.visible) {
          $parentKey = c.id;
          $selectedKey = `${$parentKey}-${o.id}`;
          $selectedComponent = o.component;
        }
      }

      user_components.push(c);
    }

    this.setState({
      route: $selectedKey.split("-").map(s => s.toUpperCase()),
      components: user_components,
      parentKey: $parentKey,
      selectedKey: $selectedKey,
      selectedComponent: $selectedComponent
    });
  }

  login(user) {
    message.success("Bienvenido a Quat Solutions - Administrador de Proyectos v1.0");
    this.updateActions(user.actions);
  }

  logout() {
    message.success("Hasta pronto");
    const actions = [
      {
        id: "inicio",
        actions: ["acceder"]
      }
    ];
    this.updateActions(actions);
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
                      <span><Icon type="user" />{c.label}</span>
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

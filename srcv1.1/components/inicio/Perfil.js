import React from 'react';

import { List, Divider, Timeline, Button, Avatar } from 'antd';

import event from '../../Event';

const data = [
    {
      title: 'Administrador',
      content: "Hola bienvenido"
    },
    {
      title: 'Líder de Proyecto',
      content: "Necesito tus avances"
    },
    {
      title: 'Administrador',
      content: "Hola bienvenido"
    },
    {
      title: 'Líder de Proyecto',
      content: "Necesito tus avances"
    },
    {
      title: 'Administrador',
      content: "Hola bienvenido"
    },
    {
      title: 'Líder de Proyecto',
      content: "Necesito tus avances"
    },
    {
      title: 'Administrador',
      content: "Hola bienvenido"
    },
    {
      title: 'Líder de Proyecto',
      content: "Necesito tus avances"
    },
    {
      title: 'Administrador',
      content: "Hola bienvenido"
    },
    {
      title: 'Líder de Proyecto',
      content: "Necesito tus avances"
    },
  ];

export default class Perfil extends React.Component {

    logout() {
        const remember = JSON.parse(localStorage.getItem("remember") || "false");
        if (!remember) {
            localStorage.removeItem("user");
            localStorage.removeItem("password");
        }
        event.fire("logout");
    }
        
    render() {
        return (
            <div style={{
                display: "flex",
                width: "100%",
                height: "100%",
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "300px",
                    height: "100%",
                    paddingTop: "40px",
                    borderRight: "1px solid rgba(0, 0, 0, 0.1)"
                }}>
                    <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Perfil"
                        style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "50%"
                        }}
                    />
                    <p style={{
                        textAlign: "center",
                        marginTop: "10px",
                        marginBottom: "0px"
                    }}>Nombre Completo Apellidos</p>
                    <p style={{
                        textAlign: "center",
                        fontWeight: "500"
                    }}>Desarrollador Principal</p>
                    <Divider />
                    <div style={{
                        padding: "20px",
                        overflow: "auto"
                    }}>
                        <Timeline reverse>
                            <Timeline.Item color="green">Usuario creado</Timeline.Item>
                            <Timeline.Item color="red">Error al Iniciar Sesión</Timeline.Item>
                            <Timeline.Item>Sesión iniciada: {new Date().toString()}</Timeline.Item>
                        </Timeline>
                        <Button onClick={
                            e => this.logout()
                        } type="danger" block>Cerrar Sesión</Button>
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "calc(100% - 300px)",
                    padding: "40px",
                }}>
                    <div style={{
                        width: "100%",
                        height: "100%",
                        padding: "20px",
                        overflow: "auto"
                    }}>
                        <h2>Centro de Mensajes</h2>
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                            <List.Item style={{
                                width: "100%"
                            }}>
                                <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description={item.content}
                                />
                            </List.Item>
                            )}
                        />
                    </div>
                </div>
            </div>
        );
    }

}
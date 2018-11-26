import React from 'react';

import Acceder from './components/inicio/Acceder';
import Perfil from './components/inicio/Perfil';
import ProyectoDashboard from './components/consultar/ProyectoDashboard';
import PuestoDashboard from './components/consultar/PuestoDashboard';
import GastoDashboard from './components/consultar/GastoDashboard';
import PersonalDashboard from './components/consultar/PersonalDashboard';
import InsumoDashboard from './components/consultar/InsumoDashboard';
import UsuarioDashboard from './components/seguridad/UsuarioDashboard';
import PerfilesDashboard from './components/seguridad/PerfilesDashboard';
import RolesDashboard from './components/seguridad/RolesDashboard';

// const url = "http://192.169.200.243:8080";
// const url = "http://192.169.200.243:8080";
const url = "http://localhost:8080";

const components = [
  {
    id: "inicio",
    label: "Bienvenido",
    icon: "home",
    options: [
      {
        
        id: "acceder",
        label: "Iniciar Sesión",
        permission: "system:login",
        component: <Acceder url={url} />
      },
      {
        id: "perfil",
        label: "Perfil",
        permission: "system:profile",
        default: true,
        component: <Perfil />
      }
    ]
  },
  {
    id: "proyectos",
    label: "Reporte de Proyectos",
    icon: "search",
    options: [
      {
        id: "reporte-general",
        label: "Reporte General",
        permission: "proyecto/consulta",
        component: (
          <div>
            <h1>Proyecto</h1>
            <input placeholder="Proyecto" />
            <p>Total: $10000</p>
          </div>
        )
      }
    ]
  },
  {
    id: "consultar",
    label: "Consultar",
    icon: "search",
    options: [
      {
        id: "proyectos",
        label: "Proyectos",
        permission: "proyecto/consulta",
        component: <ProyectoDashboard url={url} />
      },
      {
        id: "personal",
        label: "Personal",
        permission: "personal/consulta",
        component: <PersonalDashboard url={url} />
      },
      {
        id: "puestos",
        label:"Puestos",
        permission: "puesto/consulta",
        component:<PuestoDashboard url={url}/>

      },
      {
        id: "gastos",
        label: "Gastos",
        permission: "gasto/consulta",
        component:<GastoDashboard url={url}/>
      },
      {
        id: "insumos",
        label: "Insumos",
        permission: "insumo/consulta",
        component:<InsumoDashboard url={url}/>
      },
    ]
  },
  {
    id: "security",
    label: "Seguridad",
    icon: "lock",
    options: [
      {
        id: "usuarios",
        label: "Usuarios",
        permission: "usuario/consulta",
        component:<UsuarioDashboard url={url} />
      },
      {
        id: "perfiles",
        label: "Perfiles",
        permission: "perfil/consulta",
        component:<PerfilesDashboard url={url} />
      },
      {
        id: "roles",
        label: "Roles",
        permission: "rol/consulta",
        component:<RolesDashboard url={url} />
      }
    ]
  },  
];

export default components;
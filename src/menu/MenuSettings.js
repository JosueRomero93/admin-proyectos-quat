import Usuario from "./seguridad/Usuario";
import FormularioUno from "./lab/FormularioUno";
import FormularioDos from "./lab/FormularioDos";
import SelectorUno from "./lab/SelectorUno";
import SelectorDos from "./lab/SelectorDos";
import FormularioTres from "./lab/FormularioTres";
import FormularioCuatro from "./lab/FormularioCuatro";
import SelectorUsuarios from "./lab/SelectorUsuarios";
import Rol from "./seguridad/Rol";
import GastosProyecto from "./lab/GastosProyecto";
import Perfil from "./seguridad/Perfil";
import MiComponente from "./mi-proyecto/MiComponente";
import InputTag from "./lab/InputTag";
import Personal from "./personal/Personal";
import Proyecto from "./proyectos/proyecto";
import Gasto from "./Gastos/Gasto";

export default [
    {
        id: "personal",
        label: "Personal",
        icon: "user",
        options: [
            {
                id: "consultar",
                label: "Consultar",
                component: Personal
            }
        ]
    },
    {
        id: "gastos",
        label: "Gastos",
        icon: "dollar",
        options: [
            {
                id: "gastos",
                label: "Consultar",
                component: Gasto
            }
        ]
    },
    {
        id: "proyecto",
        label: "Proyecto",
        icon: "project",
        options: [
            {
                id: "consultar-proyecto",
                label: "Consultar Proyecto",
                component: Proyecto
            }
        ]
    },
    {
        id: "reportes",
        label: "Reportes",
        icon: "line-chart",
        options: [
            {
                id: "gastos-proyecto",
                label: "Gastos del Proyecto",
                component: GastosProyecto
            }
        ]
    },
    {
        id: "lab",
        label: "Laboratorio Quat",
        icon: "experiment",
        options: [
            {
                id: "input-tag",
                label: "Input Tag",
                component: InputTag
            },
            {
                id: "mi-componente",
                label: "Mi Componente",
                component: MiComponente
            },
            {
                id: "selector-usuarios",
                label: "Selector de Usuarios",
                permissions: ["dev"],
                component: SelectorUsuarios
            },
            {
                id: "formulario-uno",
                label: "Formulario Uno",
                permissions: ["dev"],
                component: FormularioUno
            },
            {
                id: "formulario-dos",
                label: "Formulario Dos",
                permissions: ["dev"],
                component: FormularioDos
            },
            {
                id: "formulario-tres",
                label: "Formulario Tres",
                permissions: ["dev"],
                component: FormularioTres
            },
            {
                id: "formulario-cuatro",
                label: "Formulario Cuatro",
                permissions: ["dev"],
                component: FormularioCuatro
            },
            {
                id: "selector-uno",
                label: "Selector Uno",
                permissions: ["dev"],
                component: SelectorUno
            },
            {
                id: "selector-dos",
                label: "Selector Dos",
                permissions: ["dev"],
                component: SelectorDos
            },
        ]
    },
    {
        id: "seguridad",
        label: "Seguridad",
        icon: "lock",
        options: [
            {
                id: "usuario",
                label: "Usuarios",
                component: Usuario
            },
            {
                id: "perfil",
                label: "Perfiles",
                component: Perfil
            },
            {
                id: "rol",
                label: "Roles",
                component: Rol
            }
        ]
    }
];
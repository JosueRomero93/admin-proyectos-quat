import Usuario from "./Usuario";

export default {
    id: "seguridad",
    label: "Seguridad",
    icon: "lock",
    options: [
        {
            id: "usuario",
            label: "Usuarios",
            component: Usuario
        }
    ]
};
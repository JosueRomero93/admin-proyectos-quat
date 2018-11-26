import MiComponente from "./MiComponente";
import OtroComponente from "./OtroComponente";
import Reporte from "./Reporte";

export default {
    id: "mi-proyecto",
    label: "Mi Proyecto",
    icon: "question",
    options: [
        {
            id: "mi-componente",
            label: "Mi Componente",
            component: MiComponente
        },
        {
            id: "otro-componente",
            label: "Otro Componente",
            permissions: ["proyecto/modificar"],
            component: OtroComponente
        },
        {
            id: "reporte",
            label: "reporte",
            component: Reporte
        }
    ]
};
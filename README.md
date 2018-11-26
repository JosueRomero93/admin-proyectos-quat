# Quat Solutions - Administrador de Proyectos

El Administrado de Proyectos de Quat Solutions (`APQS`) consiste en frontend basado en [React](https://reactjs.org/), utilizando el framework de diseño [Antd](https://ant.design/docs/react/introduce).

Para descargar el proyecto, debemos clonar el repositorio https://github.com/badillosoft/admin-proyectos. Podemos hacerlo más fácil mediante [Github Desktop](https://desktop.github.com/) o en una terminal.

> git clone https://github.com/badillosoft/admin-proyectos.git

*__Nota__: Puedes descargar el proyecto como `zip` y descomprimirlo para más rápido, pero no tendrás las últimas actualizaciones y tendrás que estar descargando una y otra vez en cada versión.*

## Instalación

El proyecto ya viene configurado con `react` y `antd` por lo que sólo tendrás que abrir el proyecto desde una terminal (estar ubicado en el proyecto) y ejecutar el siguiente comando.

> npm install

Con esto ya estarán instalas las dependencias y podrás ejecutar el proyecto con el comando.

> npm start

Una vez que el proyecto este listo para ser distribuido puedes ejecutar el comando.

> npm run build

El cual generará la carpeta `build/` con los archivos minificados listos para ponerse en cualquier servidor o prenderse mediante el comando.

> serve -s build/ -p 5000

*_Nota_: Puedes instalar `serve` con `npm install -g serve`.*

## Arquitectura

El proyecto está estructurado como un proyecto de `react`. Por lo que el código principal se encuentra en la carpeta `src/`.

* `src/App.js`: Contiene el componente principal y generalmente no debe ser modificado al menos que se cambie la estructura global.

* `src/index.css | src/App.css`: Contienen los estilos de diseño principales (no se requieren ser modificados).

* `src/menu/`: Es la carpeta dónde se va a trabajar todo el código (todos los componentes) bajo las siguientes convenciones: 1. Cada conjunto de componentes generarán un menú. 2. Cada menú tendrá su propia carpeta nombrada en minúsculas y separaciones por guiones en lugar de espacios. 3. Cada carpeta de menú contendrá un archivo llamado `@menu-settings` que contendrá la configuración del menú. 4. Cada menú será registrado en el archivo `src/menu/MenuSettings`.

* `src/menu/MenuSettings.js`: Exporta un arreglo de las configuraciones de los menús utilizados.

* `src/menu/<mi-proyecto>/@menu-settings.js`: Exporta un objeto de configuración del menú `<mi-proyecto>`, el cuál contiene la referencia a todos los componentes mostrados en el menú y los permisos que requieren para visualizarse.

* `src/menu/<mi-proyecto>/<MiComponente>.js`: Exporta un componente de React que será mostrado cada que se seleccione el menú (si tiene los permisos).

## Crear un Proyecto

Un proyecto se corresponde con un menú, por lo que si queremos crear un proyecto llamado `MiProyecto`, necesitamos generar el menú `mi-proyecto`.

### Paso 1 - Crear la carpeta del proyecto

Crear en la carpeta `src/menu` la carpeta `mi-proyecto` quedando creada la carpeta `src/menu/mi-proyecto`.

### Paso 2 - Crear los componentes del proyecto

Una vez creada la carpeta `src/menu/mi-proyecto`, podemos crear todos los componentes que deseemos dentro de la carpeta (un proyecto equivale a un menú y también equivale a un conjunto de componentes llamados las opciones del menú). Entonces creemos un componente llamado `MiComponente` dentro del proyecto (`src/menu/mi-proyecto/MiComponente.js`).

> `src/menu/mi-proyecto/MiComponente.js`

~~~js
import React from "react";

export default class MiComponente extends React.Component {

    render() {

        return <h1>Este es mi componente</h1>;

    }

}
~~~

### Paso 3 - Configurar el menú y registrar los componentes

Ahora ya tenemos el componente `src/menu/mi-proyecto/MiComponente.js`, por lo que hay que registrarlo en la configuración del menú. Por convención el archivo de configuración del menú será llamado `@menu-settings.js`, el cuál deberá estar en la carpeta del proyecto, por que querá como `src/menu/mi-proyecto/@menu-settings.js`. Para configurar el menú debemos exportar un objeto con el `id` del menú, el `label` del menú, el `icon` del menú y los `options`, el último es una arreglo de objetos dónde configuraremos cada componente con su `id` de la opción, el `label` de la opción y el `component` que es nuestro componente registrado, opcionalmente se pueden establecer los `persmissions`.

> `src/menu/mi-proyecto/@menu-settings.js`

~~~js
import MiComponente from "./MiComponente";

export default {
    id: "mi-proyecto",
    label: "Mi Proyecto",
    icon: "question",
    options: [
        {
            id: "mi-componente",
            label: "Mi Componente",
            component: MiComponente
        }
    ]
};
~~~

### Paso 4 - Registrar el menú

Finalmente para visualizar el menú, debemos registrar la configuración (`src/menu/mi-proyecto/@menu-settings.js`) en el archiv `src/menu/MenuSettings.js`, de tal forma que ese menú sea parte del sistema.

> `src/menu/MenuSettings.js`

~~~js
import MiProyecto from "./mi-proyecto/@menu-settings";

export default [
    MiProyecto,
    // ... Otros proyectos
];
~~~

## Sistema de Eventos

El sistema dispone de una clase llamada `Event` ubicada en el archivo `src/Event.js`, la clase `Event` como tal no es muy útil, sino quién es útil es su instancia ya registrada en el mismo archivo.

Un evento se componente de un nombre de evento, generalmente por convención se utilizan palabras en minúsculas separadas por `/`, por ejemplo, `mi/evento`. El evento puede ser invocado aunque nadie lo escuche, esto se hará a través de `event.fire("mi/evento", data)`, dónde `data` son los datos que se le envían al evento, por ejemplo, `event.fire("mi/evento", { a: 123, b: true })` o `event.fire("do/login", { correo: "ana@gmail.com", contraseña: "ana123" })`. Si no hay nadie que escuche el evento, este se perderá, pero si hay suscriptores del evento, estos invocarán su callback cada que reciban los datos del evento, por ejemplo, `event.subscribe("mi/evento", (datos) => { ... })`. Cada que nos suscribimos a un evento, este devolverá un objeto que se puede des-suscribir del evento, para no seguir ejecutando el callback `!!!IMPORTANTE`. Generalmente las suscripciones a un evento deberán ser en `componentWillMount()` y las des-suscripciones serán en `componentWillUnmount()`, ya que están relacionadas con la creación y destrucción del componente.

### Ejemplo del uso eventos

> Registrar un evento

~~~js
import event from "../../Event";

class MiComponenteA {

    componentWillMount() {
        // suscribe el evento (lo mantiene vivo)
        this.miEvento = event.subscribe("mi/evento", (payload) => {
            // TODO: Procesar los datos del evento
            console.log("Se ha generado mi/evento", payload);
        });
    }

    componentWillUnmount() {
        // Des-suscribe el evento (sea elimina)
        this.miEvento.unsubscribe();
    }

    // Opcionalmente en algún lugar
    // cambiamos el callback del evento para que haga otra cosa
    // this.miEvento.callback((payload) => {
        // Hacer otra cosa
    })

    // ... render y demás

}
~~~

> Disparar un evento

~~~js
import event from "../../Event";

class MiComponenteB {

    onPulsame() {
        event.fire("mi/evento", "Hola mundo");
    }

    render() {
        return (
            <button onClick={ e => this.onPulsame() }>pulsame</button>
        );
    }

}
~~~

### Caso práctico

Imaginemos que tenemos dos componentes en dos proyectos distintos, el primer componente va a notificar cuándo un usuario solicita ver los detalles de un usuario. El segundo componente estará suscrito a dicho evento y mostrará los detalles en un `Drawer` de `antd`.

> Componente Principal - Manda a pedir mostrar los datos de un usuario.

~~~js
class ComponentePrincipal {

    state = {
        nombre: "Carlos",
        edad: 21,
        genero: "Masculino"
    };

    render() {

        return (
            <button
                onClick={
                    e => {
                        event.fire("open/drawer/component", {
                            menu: "mi-proyecto",
                            component: "mi-componente",
                            data: this.state
                        });
                    }
                }
            >mostrar detalles</button>
        );

    }

}
~~~

## Servicios

Un servicio en la arquitectura del proyecto, consistirá en una instancia de la clase `Service` ubicada en `src/service/Service.js`. Es decir, cada clase derivada de `Service`, será ubicada en la carpeta `src/service` y deberá exponer una instancia de su clase. Salvo la clase `Service`, los demás servicios serán instancias de `Service`.

La clase `Service` provee métodos para el consumo de servicios web como los que provee un `backend`. Por ejemplo, podemos consumir un servicio mendiante:

~~~js
import Service from "../?/service/Service";

const service = new Service();

// Llama get
const response_1 = await service.get("http://localhost:8080/api/usuario/find", {
    id: 1
});

// Llama post

const response_2 = await service.post("http://localhost:8080/api/personal/create", {
    id: 0,
    nombre: "Pepe",
    ap_paterno: "Luis"
});
~~~

El host es opcional y está definido de manera global, por lo que podemos hacer simplemente:

~~~js
const response_1 = await service.get("/api/usuario/find", {
    id: 1
});
~~~

Existen algunos servicos ya definidos como `src/service/UsuarioService`:

~~~js
import Service from "./Service";

class UsuarioService extends Service {

    async all() {
        return await this.get("/api/usuario/all");
    }

    // ... más métodos

}

const usuarioService = new UsuarioService();

export default usuarioService;
~~~

Podemos definir nuestro propio servicio, teniendo en mente, que un servicio es un proveedor de funcionalidad compartida.

> `src/service/MiServicio.js`

~~~js
class MiServicio {

    suma(a, b) {
        return a + b;
    }

}

const miServicio = new MiServicio();

export default miServicio;
~~~

> `src/service/StorageService`

~~~js
class StorageService {

    data={};

    setItem(key, value) {
        this.data[key] = value;
    }

    getItem(key) {
        return this.data[key];
    }

    removeItem(key) {
        delete this.data[key];
    }

}

const storageService = new StorageService();

export default storageService();
~~~

> Ejemplo de uso

~~~js
import storageService from "../?/StorageService";

class MiComponenteUno extends React.Component {

    render() {
        return (
            <Input onChange={
                value => {
                    storageService.setItem("nombre", value);
                }
            } placeholder="Nombre" />
        );
    }

}
~~~

~~~js
import storageService from "../?/StorageService";

class MiComponenteDos extends React.Component {

    render() {
        return (
            <h1>{`Hola: ${storageService.getItem("nombre")}`}</h1>
        );
    }

}
~~~
# Recetas de `React` & `Antd`

## Crear un Formulario Genérico

Un formulario genérico nos va a permitir utilizar el formulario de `antd` de forma más simple. Concentrando su funcionalidad en los campos y controlando el evento `onSubmit` de forma tradicional y mediante el sistema de eventos diseñado.

El formulario genérico o `<GenericForm>` recibe las siguientes propiedades:

* `enabled`[`boolean`]: Habilita o deshabilita el formulario (por defecto `false`).

* `buttonLabel`[`string`]: Indica el texto del botón de enviar del formulario (por defecto `enviar`).

* `fields`[`Array<GenericField>`]: Indica mediante un arreglo los campos del formulario (por defecto `[]`).

* `onSubmit`[`function(object)`]: Indica la función `onSubmit` para cuándo se envía el formulario (por defecto `() => {}`). La función recibe un diccionario con los valores de cada uno de los campos del formulario con las claves `name` de `<GenericField>`.

Un campo del formulario genérico o `<GenericField>` recibe las siguientes propiedades:

* `name`[`string`]: Nombre del campo, será usuada como la clave en el objeto de valores enviado a `onSubmit`.

* `label`[`string`]: Título del campo, será usuada para mostrar la descripción del campo.

* `render`[`function(object)`]: Define la función que devuelve el componente que será pintando para el campo. Se puede devolver cualquier componente de `React`.

* `option`[`object`]: Define las opciones del `getFieldDecorator` de `antd`. Como `rules[Array[object]]` y `initialValue[any]`.

> Ejemplo de uso

~~~js
<GenericForm
    enabled={true}
    buttonLabel="Iniciar Sesión"
    onSubmit={
        values => {
            console.log(values);
            // Todo: Login
        }
    }
    fields={
        [
            {
                name: "user",
                label: "User",
                options: {
                    rules: [
                        {
                            required: true,
                            message: "Invalid username!"
                        }
                    ],
                    initialValue: "My User"
                },
                render: () => (
                    <Input placeholder="Username" />
                )
            },
            {
                name: "password",
                label: "Password",
                options: {
                    rules: [
                        {
                            required: true,
                            message: "Empty password"
                        }
                    ],
                    render: () => (
                        <Input type="password" placeholder="Password" />
                    )
                }
            }
        ]
    }
/>
~~~

## Usar Formularios Genéricos con el Sistema de Eventos

Los formularios genéricos pueden ser utilizados con el sistema de eventos `event`. Para ello debemos especificar el nombre del formulario con la propiedad `name` y suscribirse al evento `form/<form-name>`.

> Ejemplo de uso

~~~js
<GenericForm
    name="my-form"
    // ... todos los campos del formulario
/>
~~~

En algún otro lugar nos suscribimos al evento `form/my-form`.

~~~js
// import event from "../?/Event";

componentWillMount() {
    this.formEvent = event.subscribe("form/my-form", values => {
        message.success(`My Form submit: ${JSON.stringify(values)}`);
    });
}

componentWillUnmount() {
    this.formEvent.unsubscribe();
}
~~~

## Crear un Selector Genérico

El selector genérico sirve para utilizar el selector de `antd` de forma más simple, centrando su funcionalidad en el `dataSource` que proveerá todas las etiquetas del selector y sus identificadores. También funciona de forma clásica con `onSelect` que se genera cuándo se selecciona una etiqueta se integra al igual que el formulario genérico con el sistema de eventos.

El Selector Genérico recibe las siguientes propiedades:

* `enabled`[`boolean`]: Indica si el selector está activo (por defecto `false`).

* `defaultValue`[`any`]: Indica el `id` de la etiqueta seleccionada por defecto.

* `dataSource`[`async function()`]: Indica la función que deberá devolver una lista de objectos, dónde cada objeto tiene `id` de la etiqueta y `label` de la etiqueta (ej. `() => [{ id: "a", label: "A" }, { id: "b", label: "B" }]`).

* `options`[`Array<GenericLabel>`]: Indica la lista de etiquetas genéricas que serán mostradas, se usa en lugar de `dataSource` (ej. `[{ id: "a", label: "A" }, { id: "b", label: "B" }]`).

* `onSelect`[`function(any)`]: Define la función que recibirá el `id` de la etiqueta seleccionada.

> Ejemplo de uso

~~~js
<GenericSelector
    enabled={true}
    onSelect={
        id => {
            console.log(id);
        }
    }
    options={
        [
            {
                id: "a",
                label: "A"
            },
            {
                id: "b",
                label: "B"
            }
        ]
    }
/>
~~~

Si queremos utilizar `dataSource` en lugar de options.

~~~js
<GenericSelector
    // ... demás propiedades
    dataSource={
        async () => {
            const service = new Service();

            const users = await service.get("https://randomuser.me/api?results=500");

            return users.results.map(user => {
                return {
                    id: user.login.uuid,
                    label: `${user.name.first} ${user.name.last}`
                };
            });
        }
    }
/>
~~~

## Usar Selectores Genéricos con el Sistema de Eventos

Al igual que los formularios genéricos, podemos definir la propiedad `name` en el selector genérico y suscribir el evento `selecto/<name>`.

> Ejemplo de uso

~~~js
<GenericSelector
    name="my-selector"
    // ... demás propiedades
/>
~~~

En algún otro lugar nos suscribimos al evento `selector/my-selector`.

~~~js
// import event from "../?/Event";

componentWillMount() {
    this.selectorEvent = event.subscribe("selector/my-selector", id => {
        message.success(`My Selector id: ${JSON.stringify(id)}`);
    });
}

componentWillUnmount() {
    this.selectorEvent.unsubscribe();
}
~~~

## Enlazar un evento con un formulario genérico

Podemos enlazar los eventos generados en el sistema de eventos con los campos del formulario a través de la propiedad `bind`. Esto es muy útil para poder ajustar el valor de un campo en el formulario a tráves de un evento.

> Ejemplo de uso

~~~js
<GenericForm
    // ... propiedades
    fields={
        [
            // ... demás campos
            {
                name: "mi-campo",
                label: "Mi Campo",
                bind: "mi-evento",
                render: () => (...)
            }
        ]
    }
/>
~~~

En ejemplo anterior, el valor del campo se va a ajustar al valor enviado al evento `mi-evento`, por ejemplo, si en algún lugar se genera `event.fire("mi-evento", "FOO-BAR")`, entonces, el campo `mi-campo` va a tener ahora el valor `"FOO-BAR"`.


## Destructuración de objetos

~~~js
// Falsy

false
null
undefined
0
""

if (!falsy) {
    // si
}

// Truthy

true
{}
[]
"..."
1
() => {}

if (truthy) {
    // si
}

const b = !!truthy
const b = !falsy
~~~

~~~js
// Estructura del objeto
const user = {
    name: {
        first: "Paco",
        last: "Paquetines"
    },
    picture: {
        small: "http://placehold.it/100",
        medium: "http://placehold.it/200",
        large: "http://placehold.it/300",
    },
    login: {
        uuid: "1231231asdasdas123123",
        password: "123"
    }
};

const url = user.picture.lage; // user["picture"]["large"];
~~~

~~~js
const user = {
    // demás propiedades excepto picture
};

const url = user.picture.large; // ERROR: user.picture is undefined

const url = (user.picture || {}).large; // url === undefined
~~~

~~~js
const items = user.items || [];

for (let item of items) {
    // todo
}
~~~

~~~js
const user = undefined;

const url = (((user || {}).picture || {}).large || "http://...");

console.log(url); // http://...
~~~ 

~~~js
const user = undefined;

let url = "http://..."

if (user && user.picture && user.picture.large) {
    url = user.picture.large;
}

console.log(url); // http://...
~~~

~~~js
const response = undefined;

const user = ((reponse || {}).results || [])
    .filter(user => (user.login || {}).uuid === "123")[0];

console.log(user);
~~~

~~~js
const obj = {
    a: 123,
    b: true,
    c: [1, 2, 3]
}

const { a, b } = obj || {};

console.log(a);
~~~

~~~js
const gastos = [
  {
    "id": 41,
    "proyecto": {
      "id": 17,
      "nombre": "Prueba",
      "descripcion": "",
      "fecha_inicio": 1541039004000,
      "fecha_entrega": 1541039004000,
      "presupuesto": 1,
      "retorno_esperado": null,
      "activo": false
    },
    "tipo": "Prueba",
    "descripcion": "Prueba",
    "forma_pago_requerido": "Prueba",
    "monto": 100
  },
  {
    "id": 42,
    "proyecto": {
      "id": 36,
      "nombre": "X-Men",
      "descripcion": "",
      "fecha_inicio": 1541035984000,
      "fecha_entrega": 1541035986000,
      "presupuesto": 1,
      "retorno_esperado": null,
      "activo": true
    },
    "tipo": "hola",
    "descripcion": "",
    "forma_pago_requerido": "mundo",
    "monto": 1000
  }
]

function gastos_proyecto(id_proyecto, gastos) {
    return gastos.filter(gasto => {
        return gasto.proyecto.id === id_proyecto;
    });
}

const mis_gastos = gastos_proyecto(17, gastos);

let suma_montos = 0;

for (let gasto of mis_gastos) {
    suma_montos += gasto.monto;
}

console.log(suma_montos);

const suma_montos2 = mis_gastos.reduce(
    (valor_previo, gasto) => {
        return valor_previo + gasto.monto;
    },
    0
);

const min_monto = mis_gastos.reduce(
    (min, gasto) => {if (gasto.monto < min) {return gasto.monto;}return min;},Infinity
);

const montos_deferentes = mis_gastos.reduce(
    (montos, gasto) => {
        if (montos.indexOf(gasto.monto) < 0) {
            montos.push(gasto.monto);
        }
        return montos;
    },
    []
);
~~~

~~~js
const a = [1, 2, 2, 3, 4, 1, 2, 3, 2, 1, 5, 3, 2, 4, 2];
//undefined
a.reduce((p, c) => p.indexOf(c) < 0 ? [...p, c] : p, [])
//Array(5) [ 1, 2, 3, 4, 5 ]
a.reduce((p, c) => { p[c] = (p[c] || 0) + 1; return p; }, {})
//Object { 1: 3, 2: 6, 3: 3, 4: 2, 5: 1 }
~~~
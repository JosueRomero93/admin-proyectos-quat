import React from "react";

import { Table } from "antd";

const columns = [
    {
        title: "Columna A",
        key: "a",
        dataIndex: "a"
    },
    {
        title: "Columna B",
        key: "b",
        dataIndex: "b",
        render: (value) => {
            return <span style={{ color: "red" }}>{value.toUpperCase()}</span>
        }
    }
];

const data = [
    {
        key: 1,
        a: "Hola",
        b: "Mundo"
    }
];

export default class Reporte extends React.Component {

    render() {
        return <Table columns={columns} dataSource={data} locale={{
            emptyText: "No hay registros"
        }} />
    }

}
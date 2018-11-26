import React from 'react';

import { Upload, Icon, message } from 'antd';

const Dragger = Upload.Dragger;

function beforeUpload(file) {
    console.log(file.type, file.size);
    if (file.type !== "application/zip") {
        message.error("Solo se aceptan archivos tipo zip");
        return Promise.reject("Solo se aceptan archivos tipo application/zip");
    }
    return true;
  }

export default class BackendCodigo extends React.Component {
    state = {
      loading: false,
    };
  
    handleChange = (info) => {
        const status = info.file.status;
        if (status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (status === 'done') {
            // Get this url from response in real world.
            this.setState({
                loading: false,
            });
            message.success(`${info.file.name} subido exitosamente.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} falló al subirse.`);
        }
    }
  
    render() {
      return (
        <div style={{
            width: "100%",
            height: "100%",
            overflow: "auto"
        }}>
            <div style={{
                width: "100%",
                height: "300px",
            }}>
                <Dragger
                    name="file"
                    action="/backend/source"
                    onChange={this.handleChange}
                    beforeUpload={beforeUpload}
                    style={{
                        padding: "40px"
                    }}
                >
                    <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Da clic aquí o arrastra los archivos</p>
                    <p className="ant-upload-hint">La carga de archivos grandes podría tardar</p>
                </Dragger>
            </div>
        </div>
      );
    }
  }
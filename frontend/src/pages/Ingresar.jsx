import { Button, Divider, Form, Input, InputNumber, Typography } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import { useHideMenu } from "../hooks/useHideMenu";
import { useState } from "react";
import { getUsuarioStorage } from "../helpers/getUsuarioStorage";

const { Title, Text } = Typography;

export const Ingresar = () => {
  const navigate = useNavigate();

  const [usuario] = useState(getUsuarioStorage());

  const onFinish = ({ agente, escritorio }) => {
    console.log("Success:", { agente, escritorio });
    localStorage.setItem("agente", agente);
    localStorage.setItem("escritorio", escritorio);
    navigate("/escritorio");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useHideMenu(false);

  if (usuario.agente && usuario.escritorio) {
    return <Navigate to="/escritorio" />;
  }
  return (
    <>
      <Title level={2}>Ingresar</Title>
      <Text>Ingrese su nombre y número de escritorio</Text>

      <Divider />
      <Form
        name="basic"
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 14,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nombre del agente"
          name="agente"
          rules={[
            {
              required: true,
              message: "Por favor ingrese su nombre",
            },
          ]}
          style={{
            color: "white",
          }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Escritorio"
          name="escritorio"
          rules={[
            {
              required: true,
              message: "Ingrese el numero de escritorio",
            },
          ]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 10,
            span: 12,
          }}
        >
          <Button type="primary" htmlType="submit" shape="round">
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

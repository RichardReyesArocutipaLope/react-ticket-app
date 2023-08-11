import { Button, Col, Divider, Row, Typography } from "antd";
import { ArrowRightOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useHideMenu } from "../hooks/useHideMenu";
import { useState } from "react";
import { getUsuarioStorage } from "../helpers/getUsuarioStorage";
import { Navigate, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export const Escritorio = () => {
  const navigate = useNavigate();
  const onSalir = () => {
    localStorage.clear();
    navigate("/ingresar");
  };
  const onSiguienteTicket = () => {};
  const [usuario] = useState(getUsuarioStorage());

  useHideMenu(false);

  if (!usuario.agente || !usuario.escritorio) {
    return <Navigate to="/ingresar" />;
  }
  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>Richard</Title>
          <Text>Usted esta trabajando en el escritorio</Text>
          <Text type="success">5</Text>
        </Col>

        <Col span={4} align="right">
          <Button shape="round" type="primary" onClick={onSalir}>
            <CloseCircleOutlined /> Salir
          </Button>
        </Col>
      </Row>
      <Divider />

      <Row>
        <Col>
          <Text>Esta atendiendo el ticket numero: </Text>
          <Text style={{ fontSize: 30 }} type="danger">
            55
          </Text>
        </Col>
      </Row>

      <Row>
        <Col offset={18} span={6} align="right">
          <Button shape="round" type="primary" onClick={onSiguienteTicket}>
            <ArrowRightOutlined /> Siguiente
          </Button>
        </Col>
      </Row>
    </>
  );
};

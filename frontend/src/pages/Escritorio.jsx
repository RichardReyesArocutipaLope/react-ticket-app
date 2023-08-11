import { Button, Col, Divider, Row, Typography } from "antd";
import { ArrowRightOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useHideMenu } from "../hooks/useHideMenu";
import { useContext, useState } from "react";
import { getUsuarioStorage } from "../helpers/getUsuarioStorage";
import { Navigate, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";

const { Title, Text } = Typography;

export const Escritorio = () => {
  const navigate = useNavigate();
  const [usuario] = useState(getUsuarioStorage());
  const [ticket, setTicket] = useState(null);
  const { socket } = useContext(SocketContext);
  useHideMenu(false);
  const onSalir = () => {
    localStorage.clear();
    navigate("/ingresar");
  };
  const onSiguienteTicket = () => {
    socket.emit("siguiente-ticket-trabajar", usuario, (ticket) => {
      setTicket(ticket);
    });
  };

  if (!usuario.agente || !usuario.escritorio) {
    return <Navigate to="/ingresar" />;
  }
  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{usuario.agente}</Title>
          <Text>Usted esta trabajando en el escritorio</Text>
          <Text type="success">{usuario.escritorio}</Text>
        </Col>

        <Col span={4} align="right">
          <Button shape="round" type="primary" onClick={onSalir}>
            <CloseCircleOutlined /> Salir
          </Button>
        </Col>
      </Row>
      <Divider />

      {ticket && (
        <Row>
          <Col>
            <Text>Esta atendiendo el ticket numero: </Text>
            <Text style={{ fontSize: 30 }} type="danger">
              {ticket.numero}
            </Text>
          </Col>
        </Row>
      )}

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

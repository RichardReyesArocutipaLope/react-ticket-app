import { DownloadOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import { useHideMenu } from "../hooks/useHideMenu";
import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";

const { Title, Text } = Typography;
export const CrearTicket = () => {
  useHideMenu(true);

  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState(null);

  const onNewTicket = () => {
    socket.emit("solicitar-ticket", null, (ticket) => {
      setTicket(ticket);
    });
  };
  return (
    <>
      <Row>
        <Col offset={0} span={13} align="center">
          <Title level={3}>Presione el boton para un nuevo ticket</Title>
          <Button
            shape="round"
            type="primary"
            size="large"
            onClick={onNewTicket}
          >
            <DownloadOutlined />
            Nuevo ticket
          </Button>
        </Col>
      </Row>

      {ticket && (
        <Row style={{ marginTop: 100 }}>
          <Col offset={0} span={13} align="center">
            <Text level={2}>Su número</Text>
            <br />
            <Text type="success" style={{ fontSize: 55 }}>
              {ticket.numero}
            </Text>
          </Col>
        </Row>
      )}
    </>
  );
};

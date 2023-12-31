import { Card, Col, Divider, List, Row, Tag, Typography } from "antd";
import { useHideMenu } from "../hooks/useHideMenu";
import { SocketContext } from "../context/SocketContext";
import { useContext, useEffect, useState } from "react";
import { getUltimos } from "../helpers/getUltimos";

const { Title, Text } = Typography;
export const Cola = () => {
  const { socket } = useContext(SocketContext);

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    socket.on("ticket-asignado", (asignados) => setTickets(asignados));

    return () => socket.off("ticket-asignado");
  }, [socket]);

  useEffect(() => {
    getUltimos().then((tickets) => setTickets(tickets));
  }, []);

  useHideMenu(true);
  return (
    <>
      <Title level={1}>Atendiendo al cliente</Title>
      <Row>
        <Col span={12}>
          <List
            dataSource={tickets.slice(0, 3)}
            renderItem={(item) => (
              <List.Item>
                <Card
                  style={{ width: 300, marginTop: 16 }}
                  actions={[
                    <Tag key={2} color="volcano">
                      {item.agente}
                    </Tag>,
                    <Tag key={5} color="magenta">
                      Escritorio: {item.escritorio}
                    </Tag>,
                  ]}
                >
                  <Title level={1}>No. {item.numero}</Title>
                </Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <Divider>Historial</Divider>

          <List
            dataSource={tickets.slice(0, 3)}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={`Ticket No. ${item.numero}`}
                  description={
                    <>
                      <Text type="secondary">En el escritorio</Text>
                      <Tag color="magenta">{item.ticketNo}</Tag>
                      <Text type="secondary">Agente:</Text>
                      <Tag color="magenta">{item.agente}</Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          ></List>
        </Col>
      </Row>
    </>
  );
};

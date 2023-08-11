import { useContext, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import { Layout, Menu, Button } from "antd";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { Ingresar } from "./Ingresar";
import { CrearTicket } from "./CrearTicket";
import { Escritorio } from "./Escritorio";
import { Cola } from "./Cola";
import { UiContext } from "../context/UiContext";
const { Header, Sider, Content } = Layout;

export const RouterPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  const { ocultarMenu } = useContext(UiContext);

  const items = [
    {
      key: "1",
      label: <NavLink to="ingresar">Ingresar</NavLink>,
    },
    {
      key: "2",
      label: <NavLink to="cola">Cola</NavLink>,
    },
    {
      key: "3",
      label: <NavLink to="crear">Crear ticket</NavLink>,
    },
    {
      key: "4",
      label: <NavLink to="escritorio">Escritorio</NavLink>,
    },
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        hidden={ocultarMenu}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "rgb(40,40,40)",
            color: "white",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: "white",
            color: "black",
          }}
        >
          <Routes>
            <Route path="/ingresar" element={<Ingresar />} />
            <Route path="/cola" element={<Cola />} />
            <Route path="/crear" element={<CrearTicket />} />
            <Route path="/escritorio" element={<Escritorio />} />
            <Route path="/*" element={<Navigate to="/ingresar" />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

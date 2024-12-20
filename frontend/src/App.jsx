import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Layout } from "antd";
import DashboardConfig from "./dashboard_config";
import WidgetConfig from "./widget_config";

const { Header, Content } = Layout;

const Home = () => (
  <div className="text-center mt-12">
    <h1 className="text-3xl font-bold">Welcome to the App</h1>
  </div>
);

const App = () => {
  return (
    <Router>
      <Layout className="min-h-screen">
        <Header className="bg-indigo-500 flex justify-between items-center px-4 py-1 shadow-md">
          <div>
            <Link to="/" className="text-white text-lg font-semibold hover:text-gray-300">
              Home
            </Link>
          </div>
          <div className="flex gap-6">
            <Link to="/dashboard" className="text-white text-base hover:underline">
              Dashboard
            </Link>
            <Link to="/widget" className="text-white text-base hover:underline">
              Widget
            </Link>
          </div>
        </Header>

        {/* Main Content */}
        <Content className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<DashboardConfig />} />
            <Route path="/widget" element={<WidgetConfig />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;

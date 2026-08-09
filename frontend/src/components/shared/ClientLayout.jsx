import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import AdminBar from "./AdminBar";

export default function ClientLayout() {
  return (
    <div className="client-layout-wrapper">
      <AdminBar />
      <Header />
      
      <main className="client-layout-main">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}
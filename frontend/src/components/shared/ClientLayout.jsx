import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function ClientLayout() {
  return (
    <div className="client-layout-wrapper">
      <Header />
      
      <main className="client-layout-main">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}
import Header from "../static/Header";
import Footer from "../static/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Header />
      <Outlet/>
      <Footer />
    </>
  );
}

import { Outlet } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1, padding: '2rem' }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;


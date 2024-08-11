import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import Sidebar from '~/components/Sidebar';

function App() {
  return (
    <>
      <Sidebar />
      <Header />
      <main className='lg:pl-[270px] p-[15px] min-h-screen'>
        <Outlet />
      </main>
      <Footer />

      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme='light'
        transition:Bounce
      />
    </>
  );
}

export default App;

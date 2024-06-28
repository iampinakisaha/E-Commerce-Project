import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
// import LoadingSpinner from "./helpers/loadingSpinner";
function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <main>
        {/* <LoadingSpinner> */}
          <Outlet />
        {/* </LoadingSpinner> */}
      </main>
      <Footer />
    </>
  );
}

export default App;

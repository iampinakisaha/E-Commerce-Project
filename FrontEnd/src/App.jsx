import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import SummaryApi from "./common";
import { useEffect } from "react";
import { UserContext } from "./context/index.jsx";

function App() {
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    console.log("data-user", dataResponse);
  };

  //this useEffect hook will run first time when page loads, as no initial data as passed it will not run until screen is refreshed. if suppose we leave from the current screen then this hook will get unmouted and return the fetchUserDetails() function
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      {console.log("fetch user details",fetchUserDetails)}
      <UserContext.Provider value = {{
        fetchUserDetails //user details fetched
        
      }}>
        <ToastContainer />
        <Header />
        <main className="min-h-[calc(90vh-128px)]">
          <Outlet />
        </main>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;

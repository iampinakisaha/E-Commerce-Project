import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserDetails, clearUser } from './store/userSlice';
import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import { UserContext } from './context/index.jsx';

import SummaryApi from './common';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include',
        headers: {
          // Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      });

      if (dataResponse.ok) {
        const dataApi = await dataResponse.json();
        dispatch(setUserDetails(dataApi.data));
      } else if (dataResponse.status === 400) {
        // Unauthorized (e.g., expired token)
        console.error('Unauthorized:', dataResponse.statusText);
        dispatch(clearUser());
        navigate('/login');
      } else {
        // Other HTTP errors
        console.error('Failed to fetch user details:', dataResponse.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      // Handle network errors or other exceptions
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <UserContext.Provider value={{ fetchUserDetails }}>
        <ToastContainer />
        <Header />
        <main className="min-h-[calc(100vh-180px)] min-w-[390px]">
          <Outlet />
        </main>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;

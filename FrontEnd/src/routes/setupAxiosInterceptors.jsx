import axios from 'axios';
import { clearUser } from '../store/userSlice';

const setupAxiosInterceptors = (store, navigate) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Clear user state
        store.dispatch(clearUser());
        // Redirect to main page
        if (typeof navigate === 'function') {
          navigate('/');
        }
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;

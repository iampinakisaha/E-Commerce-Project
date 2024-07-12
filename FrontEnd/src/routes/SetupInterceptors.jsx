import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'react-redux';
import setupAxiosInterceptors from './setupAxiosInterceptors';

const SetupInterceptors = ({ children }) => {
  const navigate = useNavigate();
  const store = useStore();

  useEffect(() => {
    setupAxiosInterceptors(store, navigate);
  }, [store, navigate]);

  return <>{children}</>;
};

export default SetupInterceptors;

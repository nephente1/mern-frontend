import { useState } from "react";
import { useAuthContext } from "../components/useAuthContext";
import { useNavigate } from 'react-router-dom';
import axiosInstance from './../api/axiosInstance';
import axios from 'axios';


export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/user/login', {email, password});
        // save the user to local strorage
      const res = response.data;
      localStorage.setItem('user', JSON.stringify(res));
      // update auth context
      dispatch({ type: 'LOGIN', payload: res });

      setLoading(false)
      navigate('/');
      return res
    } catch (error) {
      if (axios.isAxiosError(error)) {
          setLoading(false);
          setError(error.response.data.error);
        console.error('error:', error);
      } else {
        // Obsługa innych typów błędów
        console.error('Unexpected error:', error);
        throw new Error('Unexpected error occurred');
      }
    }
  }

  return {login, isLoading, error}
}
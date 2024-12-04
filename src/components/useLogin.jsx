import { useState } from "react";
import { useAuthContext } from "../components/useAuthContext";
import { useNavigate } from 'react-router-dom';


export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    })

    const json = await response.json();


    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local strorage
      localStorage.setItem('user', JSON.stringify(json));
      // update auth context
      dispatch({ type: 'LOGIN', payload: json });

      setLoading(false)
      navigate('/');
    }
  }

  return {login, isLoading, error}
}
import { useState } from "react";
import { useAuthContext } from "../components/useAuthContext";
import { useNavigate } from "react-router-dom";



export const useSignup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setLoading(true);
    setError(null);

    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    })

    console.log('res', response)

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local strorage
      localStorage.setItem('user', JSON.stringify(json));
      // update auth context
      dispatch({ type: 'SIGNUP', payload: json });

      setLoading(false)
      await navigate("/login")
    }
  }

  return {signup, isLoading, error}
}
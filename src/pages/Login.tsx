import {useState} from 'react';
import { useLogin } from '../components/useLogin';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { login, isLoading, error } = useLogin();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    await login(email, password)
  }

  return (
    <>
      <p className="flex-centered">Log in to your account</p>
      <form className="login" onSubmit={handleSubmit}>
        <h3>Log in</h3>

        <label>Email:</label>
        <input 
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        
        <label>Password:</label>
        <div className="password-input-container">
        <input 
          type={isPasswordVisible ? 'text' : 'password'}
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button
          type="button" className="password-toggle-button"
          onClick={togglePasswordVisibility}
          aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
        >
          {isPasswordVisible ? <span className="material-symbols-outlined">visibility</span> : 
          <span className="material-symbols-outlined">visibility_off</span>}
        </button>
        </div>

        <button disabled={isLoading}>Log in</button>
        {isLoading && <div className="loader" />}
        {error && <div className="error">{error}</div>}
      </form>
      <p className="flex-centered">No account? <a href="/signup">Sign up</a></p>
    </>
  )
}


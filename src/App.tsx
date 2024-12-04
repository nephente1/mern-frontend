import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { useAuthContext } from './components/useAuthContext';
import { Profile } from './pages/Profile';


function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to='/login' />} 
            />
            <Route 
              path="/profile" 
              element={user ? <Profile /> : <Navigate to='/login' />} 
            />
          </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;

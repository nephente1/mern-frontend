import axios from 'axios';


// get token from localStorage
const getUser = () => {
  return JSON.parse(localStorage.getItem('user'))
};

// Tworzymy instancję axios z globalnymi ustawieniami
const axiosInstance = axios.create({
  // baseURL: `http://localhost:3000/api/workouts/` //dev
  baseURL: 'https://mern-backend-xbfj.onrender.com/api/workouts' //prod
});

// Ustawiamy token w nagłówkach dla każdej wysyłanej prośby, do tego posłuży interceptor z Axiosa
axiosInstance.interceptors.request.use(
  (config) => {
    const user = getUser();
    if (user && user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`; // Dodajemy token do nagłówków
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
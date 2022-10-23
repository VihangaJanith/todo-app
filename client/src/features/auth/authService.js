import axios from 'axios';

 
const API_URL = 'http://localhost:5000/api/users/';
const Reg_URL = 'http://localhost:5000/users/register';
const Login_URL = 'http://localhost:5000/users/login';


const register = async (userData) => {
    const response = await axios.post(Reg_URL, userData);
 
    return response.data;

}

const login = async (userData) => {
    const response = await axios.post(Login_URL, userData);
   if(response.data){
    localStorage.setItem('user', JSON.stringify(response.data));
   }
    return response.data;

}



const logout = async () => {
    localStorage.removeItem('user');
}


const authService = {
    register,
    logout,
    login
}

export default authService;
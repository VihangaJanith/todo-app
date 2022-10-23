
import axios from "axios";



const API_URLL = "http://localhost:5000/todo/";




const addTodo = async (todoData, token) => {
    
     const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
const response = await axios.post(API_URLL, todoData, config);
return response.data;
}

const getTodos = async (token) => {
    
    const config ={
       headers: {
           Authorization: `Bearer ${token}`
       }
   }
const response = await axios.get(API_URLL, config);
return response.data;
}

const deleteTodo = async (todoId, token) => {
        
        const config ={
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URLL + todoId, config);
    return response.data;
}



// const updateComplete = async (id , todoData, token) => {
            
//             const config ={
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }
//         const response = await axios.put(API_URLL + id, todoData, config);
//         return response.data;
// }

//2nd
const updateComplete= async (todoId, todoData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.put(API_URLL  + todoId, todoData, config);
  
    return response.data;
  };


// const updateComplete = async (todoData, token) => {
//     const config ={
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     }
//     const response = await axios.delete(API_URLL + todoData, config);
//     return response.data;
//   };
  





const todoService = {
    addTodo,
    getTodos,
    deleteTodo,
    updateComplete

}

export default todoService;

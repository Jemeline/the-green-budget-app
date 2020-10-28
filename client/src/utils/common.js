import axios from 'axios';

export async function getJWTToken(userData) {
    const res = await axios.post('http://localhost:5000/api/generate-token', {
            user: userData
    })
    return res;
          
          
    
    
    
  
    
};



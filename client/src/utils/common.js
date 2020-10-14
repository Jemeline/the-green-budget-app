import axios from 'axios';

export async function getJWTToken(userData) {
    const res = await axios.post('https://green-budget-app.herokuapp.com/api/generate-token', {
            user: userData
    })
    return res;
          
          
    
    
    
  
    
};



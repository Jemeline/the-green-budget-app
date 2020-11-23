import {createMuiTheme} from '@material-ui/core';
import {getUser} from '../../utils/common';

export function transformIncomeData(data){
    return data.map(item => 
        Object.values(item))
};

export function shiftIncomeData(data){
    data.map(item => {
        item.push(item.shift()); 
        item.push(item.shift());
        item[3]= "$"+item[3].toFixed(2).toString();
    });
};

export const tableTheme = createMuiTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      action: {
        hover: '#D6D6D6'
      }
    },
});
export const regDate = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
export const regAmount =/^\$?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/;
          
export function generateAddIncomePayload(state,token){
    return {
      body: 
      {
        sessionUser:getUser(),
        email:getUser(),
        date: state.date,
        category: state.category.value,
        description:state.description,
        amount:state.amount
      },
      headers: {
        headers: {
          'Authorization': `Bearer ${token}` 
      }},
    }
};
export function generateUpdateIncomePayload(state,token){
    return {
      body: 
      {
        sessionUser:getUser(),
        incomeID:state.incomeId,
        date: state.date,
        category: state.category.value,
        description:state.description,
        amount:state.amount
      },
      headers: {
        headers: {
          'Authorization': `Bearer ${token}` 
      }},
    }
};
export function generateDeleteIncomePayload(state,token){
    return {
      body: 
      {
        sessionUser:getUser(),
        incomeID:state.incomeId
      },
      headers: {
        headers: {
          'Authorization': `Bearer ${token}` 
      }},
    }
};
export function generateIncomeDataPayload(token){
    return {
      body: 
      {
        sessionUser:getUser(),
        incomeUser:getUser(),
      },
      headers: {
        headers: {
          'Authorization': `Bearer ${token}` 
      }},
    }
};

export const tableColumns = [
    {
        name: "Date",
        options: {
          filter: false,
          sort:true
        }
    },
    {
        name: "Category",
        options: {
          filter: true,
        }
    },
    {
        name: "Description",
        options: {
          filter: false, 
        }
    },
    {
        name: "Amount",
        options: {
          filter: false,
        }
    },
];
  
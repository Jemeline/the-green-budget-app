import {createMuiTheme} from '@material-ui/core';
import {getUser} from '../../utils/common';

export function transformBudgetData(data){
    return data.map(item => 
        Object.values(item))
};

export function shiftBudgetData(data){
    data.map(item => {
        item.push(item.shift()); 
        item.push(item.shift());
        item[4]= "$"+item[4].toFixed(2).toString();


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
          

export const ButtonForm = [
    {
        filter:{bottom: 275,right:15},
        refresh:{bottom: 200,right:15},
        add:{bottom: 125,right:15},
        drag:{bottom: 50,right:15}
    },
    {
        filter:{bottom: 50,right:15},
        refresh:{bottom: 50,right:90},
        add:{bottom: 50,right:165},
        drag:{bottom: 50,right:240}
    },
    {
        filter:{bottom: 125,right:15},
        refresh:{bottom: 50,right:15},
        add:{bottom: 50,right:90},
        drag:{bottom: 125,right:90}
    },
];

export function generateAddExpensePayload(state,token){
    return {
      body: 
      {
        sessionUser:getUser(),
        email:getUser(),
        date: state.date,
        category: state.category.value,
        subcategory: state.subcategory.value,
        description:state.description,
        amount:state.amount
      },
      headers: {
        headers: {
          'Authorization': `Bearer ${token}` 
      }},
    }
};
export function generateUpdateExpensePayload(state,token){
    return {
      body: 
      {
        sessionUser:getUser(),
        expenseID:state.budgetId,
        date: state.date,
        category: state.category.value,
        subcategory: state.subcategory.value,
        description:state.description,
        amount:state.amount
      },
      headers: {
        headers: {
          'Authorization': `Bearer ${token}` 
      }},
    }
};
export function generateDeleteExpensePayload(state,token){
    return {
      body: 
      {
        sessionUser:getUser(),
        expenseID:state.budgetId
      },
      headers: {
        headers: {
          'Authorization': `Bearer ${token}` 
      }},
    }
};
export function generateBudgetDataPayload(token){
    return {
      body: 
      {
        sessionUser:getUser(),
        expenseUser:getUser(),
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
        name: "Subcategory",
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
  
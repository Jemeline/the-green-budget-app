
import React from 'react';
import {Button, Card} from 'react-bootstrap';
import '../../css/Green.css';

const Info = ({expense}) => {

        return(
        <Card className = "card">
            <h2> {expense.subcategory} </h2>
            <p> ({expense.description})  </p>
            <p>  {expense.amount}  </p>

            {(expense.category == "Food") ? <div> GAS CALCULATOR </div>: null}
            {/* {infexOf(facts["category"] != 0) ? <div> FACT </div>: null} */}
            {/* {infexOf(facts["subcategory"] != 0) ? <div> FACT </div>: null} */}


        </Card>
        )
};

export default Info;
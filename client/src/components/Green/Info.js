
import React from 'react';
import {Button, Card} from 'react-bootstrap';
import '../../css/Green.css';

const Info = ({type, expense}) => {

    console.log(type)

        return(
        <Card className = "card bg-info">
            <h2>
                {type}
            </h2>
            <p> 
                {expense}
            </p>
        </Card>
        )
};

export default Info;
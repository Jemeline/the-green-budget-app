
import React from 'react';
import {Button, Card} from 'react-bootstrap';
import '../../css/Green.css';
import images from "./emojis.js";

const Info = ({expense}) => {

        return(
        <div>
        <Card className = "card">
            <h2> {expense.subcategory},  ${expense.amount} </h2>
            <p> ({expense.description})  </p>
        </Card>
        {information.some(e => e.subcategory === expense.subcategory) ? <Fact subcategory = {expense.subcategory} />: null}
        {(expense.subcategory == "Gas") ? <Gas cost = {expense.amount}/>:null}
        <EA cost = {expense.amount}/>
        </div>
        )
};

export default Info;



function Fact({subcategory}) {
    console.log(subcategory)
    let e = information.filter(e => e.subcategory === subcategory);
    console.log(e)
    return (
        <Card className="green-card">
            <p> <strong> Did You Know? </strong> </p>
            <p>
            {e[0].fact}
            here is the fact
            </p>
        </Card>
    );
}


function Gas({cost}) {
    let pounds = cost / 2.7 * 18.9
    let price = cost / 2.7 * 0.10
    return (
        <Card>
            <p> This amount of gasoline would emit approx. {pounds} lbs of CO2 into the atmosphere. </p>
            <p> It would only cost <strong> ${price} </strong> to offset the carbon emissions for this amount of gasoline.</p>
            <p>  <a href = 'https://www.terrapass.com/product/productindividuals-families'> Click here </a> to pay for carbon offsets:  </p>
        </Card>
    );
}


function EA({cost}) {
    console.log(images)
    if (cost < 2){
        let num = cost / 0.66;
        return (
            <Card>
                <div className = "columns">
                <div className = "column is-one-quarter">
                    <img className = "logo" src={images["Deworm"]} />
                </div>
                <div className = "column is-half">
                    <p className = "eainfo">
                    With ${cost}, you could pay for <br/> <strong> {num.toFixed(1)} deworming treatments. </strong>
                    </p>
                </div>
                <div className = "column right is-offset-10" style = {{float: "right"}} >
                    <Button className = "is-ghost" href = "https://www.evidenceaction.org/dewormtheworld-2/"> Donate </Button>
                </div>
                </div>
            </Card>
            );
    }
    if (cost < 32.27){
        let num = cost / 2
        return (
            <Card>
                <div className = "columns">
                <div className = "column is-one-quarter">
                    <img className = "logo" src={images["Malaria"]} />
                </div>
                <div className = "column is-half">
                    <p className = "eainfo">
                    With ${cost}, you could pay for <br/> <strong> {num.toFixed(1)} malaria nets. </strong>
                    </p>
                </div>
                <div className = "column right is-offset-10" style = {{float: "right"}} >
                    <Button className = "is-ghost" href = "https://oneacrefund.org/"> Donate </Button>
                </div>
                </div>
            </Card>
            );
    }
    else{
        let num = cost / 32.27
        return (
            <Card>
                <div className = "columns">
                <div className = "column is-one-quarter">
                    <img className = "logo" src={images["OneAcreFund"]} />
                </div>
                <div className = "column is-half">
                    <p className = "eainfo">
                    With ${cost}, you could help <br/> <strong> {num.toFixed(1)} farmers get out of debt. </strong>
                    </p>
                </div>
                <div className = "column right is-offset-10" style = {{float: "right"}} >
                    <Button className = "is-ghost" href = "https://www.againstmalaria.com/"> Donate </Button>
                </div>
                </div>
            </Card>
            );
    }
    
}

let information = [
    {category: "Food",
        subcategory: "Pet Food",
        fact: "A study published in the journal PLOS One finds that meat consumption by pet dogs and cats creates 64 million tons of carbon dioxide each year. Meat production requires more energy and resources than plant-based foods. It also produces more waste.",
        source: "https://www.mentalfloss.com/article/503376/all-meat-pet-food-has-big-environmental-impact",
        moreInfo: ["blaha bladhkejdhakjdh,kfhieuyhr", "kjwhd,jehck"]
    },
    {category: "Food",
        subcategory: "Pet Food",
        fact: "Petfood is the blah blah balh",
        moreInfo: "blaha bladhkejdhakjdh,kfhieuyhr"

    }, 
    {

    }
]
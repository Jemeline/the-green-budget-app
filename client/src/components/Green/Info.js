
import React from 'react';
import {Button, Card} from 'react-bootstrap';
import '../../css/Green.css';
import images from "./emojis.js";

const Info = ({expense}) => {

        return(
        <div>
        <Card className = "card" style = {{backgroundColor: "#5CA5BD"}}>
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
<<<<<<< HEAD
        <Card style = {{backgroundColor: "#FFC857"}}>
=======
        <Card className="green-card">
>>>>>>> e0f28ba235791275058b17e78c6b368cadec2a08
            <p> <strong> Did You Know? </strong> </p>
            <p>
            {e[0].fact}
           
            </p>
        </Card>
    );
}


function Gas({cost}) {
    let pounds = cost / 2.7 * 18.9
    let price = cost / 2.7 * 0.10
    return (
        <Card style = {{backgroundColor: "#53C45A"}}>
            <p> This amount of gasoline would emit approx. {pounds.toFixed(1)} lbs of CO2 into the atmosphere. </p>
            <p> It would only cost <strong> ${price.toFixed(2)} </strong> to offset the carbon emissions for this amount of gasoline.</p>
            <p>  <a href = 'https://www.terrapass.com/product/productindividuals-families'> Click here </a> to pay for carbon offsets:  </p>
        </Card>
    );
}

function Electricity({cost}) {
    let pounds = cost / 0.13 * 16.4
    let price = cost / 0.13 * 16.4 * 3.30
    return (
        <Card style = {{backgroundColor: "#53C45A"}}>
            <p> This amount of electricity would emit approx. {pounds} lbs of CO2 into the atmosphere. </p>
            <p> It would only cost <strong> ${price} </strong> to offset the carbon emissions for this amount of electricity.</p>
            <p>  <a href = 'https://www.terrapass.com/product/productindividuals-families'> Click here </a> to pay for carbon offsets:  </p>
        </Card>
    );
}


function EA({cost}) {
    console.log(images)
    if (cost < 2){
        let num = cost / 0.66;
        return (
            <Card style = {{backgroundColor: "#eda4a4"}}>
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
            <Card style = {{backgroundColor: "#eda4a4"}}>
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
            <Card style = {{backgroundColor: "#eda4a4"}}>
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
    {
        subcategory: "Pet Food",
        fact: "A study published in the journal PLOS One finds that meat consumption by pet dogs and cats creates 64 million tons of carbon dioxide each year. Meat production requires more energy and resources than plant-based foods. It also produces more waste.",
        source: "https://www.mentalfloss.com/article/503376/all-meat-pet-food-has-big-environmental-impact",
    },
    {
        subcategory: "Repairs",
        fact: "A 2004 analysis by Toyota found that as much as 28 percent of the carbon dioxide emissions generated during the lifecycle of a typical gasoline-powered car can occur during its manufacture and its transportation to the dealer; the remaining emissions occur during driving once its new owner takes possession",
        source: "https://www.scientificamerican.com/article/when-used-cars-are-more-ecofriendly/",
    }, 
    {
        subcategory: "Tires",
        fact: "Tire derived fuels are also in great demand today. Scrap tires can be used in steel mills as a carbon source by replacing the coal or coke during manufacturing.",
        source: "https://www.norcalcompactors.net/tire-recycling-reducing-environmental-impact-generating-profits/",
    },
    {
        subcategory: "Groceries",
        fact: "Only 9% of the plastic ever produced has actually been recycled.",
        source: "https://www.nationalgeographic.com/news/2017/07/plastic-produced-recycling-waste-ocean-trash-debris-environment/",
    },
    {
        subcategory: "Restaurants",
        fact: "Figures from the Food Service Technology Center (PDF) estimate that only about 35 percent of energy used by the average full-service restaurant actually goes toward preparing the food.",
        source: "https://slate.com/technology/2008/11/is-getting-takeout-that-much-worse-for-the-planet-than-cooking-at-home.html",
    },
    {
        subcategory: "Electricity",
        fact: "Solar panels cost money upfront, but will save you money in the long term. The average home can save between $10,000 and $30,000 over the lifetime of your solar panel system",
        source: "https://news.energysage.com/much-solar-panels-save/",
    },
    {
        subcategory: "Garbage",
        fact: "The average person generates over 4 pounds of trash every day and about 1.5 tons of solid waste per year. Americans make more than 200 million tons of garbage each year, enough to fill Busch Stadium from top to bottom twice a day.",
        source: "https://www.dosomething.org/us/facts/11-facts-about-recycling#:~:text=The%20average%20person%20generates%20over,to%20bottom%20twice%20a%20day.",
    },
    {
        subcategory: "Water",
        fact: "Average American uses 176 gallons of water per day compared to 5 gallons of water the average African family uses each day. The average single-family home uses 80 gallons of water per person each day in the winter and 120 gallons in the summer.",
        source: "http://savethewater.org/education-resources/water-facts/#:",
    },
    {
        subcategory: "Phone",
        fact: "Apple assumes that each of their phones will be used for three years so the average Brit uses about 23 phones in their lifetime which equates to 1,610 kg of CO2. That’s equivalent to flying from London to New York 2.5 times.",
        source: "https://www.anthropocenemagazine.org/2018/04/the-energy-hogging-dark-side-of-smartphones",
    },
    {
        subcategory: "Dating",
        fact: "According to the Guardian, while 79 percent of mixed-sex couples recycle, only 65 percent of single people do.",
        source: "https://grist.org/article/single-people-arent-as-good-at-recycling-as-couples-are/",
    },
    {
        subcategory: "Shoes",
        fact: "Because of their construction—usually, their many components are stitched and glued and molded together in complicated ways—they’re almost impossible to recycle.”        ",
        source: "https://earthyb.com/blog/sustainable-shoes/",
    },
    {
        subcategory: "Dress Clothes",
        fact: "About 90 percent of the cotton grown for textiles is genetically modified, which means it is heavily reliant on pesticides. In fact, almost 20 percent of pesticide use worldwide is for use on cotton plants.",
        source: "https://serc.berkeley.edu/why-thrifting-is-good-for-the-planet-not-just-your-wallet/",
    },
    {
        subcategory: "Thrift",
        fact: "We are buying four times as much clothing as we used to but are spending 17 percent less because we buy clothes that quickly fall apart or goes out of style (or both), and so we throw them in the trash and buy something new. Studies have shown that 60 percent of the clothes made worldwide are made from synthetic materials (e.g. polyester, nylon, acrylic) a.k.a. plastic.",
        source: "https://serc.berkeley.edu/why-thrifting-is-good-for-the-planet-not-just-your-wallet/",
    },
]
import {generateToken,getBudgetData} from '../../utils/apiCalls';
<<<<<<< HEAD
import {transformBudgetData, generateBudgetDataPayload} from "../Budget/BudgetUtils.js";
import {getUser} from '../../utils/common';

export async function getChartData(year, month){
=======
import {transformBudgetData, shiftBudgetData,generateBudgetDataPayload} from "../Budget/BudgetUtils.js";
import {getUser} from '../../utils/common';

export async function getChartData(year){
>>>>>>> green
    try {
        if(getUser()){
            const token = await generateToken(getUser());
            const payload = generateBudgetDataPayload(token);
            const data = await getBudgetData(payload.body,payload.headers);
            const transformedData = transformBudgetData(data);
            const transformDate= transformedData.map(function(item){return {date:new Date(item[2]),category:item[3],cost:item[6]}});
<<<<<<< HEAD
            const filteredByYear = transformDate.filter(function(ele){
                return ele.date.getFullYear()===year;
            });
            if (month == 12) return filteredByYear;
            else {
                const filteredByMonth = filteredByYear.filter(function(ele){
                    return ele.date.getMonth()===month;
                })
                return filteredByMonth;
            }
=======
            if (year){
                const filteredByYear = transformDate.filter(function(ele){
                    console.log(ele.date.getFullYear())
                    return ele.date.getFullYear()===year;
                });
                return filteredByYear;
            }else {
                return transformDate;
            }    
>>>>>>> green
        } else {
            return null;    
        }
    }catch (error){
        throw error;
    }
};

export function filterByYear (data,year){
    const filteredByYear = data.filter(function(ele){
        return ele.date.getFullYear()===year;
    });
    return filteredByYear;
};

export function getCategories(data){
    const categories = []
    const temp = data.map(function(ele){
        if (!categories.includes(ele.category)){
            categories.push(ele.category);
        }
    });
    return categories;
};

<<<<<<< HEAD
export function getYears(data){
    const years = [];
    const yearList = [];
    console.log(data);
    const temp = data.map(function(ele){
        const y = ele.date.getFullYear();
        if (!yearList.includes(y)){
            yearList.push(y);
            years.push({value:y,label:y});
        }
    });
    return years;
=======
export async function getYears(data){
    const years = []
    const temp = data.map(function(ele){
        const y = ele.date.getFullYear();
        if (!years.includes(y)){
            years.push(y);
        }
    });
    return await years;
>>>>>>> green
};
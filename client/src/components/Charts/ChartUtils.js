import {generateToken,getBudgetData,getIncomeData} from '../../utils/apiCalls';
import {transformBudgetData, generateBudgetDataPayload} from "../Budget/BudgetUtils.js";
import {getUser} from '../../utils/common';
import {transformIncomeData, generateIncomeDataPayload} from "../Income/IncomeUtils.js";


export async function getChartIncomeData(year, month){
    try {
        if(getUser()){
            const token = await generateToken(getUser());
            const payload = generateIncomeDataPayload(token);
            const data = await getIncomeData(payload.body,payload.headers);
            const transformedData = transformIncomeData(data);
            const transformDate= transformedData.map(function(item){return {date:new Date(item[2]),category:item[3],cost:item[5]}});
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
        } else {
            return null;    
        }
    }catch (error){
        throw error;
    }
};

export async function getChartData(year, month){
    try {
        if(getUser()){
            const token = await generateToken(getUser());
            const payload = generateBudgetDataPayload(token);
            const data = await getBudgetData(payload.body,payload.headers);
            const transformedData = transformBudgetData(data);
            const transformDate= transformedData.map(function(item){return {date:new Date(item[2]),category:item[3],cost:item[6]}});
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
};
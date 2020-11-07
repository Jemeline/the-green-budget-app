import React, { Component} from 'react';
import {Alert,Button,Card,CardHeader,CardBody,Col, Container, Nav, NavLink, NavItem,Row,TabPane,TabContent,Form,
    FormGroup, Label, Input,} from 'reactstrap';
import MUIDataTable from "mui-datatables";
import {getBudgetData,generateToken} from '../../utils/apiCalls';
import {getUser} from '../../utils/common';

function transformBudgetData(data){
    return data.map(item => 
        Object.values(item))
};

function transformBudgetData2(data){
    data.map(item => {item.push(item.shift()); item.push(item.shift());});
};

class BudgetTable extends Component {
    constructor(props){
        super(props);
        console.log("This happens first");
        this.state = {
            columns:["Date", "Category", "Subcategory", "Description","Amount" ],
            data :[
                ["Joe James", "Test Corp", "Yonkers", "NY"],
                ["John Walsh", "Test Corp", "Hartford", "CT"],
                ["Bob Herm", "Test Corp", "Tampa", "FL"],
                ["James Houston", "Test Corp", "Dallas", "TX"],
               ],
            budgetData:'',
            loading:'',
            modal:false,
        options : {
            filter:true,
            filterType: "dropdown",
            resizableColumns: true,
            columnOrder:[0,3,4,1,2],
            jumpToPage:true,
            rowHover:true,
            search:true,
            searchOpen:true,
            searchPlaceholder:'Search My Budget',
            selectableRows:'none',
            onRowClick:(value, tableMeta, updateValue) => {
                console.log(tableMeta);
                
           }
            
        },

        };
        this.toggle = this.toggle.bind(this);  
    }
    toggle() {
        this.setState({modal:!this.state.modal});
    }
    
    async componentDidMount(){
        this.setState({ loading: 'true' });
        if (getUser()){
            const token = await generateToken(getUser());
            const payload = {
                sessionUser:getUser(),
                expenseUser:getUser(),
            };
            const headers ={
                    headers: {
                      'Authorization': `Bearer ${token}` 
            }};
            const data = await getBudgetData(payload,headers);
            let transformedData= transformBudgetData(data);
            transformBudgetData2(transformedData);
            this.setState({ budget: transformedData, loading:'false' });
        } else {
            this.setState({loading:'abort'});
        }
        
    
    };
        
        
        
        // 
        // 
        // let data2= await transformBudgetData(data);
        
    

    
    render() {
        const columns = [
        {
            name: "Date",
            options: {
              filter: true,
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
              filter: true,
            }
        },
        {
            name: "Amount",
            options: {
              filter: true,
            }
        },
        ]
        if (this.state.loading === 'initial') {
            return <h2>Intializing...</h2>;
        }
        if (this.state.loading === 'true') {
            return <h2>Loading...</h2>;
        }
        if (this.state.loading === 'abort') {
            return <h2>Aborted...</h2>;
        }
        console.log('This happens 8th - after I get data.');

        return (
            <div>
            <h4>Budget Table</h4>
            
            
            
            <MUIDataTable
                title={"Employee List"}
                data={this.state.budget}
                columns={columns}
                options={this.state.options}
            />
           
            </div>
        );
    }
}

 
export default BudgetTable;
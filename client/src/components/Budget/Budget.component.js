import React, { Component} from 'react';
import {Alert,Button,Col,Row,Form,FormGroup,Container, Label, Input,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {categories,subcategories} from './budgetCategories';
import Select from 'react-select';
import {getUser,getName} from '../../utils/common';
import '../../css/Budget.css';
import {addBudgetItem,generateToken,getBudgetData,removeBudgetItem,updateBudgetItem} from '../../utils/apiCalls';
import MUIDataTable from "mui-datatables";
import {Refresh as RefreshIcon,Add as AddIcon, FilterList as FilterListIcon,
        Settings as SettingsIcon, MoreHoriz as MoreHorizIcon,
        MoreVert as MoreVertIcon, Widgets as WidgetsIcon, DateRange as DateRangeIcon} from '@material-ui/icons';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import {transformBudgetData, shiftBudgetData, tableTheme, ButtonForm, 
        regDate, regAmount,generateAddExpensePayload,generateUpdateExpensePayload,
        generateDeleteExpensePayload,generateBudgetDataPayload, tableColumns} from "./BudgetUtils.js";
import {MuiThemeProvider} from '@material-ui/core';
import ReactLoading from 'react-loading';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {BudgetCharts} from './BudgetCharts.component';
import {getChartData,getCategories,getYears} from '../Charts/ChartUtils';
import {categories as categoryColors} from '../Budget/budgetCategories';

class Budget extends Component {
    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
            modal:false,
            description:'',
            amount:'',
            category:null,
            subcategories:subcategories,
            subcategory:null,
            date:'',
            alertOn:false,
            alertMessage:'',
            alertColor:'danger',
            loading:'true',
            budgetId:0, 
            buttonFormat:2,
            newUser:false,
            modalFilter:false,
            startDate:'',
            endDate:'',
            formats:[],
            doughnutData:{},
            years:[],
            year:{ value:2020,label:2020},
        }; 
        this.toggleFilter = this.toggleFilter.bind(this);
        this.toggle = this.toggle.bind(this);  
        this.handleChange = this.handleChange.bind(this);
    }
    
    
// Alert
    onDismiss = () => {this.setState({alertOn:false,alertMessage:'',alertColor:'danger',})};
    handleAlert(message,color){
        this.setState({ alertMessage:message,alertOn:true, alertColor:color || 'danger'});
    };
    
//  Budget Modal
    handleChange(event) {
        this.setState({ [event.target.name]:event.target.value});
    };
    toggle() {
        if (!this.state.newUser){
            this.setState({
                modal:!this.state.modal,
                hiddenButtons:!this.hiddenButtons,
            });
            this.clearFormFields();
            this.onDismiss();
        }
    };
    clearFormFields(){
        this.setState({description:'',amount:'',category:null,subcategories:subcategories,
            subcategory:null,date:'',budgetId:0,startDate:'',endDate:'' 
        });
    };
    handleCategory = category => {
        this.setState({category:category,
            subcategories:subcategories.filter(word => word.parent === category.value)
        });
    };
    handleSubcategory = subcategory => {
        this.setState({subcategory:subcategory});
    };
    async handleSubmit(type){
        try{
            this.onDismiss();
            if (type !== 'delete' && (!this.state.date || !this.state.amount || !this.state.category || !this.state.subcategory ||!this.state.description)){
                this.handleAlert("Please Fill All Fields");
            } else if (!regDate.test(this.state.date)){
                this.handleAlert("Invalid Date Format");
            } else if (!regAmount.test(this.state.amount)) {
                this.handleAlert("Invalid Amount Format");
            } else if (this.state.subcategory.parent !== this.state.category.value){
                this.handleAlert("Invalid Subcategory");
            } else{
                if (getUser()){
                    let data;
                    const token = await generateToken(getUser());
                    if (type ==="add"){
                        const payload = generateAddExpensePayload(this.state,token);
                        data = await addBudgetItem(payload.body,payload.headers);
                    } else if (type === 'update'){
                        const payload = generateUpdateExpensePayload(this.state,token);
                        data = await updateBudgetItem(payload.body,payload.headers);
                    } else {
                        const payload = generateDeleteExpensePayload(this.state,token);
                        data = await removeBudgetItem(payload.body,payload.headers);
                    };
                    if (!data){
                        this.handleAlert("Oops... Something Went Wrong");
                    } else {
                        if(type ==="add"){
                            if (this.state.newUser){
                                this.setState({newUser:false});
                                this.clearFormFields();
                                this.handleAlert("Great! Add another entry or click close to see your budget.",'success');    
                            } else {
                                this.handleAlert("Success",'success');
                                this.clearFormFields();   
                            }    
                        } else {
                            this.toggle();
                        };  
                    };
                    await this.renderBudgetTable();
                } else {
                    this.props.history.push('/login');
                }; 
            }  
          } catch (error){
            console.log(error);
            this.handleAlert("Oops... Something Went Wrong");
        }
    };
    
// Filter Modal
    toggleFilter() {
        this.setState({modalFilter:!this.state.modalFilter});
    };
    async handleFilterSubmit() {
        try{
            this.onDismiss();
            if (!this.state.startDate || !this.state.endDate){
                this.handleAlert("Please Fill All Fields");
            } else if (!regDate.test(this.state.startDate)||!regDate.test(this.state.startDate)){
                this.handleAlert("Invalid Date Format");
            } else {
                const startDate = new Date(this.state.startDate);
                const endDate = new Date(this.state.endDate);
                if (startDate.getTime() > endDate.getTime()){
                    this.handleAlert("Invalid Date Order Entered"); 
                }else{
                    await this.renderBudgetTable();
                    this.setState({
                        budget:this.state.budget.filter(function(entry){
                            const date = new Date(entry[0]);
                            return date.getTime() >= startDate.getTime() && date.getTime() <= endDate.getTime();
                        }
                        )
                    });
                    this.toggleFilter();
                }
            }
        }catch (error){
            console.log(error);
            this.handleAlert("Oops... Something Went Wrong");
        }
    };
    
    async filterThisYear(){
        const year = new Date().getFullYear();
        const month = new Date().getMonth()+1;
        await this.renderBudgetTable();
        this.setState({
            budget:this.state.budget.filter(entry=>
                entry[0].slice(0,4)===year.toString()
            )
        });
    };

    async filterThisMonth(){
        const year = new Date().getFullYear();
        const month = new Date().getMonth()+1;
        await this.renderBudgetTable();
        this.setState({
            budget:this.state.budget.filter(entry=>
                entry[0].slice(0,4)===year.toString()&& entry[0].slice(5,7)===month.toString()
            )
        });
    };
    
// Table
    async renderBudgetTable (){
        try {
        this.clearFormFields();
        if (getUser()){
            const token = await generateToken(getUser());
            const payload = generateBudgetDataPayload(token);
            const data = await getBudgetData(payload.body,payload.headers);
            const transformedData = transformBudgetData(data);
            shiftBudgetData(transformedData);
            if (transformedData.length === 0){
                this.setState({ budget: transformedData, loading:'complete',modal:true,newUser:true, hiddenButtons:true });
                this.handleAlert("Welcome " +getName()+", add an entry to begin your journey with Green Financing.",'success');
            } else {
                this.setState({ budget: transformedData, loading:'complete' });
            }
            await this.renderDoughnut();
            const years= await getYears(await getChartData());
            years.map((year) => this.state.years.push({ value:year,label:year}));
            const defaultYear = new Date().getFullYear();
            await this.renderLine(defaultYear);
        } else {
            this.props.history.push('/login');
        }
    }catch (error){
        console.log(error);
        this.setState({loading:"error"})
    }
    };  
    
// FAB
    changeStyle(style){
        this.setState({buttonFormat:style});
    };
// Toggle Button
    handleFormat = (event, newFormats) => {
        this.setState({formats:newFormats});
    };
    


// Charts 
    async renderDoughnut(){
        try{
            const defaultYear = new Date().getFullYear();
            const data= await getChartData(defaultYear);
            if (data){
                const categories = getCategories(data);
                const catCost =new Array(categories.length).fill(0);
                data.map(function(ele){
                    const ind = categories.indexOf(ele.category);
                    catCost[ind]= catCost[ind] + ele.cost;
                })
                const x= catCost.map(function(ele){
                    return ele.toFixed(2);
                });
                const backgroundColor = new Array();
                const hoverBackgroundColor = new Array();
                categories.map(function(cat){
                    backgroundColor.push(categoryColors.filter(c => c.value === cat)[0].colorBorder);
                    hoverBackgroundColor.push(categoryColors.filter(c => c.value === cat)[0].colorHover);
                });
                this.setState({doughnutData: {
                    datasets: [
                    {
                    data: x,
                    backgroundColor: backgroundColor,
                        hoverBackgroundColor: hoverBackgroundColor
                    }
                ],
                    labels: categories
                }});
                this.setState({loading:"complete"});


            } else {
                this.props.history.push('/login');
            }
        }catch (error){
            this.setState({loading:'error'});
            console.log(error);
        }
    };

    async renderLine(year){
        try{
            const data = await getChartData(year);
            if (data){
                const monthCostArray = new Array(12).fill(null);
                data.map(function(ele){
                    const ind = ele.date.getMonth();
                    monthCostArray[ind] = monthCostArray[ind] + ele.cost;
                    if ((ind>0 || ind<monthCostArray.length-1) && !monthCostArray[ind+1]){
                        monthCostArray[ind+1]=0
                    };
                    if ((ind>0 || ind<monthCostArray.length-1) && !monthCostArray[ind-1]){
                        monthCostArray[ind-1]=0
                    } ;  
                });
                const categories = getCategories(data);
                const categoryMonth = Array(categories.length).fill(0).map(x => Array(12).fill(null));
                const x = data.map(function(ele){
                    const indCat = categories.indexOf(ele.category);
                    const indMonth = ele.date.getMonth();
                    categoryMonth[indCat][indMonth]= categoryMonth[indCat][indMonth] + ele.cost;
                    if ((indMonth<categoryMonth[indCat].length-1) && !categoryMonth[indCat][indMonth+1]){
                        categoryMonth[indCat][indMonth+1]=0
                    };
                    if ((indMonth<categoryMonth[indCat].length-1) && !categoryMonth[indCat][indMonth-1]){
                        categoryMonth[indCat][indMonth-1]=0
                    };
                });
                const datasets=new Array(categories.length);
                let ind = 0;
                categoryMonth.map(function(catGroup){
                    datasets[ind]=
                    {
                        label: categories[ind],
                        data: catGroup,
                        fill: false,
                        backgroundColor: categoryColors.filter(c => c.value === categories[ind])[0].color,
                        borderColor: categoryColors.filter(c => c.value === categories[ind])[0].colorBorder,
                        pointHoverBackgroundColor:categoryColors.filter(c => c.value === categories[ind])[0].color,
                        pointHoverRadius:8,
                        lineTension: 0.4,
                        spanGaps:false
                    };
                    ind = ind+1;
                });
                datasets.push({
                    label: "Total",
                    data: monthCostArray,
                    fill: false,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)",
                    lineTension: 0.4,
                    spanGaps:false,
                    pointHoverBackgroundColor:"rgba(75,192,192,0.2)",
                    pointHoverRadius:8,
                });
                this.setState({ datasets:datasets, loading:"complete" });
            } else {
                this.setState({loading:'loading'});
            }
        } catch (error){
            this.setState({loading:'error'});
            console.log(error);
        }
    };

    async componentDidMount(){
        this._isMounted = true;
        if (this._isMounted){
            this.setState({formats:["line","donut"]})
        };
        this.setState({loading:'loading'});
        await this.renderBudgetTable();
    };

    
    componentWillUnmount() {
        this._isMounted = false;
    };

    render() {
        const closeBtnExternal = <button className="close" onClick={this.toggle}></button>;
        const closeBtnInternal = <button style={{outline:'none'}} className="close" onClick={this.toggle} >&times;</button>;
        const closeBtnExFilter = <button className="close" onClick={this.toggleFilter}></button>;
        const closeBtnInFilter = <button style={{outline:'none'}} className="close" onClick={this.toggleFilter} >&times;</button>;
        const options = {
            filter:true,
            filterType: "dropdown",
            columnOrder:[0,3,4,1,2],
            jumpToPage:true,
            search:true,
            searchOpen:true,
            searchPlaceholder:'Search My Budget',
            selectableRows:'none',
            onRowClick:(value, tableMeta, updateValue) => {
                const row = this.state.budget[tableMeta.rowIndex];
                this.toggle();
                this.setState({
                    description:row[3],
                    amount:parseFloat(row[4].slice(1)).toFixed(2),
                    category:categories.find(element => element.value===row[1]),
                    subcategory:subcategories.find(element => element.value===row[2]),
                    date:row[0],
                    budgetId:row[5],
                    hiddenButtons:false,
                    subcategories:subcategories.filter(word => word.parent === row[1])
                });
            },
            MuiTableRow: { hover: { '&$root': { '&:hover': { backgroundColor: 'green' }, } }, 
            }
            
        };
        const toggleGroup = <ToggleButtonGroup orientation="vertical" style={{float:'left'}} value={this.state.formats} onChange={this.handleFormat} aria-label="text formatting">
                            <ToggleButton style={{outline:'none'}} value="line" aria-label="bold">
                                <ShowChartIcon />
                            </ToggleButton>
                            <ToggleButton style={{outline:'none'}} value="donut" aria-label="italic">
                                <DonutLargeIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>

        
        if (this.state.loading === 'loading') {
            return (
                <div>
                    <br></br>
                    <ReactLoading className="loading" type={"spinningBubbles"} color={"#002884"} height={'15%'} width={'15%'} />
                </div>
        )};
        if (this.state.loading === 'error') {
            return (
                <div>
                    <br></br>
                    <ReactLoading className="loading" type={"spinningBubbles"} color={"#A62817"} height={'15%'} width={'15%'} />
                </div>
        )};
        
        return (
            <div>
            <div>
            {toggleGroup}
            <BudgetCharts datasets={this.state.datasets} formats={this.state.formats} data={this.state.doughnutData}/>
            <br></br>
            <Modal isOpen={this.state.modalFilter} toggle={this.toggleFilter} close={closeBtnExFilter}>
                <ModalHeader toggle={this.toggleFilter} close={closeBtnInFilter}>Date Range Filter</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <Alert color={this.state.alertColor} isOpen={this.state.alertOn} toggle={this.onDismiss}>
                                {this.state.alertMessage}
                            </Alert>
                            <Form >
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label><strong>Start Date</strong></Label>
                                <Input
                                type="date"
                                name="startDate"
                                placeholder="start date placeholder"
                                onChange={this.handleChange}
                                value={this.state.startDate}
                                />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label><strong>End Date</strong></Label>
                                <Input
                                type="date"
                                name="endDate"
                                placeholder="end date placeholder"
                                onChange={this.handleChange}
                                value={this.state.endDate}
                                />
                            </FormGroup>
                            </Form>    
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={async()=> await this.handleFilterSubmit()}>Apply</Button>{' '}
                    <Button color="secondary" onClick={this.toggleFilter}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} close={closeBtnExternal}>
                <ModalHeader toggle={this.toggle} close={closeBtnInternal}>Budget Entry</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col>
                            <Alert color={this.state.alertColor} isOpen={this.state.alertOn} toggle={this.onDismiss}>{this.state.alertMessage}</Alert>
                            <Form >
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label><strong>Description</strong></Label>
                                <Input type="text" value={this.state.description} name="description" placeholder="Enter Description" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label><strong>Date</strong></Label>
                                <Input
                                type="date"
                                name="date"
                                placeholder="date placeholder"
                                onChange={this.handleChange}
                                value={this.state.date}
                                />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label><strong>Amount</strong></Label>
                                <Input type="number" value={this.state.amount} placeholder="0.00" name="amount" min="0" step="0.01" id="amount" pattern="^\d+(?:\.\d{1,2})?$" onChange={this.handleChange}/>    
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label><strong>Category</strong></Label>
                                <Select
                                    value={this.state.category}
                                    onChange={this.handleCategory}
                                    options={categories}
                                />   
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label ><strong>Subcategory</strong></Label>
                                <Select
                                    value={this.state.subcategory}
                                    onChange={this.handleSubcategory}
                                    options={this.state.subcategories}
                                />   
                            </FormGroup>
                            </Form>    
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                <Button outline color="info" hidden={!this.state.hiddenButtons} onClick={async () => {await this.handleSubmit('add');}}>Add</Button>{' '}
                <Button outline color="info" hidden={this.state.hiddenButtons} onClick={async () => {await this.handleSubmit('update');}}>Update</Button>{' '}
                <Button outline color="danger" hidden={this.state.hiddenButtons} onClick={async () => {await this.handleSubmit('delete');}}>Delete</Button>{' '}
                <Button outline color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            </div>
            <Container fluid={true}>
            <MuiThemeProvider theme={tableTheme}> 
                    <MUIDataTable
                        title={"My Budget"}
                        data={this.state.budget}
                        columns={tableColumns}
                        options={options}
                        className='table'
                    />  
                    </MuiThemeProvider>      
            </Container>
            <Fab icon={<RefreshIcon/>} onClick={async () => {await this.renderBudgetTable();}} mainButtonStyles={{backgroundColor: '#3f50b5',outline:'none'}} style={ButtonForm[this.state.buttonFormat].refresh}></Fab>
                    <Fab icon={<AddIcon/>} onClick={this.toggle} mainButtonStyles={{backgroundColor: '#3f50b5',outline:'none'}} style={ButtonForm[this.state.buttonFormat].add}></Fab>
                    <Fab icon={<SettingsIcon/>} mainButtonStyles={{backgroundColor: '#a9a9a9',outline:'none'}} style={ButtonForm[this.state.buttonFormat].drag}>
                    <Action style={{backgroundColor: '#01579b',outline:'none', right:75,top:25}} onClick={() => { this.changeStyle(0) }}>
                    <MoreVertIcon/>
                    </Action>
                    <Action style={{backgroundColor: '#01579b',outline:'none',right:100,top:25}} onClick={() => { this.changeStyle(2) }}>
                    <WidgetsIcon/>
                    </Action>
                    <Action style={{backgroundColor: '#01579b',outline:'none',right:110,top:25}} onClick={() => { this.changeStyle(1)}}>
                    <MoreHorizIcon/>
                    </Action>
                    </Fab>
                    <Fab icon={<FilterListIcon/>} mainButtonStyles={{backgroundColor: '#3f50b5',outline:'none'}} style={ButtonForm[this.state.buttonFormat].filter}>
                        <Action style={{backgroundColor: '#01579b',outline:'none'}} onClick={this.toggleFilter}>
                        <DateRangeIcon/>
                        </Action>
                        <Action style={{backgroundColor: '#01579b',outline:'none'}} onClick={async () => {await this.filterThisYear()}}>
                        Y
                        </Action>
                        <Action style={{backgroundColor: '#01579b',outline:'none'}} onClick={async() => {await this.filterThisMonth()}}>
                        M
                        </Action>
                    </Fab>   
            </div>
            </div>    
        );
    }
};
 
export default Budget;